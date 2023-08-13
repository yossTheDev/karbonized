import {
	IconAppWindow,
	IconBrandTwitter,
	IconBrush,
	IconCircle,
	IconCode,
	IconDeviceMobile,
	IconEraser,
	IconFlask,
	IconFocusCentered,
	IconHandFinger,
	IconLetterT,
	IconLock,
	IconMenu2,
	IconMoon,
	IconPhoto,
	IconPointer,
	IconPuzzle,
	IconQrcode,
	IconSticker,
	IconSun,
	IconZoomIn,
	IconZoomOut,
	IconZoomReset,
} from '@tabler/icons-react';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Button, Navbar, Range } from 'react-daisyui';
import '../App.css';
import {
	DropMenu,
	MenuItem,
	MenuSeparator,
} from '../components/CustomControls/DropMenu';
import { Tooltip } from '../components/CustomControls/Tooltip';
import { CustomPortal } from '../components/Portal';
import { useScreenDirection } from '../hooks/useScreenDirection';
import { useTheme } from '../hooks/useTheme';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import '../utils.css';
import { getRandomNumber } from '../utils/getRandom';
import { isElectron } from '../utils/isElectron';
import './Editor.css';

const Workspace = React.lazy(() => import('../components/Workspace'));
const StatusBar = React.lazy(() => import('../components/Base/StatusBar'));
const HomeButton = React.lazy(() => import('../components/Base/HomeButton'));
const ColorPicker = React.lazy(
	() => import('../components/CustomControls/ColorPicker'),
);
const TabBar = React.lazy(() => import('../components/Base/TabBar'));
const LeftPanel = React.lazy(() => import('../components/Panels/LeftPanel'));
const RightPanel = React.lazy(() => import('../components/Panels/RightPanel'));
const InfiniteViewer = React.lazy(() => import('react-infinite-viewer'));

export const Editor: React.FC = () => {
	/* App Store */
	const addControl = useStoreActions((state) => state.addControl);
	const setEditing = useStoreActions((state) => state.setEditing);
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
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	/* Copy/Paste System */
	const controlID = useStoreState((state) => state.currentControlID);
	const currentControlProperties = useStoreState(
		(state) => state.currentControlProperties,
	);
	const initialProperties = useStoreState((state) => state.initialProperties);
	const ControlProperties = useStoreState((state) => state.ControlProperties);
	const addInitialProperty = useStoreActions(
		(state) => state.addInitialProperty,
	);
	const addControlProperty = useStoreActions(
		(state) => state.addControlProperty,
	);

	const workspaceMode = useStoreState((state) => state.workspaceMode);

	const redo = useStoreActions((state) => state.redo);
	const undo = useStoreActions((state) => state.undo);

	/* Component Store and Actions */
	const isHorizontal = useScreenDirection();
	const [appTheme, toggleTheme] = useTheme();

	const [drag, setDrag] = useState(false);
	const [showAbout, setShowAbout] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	const viewerRef = useRef<any>(null);

	const [zoom, setZoom] = useState(isHorizontal ? 0.9 : 0.4);

	const getElementsByType = (type: string) => {
		return (
			currentWorkspace.controls.filter((item) => item.type === type).length + 1
		);
	};

	const centerView = () => {
		const width = parseFloat(currentWorkspace.workspaceWidth);

		if (isHorizontal) {
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
		} else {
			if (width < 1280) {
				viewerRef.current?.setZoom(0.6);
			} else if (width >= 1280 && width < 1920) {
				viewerRef.current?.setZoom(0.25);
			} else if (width >= 1920) {
				viewerRef.current?.setZoom(0.1);
			}
		}

		viewerRef.current?.scrollCenter();
	};

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
			setAspectRatio(!aspectRatio);
		} else if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
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
	}, [currentWorkspace, workspaceMode, aspectRatio]);

	/* Handle Duplicate Elements */
	useEffect(() => {
		const OnKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'd') {
				event.preventDefault();

				/* Copy Control Properties */
				const newControlID =
					controlID.split('-')[0] + '-' + getRandomNumber().toString();

				currentControlProperties.forEach((item) => {
					const id = item.id.split('-');
					const prop = id[id.length - 1];

					addInitialProperty({
						id: newControlID + '-' + prop,
						value: item.value,
					});
					addControlProperty({
						id: newControlID + '-' + prop,
						value: item.value,
					});
				});

				/* Add Control To Workspace */
				addControl({
					type:
						currentWorkspace.controls.find((item) => item.id === controlID)
							?.type ?? newControlID.split('-')[0],
					id: newControlID,
					isSelectable: true,
					isDeleted: false,
					name: `${newControlID.split('-')[0]} ${getElementsByType(
						newControlID.split('-')[0],
					)}`,
					isVisible: true,
				});
			}
		};

		window.addEventListener('keydown', OnKeyDown);

		return () => {
			window.removeEventListener('keydown', OnKeyDown);
		};
	}, [controlID, ControlProperties, initialProperties]);

	return (
		<>
			<div
				onContextMenu={(e) => {
					e.preventDefault();
				}}
				id='body'
				className='relative flex flex-auto flex-row overflow-hidden '
			>
				{/* Left Panel */}
				<div className='flex max-w-xs'>
					<LeftPanel></LeftPanel>
				</div>

				{/* Content */}
				<div className='relative mb-1 flex flex-auto flex-col overflow-hidden  p-0'>
					{/* Nav Bar Mobile */}
					{!isHorizontal && (
						<Navbar className='bg-base-100'>
							<Navbar.Start className='z-20'>
								<label
									htmlFor='my-drawer-2'
									className='btn btn-circle btn-ghost drawer-button active:bg-base-300 lg:hidden'
								>
									<IconMenu2
										className='mx-auto dark:text-gray-300'
										size={24}
									></IconMenu2>
								</label>
							</Navbar.Start>

							<Navbar.Center>
								<label className='dark:text-gray-300'>
									K A R B O N I Z E D
								</label>
							</Navbar.Center>

							<Navbar.End>
								<HomeButton></HomeButton>
							</Navbar.End>
						</Navbar>
					)}

					{/* Quick Settings*/}
					<div className='pointer-events-none absolute z-20  flex h-full  w-full bg-transparent '>
						<TabBar></TabBar>

						<div className='pointer-events-auto relative mb-28 ml-auto mr-2 mt-auto flex h-fit max-w-fit flex-auto  flex-col gap-1 md:mr-4  md:mt-2 md:flex-row md:gap-1 lg:flex'>
							{/* Change Theme */}
							{!isElectron() && (
								<>
									<Tooltip placement='bottom' message='Change Theme'>
										<Button
											size='md'
											shape='circle'
											color='neutral'
											className='my-auto hidden border-none bg-base-200/90 lg:flex'
											onClick={() => toggleTheme()}
										>
											{appTheme === 'light' ? (
												<IconMoon
													size={22}
													className='mx-auto my-auto text-base-content dark:text-white'
												></IconMoon>
											) : (
												<IconSun
													size={22}
													className='mx-auto my-auto text-base-content dark:text-white'
												></IconSun>
											)}
										</Button>
									</Tooltip>

									<p className='mx-1 my-auto hidden h-0.5 rounded  bg-base-200 p-0.5 lg:block'></p>
								</>
							)}

							{/* Lock Aspect Ratio */}
							<Tooltip placement='bottom' message='Lock Aspect Ratio (Ctrl+R)'>
								<Button
									size='md'
									shape='circle'
									className={`my-auto hidden  flex-auto rounded-full border-none bg-base-200/90 p-1 hover:bg-base-100 md:flex ${
										aspectRatio && 'border-none bg-primary text-white'
									}`}
									onClick={() => {
										setAspectRatio(!aspectRatio);
									}}
								>
									<IconLock size={22} className='dark:text-white'></IconLock>
								</Button>
							</Tooltip>

							<p className='mx-1 my-auto hidden h-0.5 rounded bg-base-200/90 p-0.5 md:flex '></p>

							{/* Zoom Out */}
							<Tooltip placement='bottom' message='Zoom Out'>
								<Button
									size='md'
									shape='circle'
									className='my-auto  flex-auto rounded-full border-none bg-base-200/90  hover:bg-base-100 md:flex'
									onClick={() =>
										viewerRef.current?.setZoom(
											viewerRef.current?.getZoom() - 0.2,
										)
									}
								>
									<IconZoomOut
										size={22}
										className='my-auto dark:text-white'
									></IconZoomOut>
								</Button>
							</Tooltip>

							{/* Zoom In */}
							<Tooltip placement='bottom' message='Zoom In'>
								<Button
									size='md'
									shape='circle'
									className='my-auto   flex-auto rounded-full border-none bg-base-200/90 p-2 hover:bg-base-100 md:flex'
									onClick={() =>
										viewerRef.current?.setZoom(
											viewerRef.current?.getZoom() + 0.2,
										)
									}
								>
									<IconZoomIn
										size={22}
										className='my-auto dark:text-white'
									></IconZoomIn>
								</Button>
							</Tooltip>

							{/* Zoom Reset */}
							<Tooltip placement='bottom' message='Zoom Reset'>
								<Button
									size='md'
									shape='circle'
									className='my-auto hidden flex-auto rounded-full border-none bg-base-200/90 hover:bg-base-100  md:flex'
									onClick={() => viewerRef.current?.setZoom(0.7)}
								>
									<IconZoomReset
										size={22}
										className='my-auto dark:text-white'
									></IconZoomReset>
								</Button>
							</Tooltip>

							{/* Center View */}
							<Tooltip placement='bottom' message='Center View'>
								<Button
									size='md'
									shape='circle'
									className='bg-base-200/90 hover:bg-base-100 md:hidden'
									onClick={() => centerView()}
								>
									<IconFocusCentered
										size={22}
										className='my-auto dark:text-white'
									></IconFocusCentered>
								</Button>
							</Tooltip>

							{/* Preview Button */}
							<Tooltip placement='bottom' message='Render (Ctrl+S)'>
								<Button className='mr-2 hidden h-12 w-12 rounded-full border-none border-primary bg-gradient-to-br from-violet-500 to-secondary p-1 hover:border-primary hover:bg-gradient-to-l '>
									<IconFlask size={22} className='text-white'></IconFlask>
								</Button>
							</Tooltip>
						</div>
					</div>

					{/* Content*/}
					<div className='relative flex flex-auto flex-col overflow-hidden md:flex-row'>
						{/* Draw Bar */}
						{(canDraw || isErasing) && (
							<div className=' absolute flex h-full'>
								<div className=' z-50 mb-1 ml-8 mt-auto flex flex-row gap-1 rounded-2xl bg-base-100/90 px-2 py-0.5'>
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
										placement='right-end'
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
						<div className={`flex flex-auto flex-col ${drag && 'cursor-move'}`}>
							{/* Ruler Horizontal */}
							<InfiniteViewer
								ref={viewerRef}
								className='viewer my-2 flex flex-auto'
								useAutoZoom
								useMouseDrag={drag}
								useGesture
								usePinch={!drag}
								threshold={0}
								useResizeObserver
								useWheelScroll
								useWheelPinch
								useTransform
							>
								<div
									style={{
										width: currentWorkspace.workspaceWidth + 'px',
										height: currentWorkspace.workspaceHeight + 'px',
									}}
									className='viewport'
								>
									<Suspense
										fallback={
											<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
										}
									>
										<Workspace reference={ref}></Workspace>
									</Suspense>
								</div>
							</InfiniteViewer>
						</div>

						<p className='hidden h-full w-full bg-white text-white'></p>

						{/* Controls */}
						<div className='pointer-events-none absolute z-10 flex h-full w-full px-2 md:ml-2 md:w-fit'>
							<div className='pointer-events-auto mb-8 mt-auto flex  h-fit w-fit gap-3 overflow-x-scroll rounded-2xl bg-base-100/90 p-2 md:mx-auto  md:my-auto md:flex-col  md:overflow-hidden  md:backdrop-blur-xl'>
								{/* Tools */}
								<div className='flex gap-2 md:w-20 md:flex-wrap  md:gap-0'>
									{/* Actions */}

									{/* Select */}
									<Tooltip className='flex flex-auto' message='Select (Ctrl+W)'>
										<Button
											color='ghost'
											className={`flex flex-auto rounded-2xl ${
												editing &&
												'border-none bg-primary text-white  hover:bg-primary-focus'
											} p-1 `}
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
												'border-none  bg-primary  text-white hover:bg-primary-focus'
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
									<Tooltip className='hidden flex-auto md:flex' message='Brush'>
										<Button
											color='ghost'
											className={`flex flex-auto rounded-2xl ${
												canDraw &&
												'border-none bg-primary text-white  hover:bg-primary-focus'
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
									<Tooltip className='hidden flex-auto md:flex' message='Erase'>
										<Button
											color='ghost'
											className={`flex flex-auto rounded-2xl ${
												isErasing &&
												'border-none bg-primary text-white hover:bg-primary-focus'
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

								<div className='mx-auto my-auto hidden h-1 w-1 rounded bg-base-200/80 p-1 md:flex '></div>

								{/* Basics */}

								<div className='flex gap-2 md:w-20 md:flex-wrap   md:gap-0'>
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
											<IconCode
												size={18}
												className='dark:text-white'
											></IconCode>
										</Button>
									</Tooltip>

									{/* FaIcon Control */}
									<Tooltip className='flex flex-auto ' message='Icon'>
										<Button
											className='flex flex-auto rounded-2xl p-1'
											color='ghost'
											onClick={() =>
												addControl({
													type: 'icon',
													id: `icon-${getRandomNumber()}`,
													isSelectable: true,
													isDeleted: false,
													name: `icon ${getElementsByType('icon')}`,
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
													type: 'shape',
													id: `shape-${getRandomNumber()}`,
													isSelectable: true,
													isDeleted: false,
													name: `shape ${getElementsByType('shape')}`,
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

								<div className='mx-auto my-auto hidden h-1 w-1 rounded bg-base-200/80 p-1 md:flex '></div>

								{/* Others */}

								<div className='flex gap-2 md:w-20 md:flex-wrap  md:gap-0 '>
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

									{/* Custom Control */}
									<Tooltip className='hidden flex-auto ' message='Custom'>
										<Button
											className='flex flex-auto rounded-2xl p-1'
											color='ghost'
											onClick={() =>
												addControl({
													type: 'custom',
													id: `custom-${getRandomNumber()}`,
													isSelectable: true,
													isDeleted: false,
													name: `custom ${getElementsByType('custom')}`,
													isVisible: true,
												})
											}
										>
											<IconPuzzle
												size={18}
												className='dark:text-white'
											></IconPuzzle>
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

				{/* MenuBar */}
				<CustomPortal id={'menubar'}>
					<DropMenu
						label='View'
						menu={
							<>
								<MenuItem
									click={() =>
										viewerRef.current?.setZoom(
											viewerRef.current?.getZoom() + 0.2,
										)
									}
									icon={<IconZoomIn size={16}></IconZoomIn>}
									label='Zoom In'
								></MenuItem>
								<MenuItem
									click={() =>
										viewerRef.current?.setZoom(
											viewerRef.current?.getZoom() - 0.2,
										)
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
		</>
	);
};

export default Editor;
