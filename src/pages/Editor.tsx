import {
	IconAppWindow,
	IconBrandTwitter,
	IconChevronDown,
	IconChevronUp,
	IconCircle,
	IconCode,
	IconDeviceMobile,
	IconFlask,
	IconFocusCentered,
	IconHandFinger,
	IconHome,
	IconInfoCircle,
	IconJpg,
	IconLetterT,
	IconLock,
	IconPhoto,
	IconPng,
	IconPointer,
	IconQrcode,
	IconSettings,
	IconShare,
	IconSticker,
	IconSvg,
	IconX,
	IconZoomIn,
	IconZoomOut,
	IconZoomReset,
} from '@tabler/icons-react';
import { toBlob, toJpeg, toPng, toSvg } from 'html-to-image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, Navbar, Range } from 'react-daisyui';
import InfiniteViewer from 'react-infinite-viewer';
import { Link } from 'react-router-dom';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import '../App.css';
import karbonized from '../assets/karbonized.svg';
import { Tooltip } from '../components/CustomControls/Tooltip';
import { Menu as ControlsMenu } from '../components/Menu';
import { AboutModal } from '../components/Modals/AboutModal';
import { WorkspacePanel } from '../components/Panels/WorkspacePanel';
import { Workspace } from '../components/Workspace';
import { useScreenDirection } from '../hooks/useScreenDirection';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import '../utils.css';

export const Editor: React.FC = () => {
	// App Store
	const addControl = useStoreActions((state) => state.addControl);
	const setEditing = useStoreActions((state) => state.setEditing);
	const setReady = useStoreActions((state) => state.setReadyToSave);
	const workspaceName = useStoreState((state) => state.workspaceName);
	const editing = useStoreState((state) => state.editing);
	const aspectRatio = useStoreState((state) => state.lockAspect);
	const setAspectRatio = useStoreActions((state) => state.setLockAspect);

	// Component Store and Actions
	const isHorizontal = useScreenDirection();

	const [drag, setDrag] = useState(false);
	const [showAbout, setShowAbout] = useState(false);
	const [showWorkspacePanel, setShowWorkspacePanel] = useState(false);
	const [showMenu, setShowMenu] = useState(isHorizontal ? true : false);

	const [previewImage, setPreviewImage] = useState('');
	const [showPreview, setShowPreview] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	const refe = useRef<InfiniteViewer>(null);

	const [zoom, setZoom] = useState(isHorizontal ? 0.9 : 0.6);

	// Auto Scroll to Center o Init
	useEffect(() => {
		refe.current?.scrollCenter();
		if (isHorizontal) {
			refe.current?.scrollTo(
				refe.current.getScrollLeft() - 180,
				refe.current.getScrollTop()
			);
		} else {
			refe.current?.scrollTo(
				refe.current.getScrollLeft() + 60,
				refe.current.getScrollTop()
			);
		}
	}, []);

	// Save Image as PNG
	const exportAsPng = useCallback(async () => {
		setReady(true);

		if (ref.current === null) {
			console.log('NULL');
			setReady(false);

			return;
		}

		toPng(ref.current, {
			cacheBust: true,
		})
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = workspaceName + '.png';
				link.href = dataUrl;
				link.click();
				console.log('SAVED');

				setReady(false);
			})
			.catch((err) => {
				setReady(false);
				console.log(err);
			});
	}, [ref, workspaceName]);

	// Save Image as SVG
	const exportAsSvg = useCallback(async () => {
		setReady(true);

		if (ref.current === null) {
			console.log('NULL');
			setReady(false);

			return;
		}

		toSvg(ref.current, {
			cacheBust: true,
		})
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = workspaceName + '.svg';
				link.href = dataUrl;
				link.click();
				console.log('SAVED');

				setReady(false);
			})
			.catch((err) => {
				setReady(false);
				console.log(err);
			});
	}, [ref, workspaceName]);

	const exportAsJpeg = useCallback(async () => {
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
				const link = document.createElement('a');
				link.download = workspaceName + '.jpeg';
				link.href = dataUrl;
				link.click();
				console.log('SAVED');

				setReady(false);
			})
			.catch((err) => {
				setReady(false);
				console.log(err);
			});
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
				const link = document.createElement('a');
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
			className='flex h-screen w-screen flex-auto flex-col overflow-hidden bg-base-100 md:flex-row'
		>
			<div className='flex flex-auto flex-col overflow-hidden bg-base-100 p-2  md:p-0'>
				{/* Nav Bar */}
				<Navbar className='flex h-2 shrink rounded-full bg-base-200 md:rounded-2xl md:bg-transparent'>
					<Navbar.Start>
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

						<Link
							to='/'
							className='mr-2 flex-row gap-2 rounded-xl bg-base-200 p-2 text-black transition-all active:scale-90 dark:text-white md:flex'
						>
							<IconHome size={24} className='mx-auto my-auto'></IconHome>
						</Link>

						<div className='hidden select-none flex-row gap-2 rounded-xl bg-base-200 p-2 text-black dark:text-white md:flex'>
							<img className='h-8 w-full' src={karbonized}></img>
							<p className='poppins-font-family my-auto text-xl'>Karbonized</p>
						</div>
					</Navbar.Start>

					<Navbar.Center>
						<img className='h-12 w-full md:hidden' src={karbonized}></img>
					</Navbar.Center>

					<Navbar.End className='flex flex-auto gap-0 md:gap-1'>
						{/* Share Button */}
						<Button
							onClick={handleShare}
							className=' ml-auto h-12 w-12 rounded-full border-none bg-gradient-to-br from-violet-500 to-secondary p-1 hover:border-primary hover:bg-gradient-to-l md:hidden'
						>
							<IconFlask size={24} className='text-white'></IconFlask>
						</Button>

						{/* Lock Aspect Ratio */}
						<Tooltip messsage='Lock Aspect Ratio'>
							<Button
								color='ghost'
								className={`my-2 hidden h-12 w-12 flex-auto rounded-full bg-base-200 p-1 md:flex ${
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

						<p className='my-auto h-0.5 rounded bg-base-200  p-0.5 '></p>

						{/* Zoom Out */}
						<Tooltip className='flex' messsage='Zoom Out'>
							<Button
								className='my-2 hidden h-12 w-12 flex-auto rounded-full bg-base-200 p-2 md:flex'
								color='ghost'
								onClick={() => setZoom(zoom - 0.2)}
							>
								<IconZoomOut
									size={20}
									className='my-auto dark:text-white'
								></IconZoomOut>
							</Button>
						</Tooltip>

						{/* Zoom In */}
						<Tooltip className='flex' messsage='Zoom In'>
							<Button
								className='my-2 hidden h-12 w-12 flex-auto rounded-full bg-base-200 p-2 md:flex'
								color='ghost'
								onClick={() => setZoom(zoom + 0.2)}
							>
								<IconZoomIn
									size={20}
									className='my-auto dark:text-white'
								></IconZoomIn>
							</Button>
						</Tooltip>

						{/* Zoom In */}
						<Tooltip className='flex' messsage='Zoom In'>
							<Button
								className='my-2 hidden h-12  w-12 flex-auto rounded-full bg-base-200 p-2 md:flex'
								color='ghost'
								onClick={() => setZoom(0.7)}
							>
								<IconZoomReset
									size={20}
									className='my-auto dark:text-white'
								></IconZoomReset>
							</Button>
						</Tooltip>

						<p className='my-auto h-0.5 rounded bg-base-200  p-0.5 '></p>

						{/* Preview Button */}
						<Tooltip className='flex' messsage='Render'>
							<Button
								onClick={showPreviewImage}
								className='mr-2 hidden h-12 w-12 rounded-full border-none border-primary bg-gradient-to-br from-violet-500 to-secondary p-1 hover:border-primary hover:bg-gradient-to-l md:flex'
							>
								<IconFlask size={22} className='text-white'></IconFlask>
							</Button>
						</Tooltip>
					</Navbar.End>
				</Navbar>

				{/* Content*/}
				<div className='flex flex-auto flex-col overflow-hidden md:flex-row'>
					{/* Quick Bar */}
					<div className='hidden items-end '>
						<div className='absolute z-50 mb-6 ml-4 flex flex-row gap-1 rounded-xl bg-base-200 p-2'>
							{/* Center View */}
							<Tooltip messsage='Center View'>
								<Button
									color='ghost'
									className='flex flex-auto p-1'
									onClick={() => {
										refe.current?.scrollCenter();
										refe.current?.scrollTo(
											refe.current.getScrollLeft() - 180,
											refe.current.getScrollTop()
										);
									}}
								>
									<IconFocusCentered
										size={15}
										className='dark:text-white'
									></IconFocusCentered>
								</Button>
							</Tooltip>

							{/* Lock Aspect Ratio */}
							<Tooltip messsage='Lock Aspect Ratio'>
								<Button
									color='ghost'
									className={`ml-2 p-1 ${
										aspectRatio && 'border-primary bg-primary text-white'
									}`}
									onClick={() => {
										setAspectRatio(!aspectRatio);
									}}
								>
									<IconLock size={15} className='dark:text-white'></IconLock>
								</Button>
							</Tooltip>

							{/* Zoom Out */}
							<Tooltip className='flex flex-auto ' messsage='Zoom Out'>
								<Button
									className='flex flex-auto p-1'
									color='ghost'
									onClick={() => setZoom(zoom - 0.2)}
								>
									<IconZoomOut
										size={15}
										className='dark:text-white'
									></IconZoomOut>
								</Button>
							</Tooltip>

							{/* Zoom Range */}
							<Range
								color='primary'
								className='my-auto flex h-3 flex-auto p-1'
								min={0}
								max={100}
								onChange={(ev) => {
									setZoom((ev.currentTarget.value as unknown as number) / 100);
								}}
								value={zoom * 100}
							></Range>

							{/* Zoom In */}
							<Tooltip className='flex flex-auto ' messsage='Zoom In'>
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

					{/* Controls Tree */}
					<div className='order-3 mb-2 mt-1 flex w-full flex-row gap-2 overflow-auto rounded-xl bg-base-200 p-2 md:order-first md:mx-0 md:ml-2 md:w-16 md:flex-col'>
						{/* Actions */}

						{/* Show Menu */}
						<Tooltip className='flex  flex-auto md:hidden' messsage='Show Menu'>
							<Button
								color='ghost'
								className='p-1'
								onClick={() => {
									setShowMenu(!showMenu);
								}}
							>
								{showMenu ? (
									<IconChevronDown
										size={18}
										className='dark:text-white'
									></IconChevronDown>
								) : (
									<IconChevronUp
										size={18}
										className='dark:text-white'
									></IconChevronUp>
								)}
							</Button>
						</Tooltip>

						{/* Workspace Menu */}
						<Tooltip className='flex flex-auto md:hidden' messsage='Settings'>
							<Button
								color='ghost'
								className='p-1 dark:text-white'
								onClick={() => {
									setShowWorkspacePanel(true);
								}}
							>
								<IconSettings
									className='mx-auto my-auto'
									size={18}
								></IconSettings>
							</Button>
						</Tooltip>

						<p className='my-auto h-0.5 rounded bg-base-100 p-0.5 md:hidden'></p>

						{/* Select */}
						<Tooltip className='flex flex-auto' messsage='Select'>
							<Button
								color='ghost'
								className={`flex flex-auto ${
									editing &&
									'border-none bg-gradient-to-br from-violet-500 to-secondary  text-white'
								} p-1 hover:bg-gradient-to-bl`}
								onClick={() => {
									setEditing(true);
									setDrag(false);
								}}
							>
								<IconPointer
									size={18}
									className='dark:text-white'
								></IconPointer>
							</Button>
						</Tooltip>

						{/* Hand */}
						<Tooltip className='flex flex-auto ' messsage='Hand'>
							<Button
								color='ghost'
								className={`flex flex-auto flex-col ${
									drag &&
									'border-none bg-gradient-to-br from-violet-500 to-secondary   text-white hover:bg-gradient-to-bl'
								} p-1`}
								onClick={() => {
									setDrag(true);
									setEditing(false);
								}}
							>
								<IconHandFinger
									size={18}
									className='dark:text-white'
								></IconHandFinger>
							</Button>
						</Tooltip>

						<p className='my-auto h-0.5 rounded bg-base-100 p-0.5 '></p>

						{/* Code Control */}
						<Tooltip className='flex flex-auto ' messsage='Code'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'code' })}
							>
								<IconCode size={18} className='dark:text-white'></IconCode>
							</Button>
						</Tooltip>

						{/* FaIcon Control */}
						<Tooltip className='flex flex-auto ' messsage='Icon'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'faicon' })}
							>
								<IconSticker
									size={18}
									className='dark:text-white'
								></IconSticker>
							</Button>
						</Tooltip>

						{/* Text Control */}
						<Tooltip className='flex flex-auto ' messsage='Text'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'text' })}
							>
								<IconLetterT
									size={18}
									className='dark:text-white'
								></IconLetterT>
							</Button>
						</Tooltip>

						{/* Shape Control */}
						<Tooltip className='flex flex-auto ' messsage='Shape'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'arrow' })}
							>
								<IconCircle size={18} className='dark:text-white'></IconCircle>
							</Button>
						</Tooltip>

						{/* Qr Control */}
						<Tooltip className='flex flex-auto ' messsage='QR'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'qr' })}
							>
								<IconQrcode size={18} className='dark:text-white'></IconQrcode>
							</Button>
						</Tooltip>

						{/* Image Control */}
						<Tooltip className='flex flex-auto ' messsage='Image'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'image' })}
							>
								<IconPhoto size={18} className='dark:text-white'></IconPhoto>
							</Button>
						</Tooltip>

						{/* Badge Control */}
						<Tooltip className='flex flex-auto' messsage='Badge'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'badge' })}
							>
								<div className='h-2 w-4 rounded-full border-2 border-black dark:border-white'></div>
							</Button>
						</Tooltip>

						{/* Tweet Control */}
						<Tooltip className='hidden flex-auto ' messsage='Tweet'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'tweet' })}
							>
								<IconBrandTwitter
									size={18}
									className='dark:text-white'
								></IconBrandTwitter>
							</Button>
						</Tooltip>

						{/* Window Control */}
						<Tooltip className='flex flex-auto ' messsage='Window'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'window' })}
							>
								<IconAppWindow
									size={18}
									className='dark:text-white'
								></IconAppWindow>
							</Button>
						</Tooltip>

						{/* Phone Mockup Control */}
						<Tooltip className='flex flex-auto ' messsage='Phone Mockup'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => addControl({ type: 'phone_mockup' })}
							>
								<IconDeviceMobile
									size={18}
									className='dark:text-white'
								></IconDeviceMobile>
							</Button>
						</Tooltip>
					</div>

					{/* Ruler Vertical */}
					<div className='hidden'></div>

					{/* Workspace */}
					<div className={`flex flex-auto flex-col ${drag && 'cursor-move'}`}>
						{/* Ruler Horizontal */}

						<InfiniteViewer
							ref={refe}
							className='viewer flex flex-auto rounded-2xl  bg-base-100'
							useMouseDrag={drag}
							useAutoZoom
							zoom={zoom}
							usePinch={!drag}
							threshold={0}
							rangeX={[-2048, 2048]}
							rangeY={[-2048, 2048]}
							useWheelScroll
							onScroll={() => {
								/*console.log(
									'scroll left ' + e.scrollLeft + 'scroll top ' + e.scrollTop
								);*/
							}}
						>
							<div className='viewport'>
								<div className='container'>
									<Workspace reference={ref}></Workspace>
								</div>
							</div>
						</InfiniteViewer>
					</div>
				</div>

				{/* Preview */}
				{showPreview && (
					<div className='absolute z-50 flex h-screen w-screen flex-auto bg-black/80'>
						<div className='mx-auto my-auto rounded-2xl bg-base-200 p-6'>
							<div className='flex w-fit flex-row gap-1 rounded-xl bg-base-100 p-2'>
								<img className='h-10' src={karbonized}></img>
								<p className='poppins-font-family mx-2 my-auto text-2xl dark:text-white '>
									Export
								</p>
							</div>

							<div className='mt-2 flex flex-row gap-2'>
								<div className='my-auto max-h-max w-96 overflow-scroll rounded-2xl bg-base-100 p-2'>
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

								{/* Save Buttons */}
								<div className='my-auto flex flex-auto flex-col gap-3'>
									<Button
										className='flex flex-auto cursor-pointer select-none rounded-2xl bg-base-100 bg-gradient-to-br from-violet-500 to-secondary p-3 text-white hover:bg-gradient-to-bl'
										onMouseDown={handleShare}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconShare></IconShare>
											<p className='my-auto'>Share</p>
										</div>
									</Button>

									<Button
										className='flex flex-auto cursor-pointer select-none rounded-2xl bg-base-100 p-3'
										onMouseDown={exportAsPng}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconPng></IconPng>
											<p className='my-auto'>Export as PNG</p>
										</div>
									</Button>
									<Button
										className='flex flex-auto cursor-pointer select-none rounded-2xl bg-base-100 p-3'
										onMouseDown={exportAsJpeg}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconJpg></IconJpg>
											<p className='my-auto'>Export as JPG</p>
										</div>
									</Button>
									<Button
										className='flex flex-auto cursor-pointer select-none rounded-2xl bg-base-100 p-3'
										onMouseDown={exportAsSvg}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconSvg></IconSvg>
											<p className='my-auto'>Export as SVG</p>
										</div>
									</Button>

									<Button
										className='flex flex-auto cursor-pointer select-none rounded-2xl bg-red-600 p-3 text-white hover:bg-red-700'
										onMouseDown={() => setShowPreview(false)}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconX></IconX>
											<p className='my-auto'>Cancel</p>
										</div>
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Menu */}
			<div
				className={`${
					showMenu ? 'flex' : 'hidden'
				}  order-2 h-96   max-h-72  w-full flex-col items-center p-3 text-white md:h-full  md:max-h-full md:max-w-xs lg:max-w-xs`}
			>
				<ControlsMenu></ControlsMenu>
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
		</div>
	);
};
