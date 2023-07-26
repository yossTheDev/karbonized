import {
	IconAppWindow,
	IconArrowLeft,
	IconArrowRight,
	IconBrandTwitter,
	IconBrush,
	IconChevronDown,
	IconChevronUp,
	IconCircle,
	IconCode,
	IconDeviceMobile,
	IconEraser,
	IconFlask,
	IconFocusCentered,
	IconHandFinger,
	IconInfoCircle,
	IconJpg,
	IconLetterT,
	IconLock,
	IconMoon,
	IconPhoto,
	IconPng,
	IconPointer,
	IconQrcode,
	IconSettings,
	IconShare,
	IconSticker,
	IconSun,
	IconSvg,
	IconTree,
	IconX,
	IconZoomIn,
	IconZoomOut,
	IconZoomReset,
} from '@tabler/icons-react';
import { toBlob, toJpeg } from 'html-to-image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, Navbar, Range } from 'react-daisyui';
import InfiniteViewer from 'react-infinite-viewer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import '../App.css';
import karbonized from '../assets/karbonized.svg';
import { HomeButton } from '../components/Base/HomeButton';
import { ColorPicker } from '../components/CustomControls/ColorPicker';
import { Tooltip } from '../components/CustomControls/Tooltip';
import { RightPanel } from '../components/RightPanel';
import { AboutModal } from '../components/Modals/AboutModal';
import { WorkspacePanel } from '../components/Panels/WorkspacePanel';
import { Workspace } from '../components/Workspace';
import { useScreenDirection } from '../hooks/useScreenDirection';
import { useTauriPlatform } from '../hooks/useTauriPlatform';
import { useTheme } from '../hooks/useTheme';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import '../utils.css';
import { ExportImage, export_format } from '../utils/Exporter';
import './Editor.css';
import { getRandomNumber } from '../utils/getRandom';
import { isElectron } from '../utils/isElectron';
import { LeftPanel } from '../components/Panels/LeftPanel';
import { StatusBar } from '../components/Base/StatusBar';
import { MenuBar } from '../components/Base/MenuBar';

import {
	DropMenu,
	MenuItem,
	MenuSeparator,
} from '../components/CustomControls/DropMenu';
import { CustomPortal } from '../components/Portal';

export const Editor: React.FC = () => {
	/* App Store */
	const addControl = useStoreActions((state) => state.addControl);
	const setEditing = useStoreActions((state) => state.setEditing);
	const setReady = useStoreActions((state) => state.setReadyToSave);
	const workspaceName = useStoreState((state) => state.workspaceName);
	const editing = useStoreState((state) => state.editing);
	const canDraw = useStoreState((state) => state.isDrawing);
	const setCanDraw = useStoreActions((state) => state.setIsDrawing);
	const isErasing = useStoreState((state) => state.isErasing);
	const setIsErasing = useStoreActions((state) => state.setIsErasing);
	const lineWidth = useStoreState((state) => state.lineWidth);
	const strokeColor = useStoreState((state) => state.strokeColor);
	const setStrokeColor = useStoreActions((state) => state.setStrokeColor);
	const setLineWidth = useStoreActions((state) => state.setLineWidth);
	const aspectRatio = useStoreState((state) => state.lockAspect);
	const setAspectRatio = useStoreActions((state) => state.setLockAspect);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const controls = useStoreState((state) => state.ControlsTree);

	const workspaceMode = useStoreState((state) => state.workspaceMode);

	const redo = useStoreActions((state) => state.redo);
	const undo = useStoreActions((state) => state.undo);

	/* Component Store and Actions */
	const isHorizontal = useScreenDirection();
	const [appTheme, toggleTheme] = useTheme();

	const [drag, setDrag] = useState(false);
	const [showAbout, setShowAbout] = useState(false);
	const [showWorkspacePanel, setShowWorkspacePanel] = useState(false);
	const [showMenu, setShowMenu] = useState(isHorizontal ? true : false);

	const [previewImage, setPreviewImage] = useState('');
	const [showPreview, setShowPreview] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	const viewerRef = useRef<InfiniteViewer>(null);

	const [zoom, setZoom] = useState(isHorizontal ? 0.9 : 0.6);

	const getElementsByType = (type: string) => {
		return controls.filter((item) => item.type === type).length + 1;
	};

	const centerView = useCallback(() => {
		const width = parseFloat(workspaceWidth);

		if (width < 1280) {
			viewerRef.current?.setZoom(0.9);
		} else if (width >= 1280 && width < 1920) {
			viewerRef.current?.setZoom(0.6);
		} else if (width >= 1920 && width < 2560) {
			viewerRef.current?.setZoom(0.4);
		} else if (width >= 2560 && width < 3840) {
			viewerRef.current?.setZoom(0.3);
		} else if (width >= 3840) {
			viewerRef.current?.setZoom(0.2);
		}

		viewerRef.current?.scrollCenter();
	}, [workspaceHeight, workspaceWidth, workspaceMode, controls]);

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'w') {
			event.preventDefault();

			setEditing(true);
			setDrag(false);
			setCanDraw(false);
			setIsErasing(false);
		} else if (event.ctrlKey && event.key === 'e') {
			event.preventDefault();

			setEditing(false);
			setCanDraw(false);
			setIsErasing(false);
			setDrag(true);
		} else if (event.ctrlKey && event.key === 'r') {
			event.preventDefault();

			setAspectRatio(true);
		} else if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
			showPreviewImage();
		} else if (event.ctrlKey && event.key === 'z') {
			event.preventDefault();
			undo();
		} else if (event.ctrlKey && event.key === 'y') {
			event.preventDefault();
			redo();
		} else if (event.ctrlKey && event.key === ' ') {
			event.preventDefault();
			centerView();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			setShowPreview(false);
			setShowAbout(false);
		}
	};

	/* Handle Key Shortcuts and Center View on Change Some Workspace Properties*/
	useEffect(() => {
		centerView();

		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [workspaceHeight, workspaceWidth, controls, workspaceMode]);

	// Save Image as PNG
	const exportAsPng = useCallback(async () => {
		ExportImage(workspaceName, ref.current, export_format.png);
	}, [ref, workspaceName]);

	// Save Image as SVG
	const exportAsSvg = useCallback(async () => {
		ExportImage(workspaceName, ref.current, export_format.svg);
	}, [ref, workspaceName]);

	const exportAsJpeg = useCallback(async () => {
		ExportImage(workspaceName, ref.current, export_format.jpeg);
	}, [ref, workspaceName]);

	const showPreviewImage = useCallback(async () => {
		setReady(true);

		if (ref.current === null) {
			console.log('NULL');
			setReady(false);

			return;
		}

		toJpeg(ref.current, {
			cacheBust: true,
		})
			.then((dataUrl) => {
				console.log('SAVED');

				setPreviewImage(dataUrl);
				setShowPreview(true);

				setReady(false);
			})
			.catch((err) => {
				setReady(false);
				console.log(err);
			});
	}, [ref, workspaceName]);

	// Share Image
	const handleShare = useCallback(async () => {
		const newFile = await toBlob(ref.current as HTMLElement);
		if (newFile) {
			const data = {
				files: [
					new File([newFile], 'image.png', {
						type: newFile.type,
					}),
				],
				title: 'Image',
				text: 'image',
			};

			try {
				await navigator.share(data);
			} catch (err) {
				console.log(err);
			}
		}
	}, [ref]);

	return (
		<div
			onContextMenu={(e) => {
				e.preventDefault();
			}}
			id='body'
			className='relative flex flex-auto flex-row overflow-hidden bg-base-200'
		>
			{/* Left Panel */}
			<div className='flex max-w-xs'>
				<LeftPanel></LeftPanel>
			</div>

			{/* Content */}
			<div className='relative flex flex-auto flex-col overflow-hidden bg-base-200 p-2 md:p-0'>
				{/* Nav Bar */}
				<Navbar className='absolute z-30 mt-2 hidden h-2 shrink rounded-full bg-transparent  md:rounded-2xl lg:flex'>
					<Navbar.Start className='z-20'>
						{/* About Button */}
						<Button
							color='ghost'
							className='ml-2 hidden rounded-full hover:border-base-100   hover:bg-base-100 md:hidden'
							onClick={() => setShowAbout(true)}
						>
							<IconInfoCircle className='text-black dark:text-white'></IconInfoCircle>
							<p className='hidden text-black dark:text-white md:ml-2 md:flex'>
								Share
							</p>
						</Button>

						{!isElectron() && (
							<>
								<HomeButton className='h-12 w-10 rounded-2xl p-1'></HomeButton>

								<div className='hidden select-none flex-row gap-2 rounded-xl bg-base-200/90 p-2 text-black backdrop-blur-xl dark:text-white md:flex'>
									<img className='h-8' src={karbonized}></img>
									<label className='poppins-font-family my-auto select-none text-xl'>
										Karbonized
									</label>
								</div>
							</>
						)}
					</Navbar.Start>

					<Navbar.Center className='md:hidden lg:flex'>
						<img className='h-12 w-full md:hidden' src={karbonized}></img>
					</Navbar.Center>

					<Navbar.End className='ml-auto flex flex-auto gap-0  md:hidden md:gap-1 lg:flex'>
						{/* Change Theme */}
						{!isElectron() && (
							<>
								<Tooltip placement='bottom' message='Change Theme'>
									<Button
										shape='circle'
										className='hidden border-none bg-base-200/90 backdrop-blur-xl hover:bg-base-100 lg:block'
										onClick={() => toggleTheme()}
									>
										{appTheme === 'light' ? (
											<IconMoon
												size={20}
												className='mx-auto dark:text-white'
											></IconMoon>
										) : (
											<IconSun
												size={20}
												className='mx-auto dark:text-white'
											></IconSun>
										)}
									</Button>
								</Tooltip>

								<p className='mx-1 my-auto hidden h-0.5 rounded  bg-base-200 p-0.5 lg:block'></p>
							</>
						)}

						<p className='mx-1 my-auto h-0.5 rounded bg-base-200  p-0.5 '></p>

						{/* Lock Aspect Ratio */}
						<Tooltip placement='bottom' message='Lock Aspect Ratio (Ctrl+R)'>
							<Button
								shape='circle'
								className={`my-2 hidden h-12 w-12 flex-auto rounded-full border-none bg-base-200/90 p-1 backdrop-blur-xl hover:bg-base-100 md:flex ${
									aspectRatio &&
									'border-none  bg-gradient-to-br from-violet-500 to-secondary text-white'
								}`}
								onClick={() => {
									setAspectRatio(!aspectRatio);
								}}
							>
								<IconLock size={20} className='dark:text-white'></IconLock>
							</Button>
						</Tooltip>

						<p className='mx-1 my-auto h-0.5 rounded bg-base-200/90 p-0.5  backdrop-blur-xl '></p>

						{/* Zoom Out */}
						<Tooltip placement='bottom' message='Zoom Out'>
							<Button
								shape='circle'
								className='my-2  hidden h-12 w-12 flex-auto rounded-full border-none bg-base-200/90 p-2 backdrop-blur-xl hover:bg-base-100 md:flex'
								onClick={() =>
									viewerRef.current?.setZoom(viewerRef.current?.getZoom() - 0.2)
								}
							>
								<IconZoomOut
									size={20}
									className='my-auto dark:text-white'
								></IconZoomOut>
							</Button>
						</Tooltip>

						{/* Zoom In */}
						<Tooltip placement='bottom' message='Zoom In'>
							<Button
								shape='circle'
								className='my-2 hidden h-12 w-12 flex-auto rounded-full border-none bg-base-200/90 p-2 backdrop-blur-xl hover:bg-base-100 md:flex'
								onClick={() =>
									viewerRef.current?.setZoom(viewerRef.current?.getZoom() + 0.2)
								}
							>
								<IconZoomIn
									size={20}
									className='my-auto dark:text-white'
								></IconZoomIn>
							</Button>
						</Tooltip>

						{/* Zoom In */}
						<Tooltip placement='bottom' message='Zoom Reset'>
							<Button
								shape='circle'
								className='backdrop-blur-xlp-2 my-2 hidden h-12 w-12  flex-auto rounded-full border-none bg-base-200/90 backdrop-blur-xl hover:bg-base-100 md:flex'
								onClick={() => viewerRef.current?.setZoom(0.7)}
							>
								<IconZoomReset
									size={20}
									className='my-auto dark:text-white'
								></IconZoomReset>
							</Button>
						</Tooltip>

						<p className='mx-1 my-auto h-0.5 rounded bg-base-200/90 p-0.5  backdrop-blur-xl '></p>

						{/* Preview Button */}
						<Tooltip placement='bottom' message='Render (Ctrl+S)'>
							<Button
								onClick={showPreviewImage}
								className='mr-2 hidden h-12 w-12 rounded-full border-none border-primary bg-gradient-to-br from-violet-500 to-secondary p-1 hover:border-primary hover:bg-gradient-to-l md:flex'
							>
								<IconFlask size={22} className='text-white'></IconFlask>
							</Button>
						</Tooltip>

						{/* Share Button */}
						<Button
							onClick={handleShare}
							className='  h-12 w-12 rounded-full border-none bg-gradient-to-br from-violet-500 to-secondary p-1 hover:border-primary hover:bg-gradient-to-l md:hidden'
						>
							<IconFlask size={24} className='text-white'></IconFlask>
						</Button>
					</Navbar.End>
				</Navbar>

				{/* Content*/}
				<div className='relative flex flex-auto flex-col overflow-hidden md:flex-row'>
					{/* Draw Bar */}
					{(canDraw || isErasing) && (
						<div className=' flex items-end '>
							<div className='absolute z-50 mb-4 ml-4 flex flex-row gap-1 rounded-2xl bg-base-200/90 p-1 px-2 backdrop-blur-xl'>
								{/* Stroke Range */}
								<IconBrush className='mx-1 my-auto dark:text-white'></IconBrush>
								<Range
									color='primary'
									className='my-auto flex  flex-auto p-1'
									min={0}
									max={100}
									onChange={(ev) => {
										setLineWidth(parseInt(ev.currentTarget.value));
									}}
									value={lineWidth}
								></Range>

								<ColorPicker
									isGradientEnable={false}
									color={strokeColor}
									onColorChange={setStrokeColor}
									showLabel={false}
									placement='left-start'
									label='Color'
								></ColorPicker>

								{/* Zoom In */}
								<Tooltip className='hidden flex-auto ' message='Zoom In'>
									<Button
										className='flex flex-auto p-1'
										color='ghost'
										onClick={() => setZoom(zoom + 0.2)}
									>
										<IconZoomIn
											size={15}
											className='dark:text-white'
										></IconZoomIn>
									</Button>
								</Tooltip>
							</div>
						</div>
					)}

					{/* Workspace */}
					<div
						className={`flex flex-auto flex-col rounded-2xl bg-base-100 shadow-inner ${
							drag && 'cursor-move'
						}`}
					>
						{/* Ruler Horizontal */}
						<InfiniteViewer
							ref={viewerRef}
							className='viewer my-2 flex flex-auto'
							useMouseDrag={drag}
							useAutoZoom
							zoom={0.9}
							usePinch={!drag}
							threshold={0}
							useResizeObserver
							useWheelScroll
							useTransform
							onScroll={() => {
								/*console.log(
							'scroll left ' + e.scrollLeft + 'scroll top ' + e.scrollTop
						);*/
							}}
						>
							<div
								style={{
									width: workspaceWidth + 'px',
									height: workspaceHeight + 'px',
								}}
								className='viewport'
							>
								<Workspace reference={ref}></Workspace>
							</div>
						</InfiniteViewer>
					</div>

					{/* Controls Tree */}
					<div className='absolute  z-10 flex h-full  w-28'>
						<div className='mx-auto my-auto ml-6 flex flex-col gap-3 rounded-2xl bg-base-200/90 p-2 backdrop-blur-xl'>
							{/* Tools */}
							<div className='flex w-20 flex-row flex-wrap'>
								{/* Actions */}

								{/* Select */}
								<Tooltip className='flex flex-auto' message='Select (Ctrl+W)'>
									<Button
										color='ghost'
										className={`flex flex-auto rounded-2xl ${
											editing &&
											'border-none bg-gradient-to-br from-violet-500 to-secondary  text-white'
										} p-1 hover:bg-gradient-to-bl`}
										onClick={() => {
											setEditing(true);
											setDrag(false);
											setCanDraw(false);
											setIsErasing(false);
										}}
									>
										<IconPointer
											size={18}
											className='dark:text-white'
										></IconPointer>
									</Button>
								</Tooltip>

								{/* Hand */}
								<Tooltip className='flex flex-auto ' message='Hand (Ctrl+E)'>
									<Button
										color='ghost'
										className={`flex flex-auto flex-col rounded-2xl ${
											drag &&
											'border-none bg-gradient-to-br from-violet-500 to-secondary   text-white hover:bg-gradient-to-bl'
										} p-1`}
										onClick={() => {
											setDrag(true);
											setEditing(false);
											setCanDraw(false);
											setIsErasing(false);
										}}
									>
										<IconHandFinger
											size={18}
											className='dark:text-white'
										></IconHandFinger>
									</Button>
								</Tooltip>

								{/* Brush */}
								<Tooltip className='flex flex-auto' message='Brush'>
									<Button
										color='ghost'
										className={`flex flex-auto rounded-2xl ${
											canDraw &&
											'border-none bg-gradient-to-br from-violet-500 to-secondary  text-white'
										} p-1 hover:bg-gradient-to-bl`}
										onClick={() => {
											setCanDraw(!canDraw);
											setEditing(false);
											setDrag(false);
											setIsErasing(false);
										}}
									>
										<IconBrush
											size={18}
											className='dark:text-white'
										></IconBrush>
									</Button>
								</Tooltip>

								{/* Erase */}
								<Tooltip className='flex flex-auto' message='Erase'>
									<Button
										color='ghost'
										className={`flex flex-auto rounded-2xl ${
											isErasing &&
											'border-none bg-gradient-to-br from-violet-500 to-secondary  text-white'
										} p-1 hover:bg-gradient-to-bl`}
										onClick={() => {
											setIsErasing(!isErasing);
											setEditing(false);
											setDrag(false);
											setCanDraw(false);
										}}
									>
										<IconEraser
											size={18}
											className='dark:text-white'
										></IconEraser>
									</Button>
								</Tooltip>
							</div>

							<div className='mx-auto my-auto h-1 w-1 rounded bg-base-100/80 p-1 backdrop-blur-xl '></div>

							{/* Basics */}

							<div className='flex w-20 flex-row flex-wrap'>
								{/* Code Control */}
								<Tooltip className='flex  flex-auto ' message='Code'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'code',
												id: `code-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `code ${getElementsByType('code')}`,
												isVisible: true,
											})
										}
									>
										<IconCode size={18} className='dark:text-white'></IconCode>
									</Button>
								</Tooltip>

								{/* FaIcon Control */}
								<Tooltip className='flex flex-auto ' message='Icon'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'faicon',
												id: `faicon-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `icon ${getElementsByType('faicon')}`,
												isVisible: true,
											})
										}
									>
										<IconSticker
											size={18}
											className='dark:text-white'
										></IconSticker>
									</Button>
								</Tooltip>

								{/* Text Control */}
								<Tooltip className='flex flex-auto ' message='Text'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'text',
												id: `text-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `text ${getElementsByType('text')}`,
												isVisible: true,
											})
										}
									>
										<IconLetterT
											size={18}
											className='dark:text-white'
										></IconLetterT>
									</Button>
								</Tooltip>

								{/* Shape Control */}
								<Tooltip className='flex flex-auto ' message='Shape'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'arrow',
												id: `arrow-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `shape ${getElementsByType('arrow')}`,
												isVisible: true,
											})
										}
									>
										<IconCircle
											size={18}
											className='dark:text-white'
										></IconCircle>
									</Button>
								</Tooltip>
							</div>

							<div className='mx-auto my-auto h-1 w-1 rounded bg-base-100/80 p-1 backdrop-blur-xl '></div>

							{/* Others */}

							<div className='flex w-20 flex-row flex-wrap '>
								<Tooltip className='flex flex-auto ' message='Qr Code'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'qr',
												id: `qr-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `qr ${getElementsByType('qr')}`,
												isVisible: true,
											})
										}
									>
										<IconQrcode
											size={18}
											className='dark:text-white'
										></IconQrcode>
									</Button>
								</Tooltip>

								{/* Image Control */}
								<Tooltip className='flex flex-auto ' message='Image'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'image',
												id: `image-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `image ${getElementsByType('image')}`,
												isVisible: true,
											})
										}
									>
										<IconPhoto
											size={18}
											className='dark:text-white'
										></IconPhoto>
									</Button>
								</Tooltip>

								{/* Badge Control */}
								<Tooltip className='flex flex-auto' message='Badge'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'badge',
												id: `badge-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `badge ${getElementsByType('badge')}`,
												isVisible: true,
											})
										}
									>
										<div className='h-2 w-4 rounded-full border-2 border-black dark:border-white'></div>
									</Button>
								</Tooltip>

								{/* Tweet Control */}
								<Tooltip className='flex flex-auto ' message='Tweet'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'tweet',
												id: `tweet-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `tweet ${getElementsByType('tweet')}`,
												isVisible: true,
											})
										}
									>
										<IconBrandTwitter
											size={18}
											className='dark:text-white'
										></IconBrandTwitter>
									</Button>
								</Tooltip>

								{/* Window Control */}
								<Tooltip className='flex flex-auto ' message='Window'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'window',
												id: `window-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `window ${getElementsByType('window')}`,
												isVisible: true,
											})
										}
									>
										<IconAppWindow
											size={18}
											className='dark:text-white'
										></IconAppWindow>
									</Button>
								</Tooltip>

								{/* Phone Mockup Control */}
								<Tooltip className='flex flex-auto ' message='Phone Mockup'>
									<Button
										className='flex flex-auto rounded-2xl p-1'
										color='ghost'
										onClick={() =>
											addControl({
												type: 'phone_mockup',
												id: `phone_mockup-${getRandomNumber()}`,
												isSelectable: true,
												isDeleted: false,
												name: `phone mockup ${getElementsByType(
													'phone_mockup',
												)}`,
												isVisible: true,
											})
										}
									>
										<IconDeviceMobile
											size={18}
											className='dark:text-white'
										></IconDeviceMobile>
									</Button>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>

				<StatusBar></StatusBar>
			</div>

			{/* Right Panel */}
			<div className='flex max-h-screen max-w-sm overflow-hidden'>
				<RightPanel></RightPanel>
			</div>

			{/* Modals */}
			{showAbout && (
				<AboutModal open onClose={() => setShowAbout(false)}></AboutModal>
			)}
			{showWorkspacePanel && (
				<Modal
					open={showWorkspacePanel}
					onClickBackdrop={() => {
						setShowWorkspacePanel(false);
					}}
					className='overflow-hidden bg-base-200 dark:text-white'
				>
					<Modal.Header className='font-bold dark:text-white'>
						<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
							Settings
						</p>
					</Modal.Header>

					<Modal.Body className='flex flex-auto select-none flex-col overflow-auto'>
						<div className='flex h-80 overflow-auto'>
							<WorkspacePanel></WorkspacePanel>
						</div>
					</Modal.Body>

					<Modal.Actions>
						<Button
							className='dark:text-white'
							onClick={() => setShowWorkspacePanel(false)}
						>
							OK
						</Button>
					</Modal.Actions>
				</Modal>
			)}
			{showPreview && (
				<Modal
					open={showPreview}
					onClickBackdrop={() => {
						setShowPreview(false);
					}}
					className='overflow-hidden bg-base-100'
				>
					<Modal.Header className='flex flex-row font-bold dark:text-white'>
						<div className='flex w-fit flex-row gap-1 rounded-xl bg-base-100 p-2'>
							<img className='h-10' src={karbonized}></img>
							<p className='poppins-font-family mx-2 my-auto text-2xl dark:text-white '>
								Export
							</p>
						</div>

						<Button
							shape='circle'
							onClick={() => {
								setShowPreview(false);
							}}
							className='ml-auto'
						>
							<IconX></IconX>
						</Button>
					</Modal.Header>

					<Modal.Body className='flex max-h-96 flex-auto select-none flex-col overflow-y-scroll'>
						<div className='mx-auto my-auto  w-96  rounded-2xl bg-base-200 p-4'>
							<TransformWrapper>
								<TransformComponent>
									<img
										className='rounded'
										src={previewImage}
										alt='preview'
									></img>
								</TransformComponent>
							</TransformWrapper>
						</div>
					</Modal.Body>

					<Modal.Actions>
						<Button
							className='mr-auto cursor-pointer select-none rounded-2xl bg-base-100 bg-gradient-to-br from-violet-500 to-secondary p-3 text-white hover:bg-gradient-to-bl'
							onMouseDown={handleShare}
						>
							<div className='my-auto flex flex-auto flex-row gap-2'>
								<IconShare></IconShare>
								<p className='my-auto'>Share</p>
							</div>
						</Button>

						<p className='my-auto ml-auto mr-3 select-none text-xs dark:text-gray-600'>
							Save as
						</p>

						<Button
							className='flex cursor-pointer select-none rounded-2xl bg-base-200 p-3'
							onMouseDown={exportAsPng}
						>
							<div className='mx-auto my-auto flex flex-auto flex-row gap-2'>
								<IconPng className='mx-auto'></IconPng>
							</div>
						</Button>
						<Button
							className='flex cursor-pointer select-none rounded-2xl bg-base-200 p-3'
							onMouseDown={exportAsJpeg}
						>
							<div className='mx-auto my-auto flex flex-auto flex-row gap-2'>
								<IconJpg className='mx-auto'></IconJpg>
							</div>
						</Button>
						<Button
							className='flex cursor-pointer select-none rounded-2xl bg-base-200 p-3'
							onMouseDown={exportAsSvg}
						>
							<div className='mx-auto my-auto flex flex-auto flex-row gap-2'>
								<IconSvg className='mx-auto'></IconSvg>
							</div>
						</Button>
					</Modal.Actions>
				</Modal>
			)}

			{/* MenuBar */}
			<CustomPortal id={'menubar'}>
				<DropMenu
					label='View'
					menu={
						<>
							<MenuItem
								click={() =>
									viewerRef.current?.setZoom(viewerRef.current?.getZoom() + 0.2)
								}
								icon={<IconZoomIn size={16}></IconZoomIn>}
								label='Zoom In'
							></MenuItem>
							<MenuItem
								click={() =>
									viewerRef.current?.setZoom(viewerRef.current?.getZoom() - 0.2)
								}
								icon={<IconZoomOut size={16}></IconZoomOut>}
								label='Zoom Out'
							></MenuItem>

							<MenuItem
								click={() => viewerRef.current?.setZoom(0.7)}
								icon={<IconZoomReset size={16}></IconZoomReset>}
								label='Zoom Reset'
							></MenuItem>

							<MenuSeparator></MenuSeparator>

							<MenuItem
								click={() => centerView()}
								icon={<IconFocusCentered size={16}></IconFocusCentered>}
								label='Center View'
								shortcut='Ctrl+Space'
							></MenuItem>
						</>
					}
				></DropMenu>
			</CustomPortal>
		</div>
	);
};
