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
	IconHome2,
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
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import './App.css';
import { ContextMenu } from './components/CustomControls/ContextMenu';
import { Tooltip } from './components/CustomControls/Tooltip';
import { Menu as ControlsMenu } from './components/Menu';
import { AboutModal } from './components/Modals/AboutModal';
import { WorkspacePanel } from './components/Panels/WorkspacePanel';
import { Workspace } from './components/Workspace';
import { useScreenDirection } from './hooks/useScreenDirection';
import { useStoreActions, useStoreState } from './stores/Hooks';
import './utils.css';

const App: React.FC = () => {
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
		<>
			<div
				onContextMenu={(e) => {
					e.preventDefault();
				}}
				id='body'
				className='flex h-screen w-screen flex-auto flex-col overflow-hidden bg-base-100'
			>
				{/* Nav Bar */}
				<Navbar className='flex h-2 shrink'>
					<Navbar.Start>
						{/* About Button */}
						<Button
							color='ghost'
							className='ml-2 rounded-full hover:border-base-100   hover:bg-base-100 md:hidden'
							onClick={() => setShowAbout(true)}
						>
							<IconInfoCircle className='text-black dark:text-white'></IconInfoCircle>
							<p className='hidden text-black dark:text-white md:ml-2 md:flex'>
								Share
							</p>
						</Button>

						<div className='mt-2 flex flex-row gap-2 rounded-xl bg-base-200 p-4 text-black dark:text-white'>
							<IconHome className='my-auto'></IconHome>
							<p className='poppins-font-family my-auto text-xs'>Karbonized</p>
						</div>
					</Navbar.Start>

					<Navbar.Center>
						<p className='poppins-font-family ml-2 flex select-none text-2xl text-black dark:text-white md:hidden'>
							Karbonized
						</p>
					</Navbar.Center>

					<Navbar.End>
						{/* Share Button */}
						<Button
							color='ghost'
							className='mr-2 rounded-full hover:border-base-200 hover:bg-base-200 md:border-base-100 md:bg-base-100'
							onClick={handleShare}
						>
							<IconShare className='text-black dark:text-white'></IconShare>
							<p className='hidden text-black dark:text-white md:ml-2 md:flex'>
								Share
							</p>
						</Button>

						<ContextMenu
							menu={
								<>
									<div
										className='flex flex-auto cursor-pointer select-none rounded p-2 hover:bg-neutral'
										onMouseDown={exportAsPng}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconPng></IconPng>
											<p>Export as PNG</p>
										</div>
									</div>
									<div
										className='flex flex-auto cursor-pointer select-none rounded p-2 hover:bg-neutral'
										onMouseDown={exportAsJpeg}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconJpg></IconJpg>
											<p>Export as JPG</p>
										</div>
									</div>
									<div
										className='flex flex-auto cursor-pointer select-none rounded p-2 hover:bg-neutral'
										onMouseDown={exportAsSvg}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconSvg></IconSvg>
											<p>Export as SVG</p>
										</div>
									</div>
								</>
							}
							position='bottom-end'
						>
							<div className='mr-2 hidden w-24 cursor-pointer rounded-full border-primary bg-gradient-to-br from-blue-500 to-primary p-3 hover:border-primary hover:bg-gradient-to-l md:flex'>
								<IconFlask className='text-white'></IconFlask>
								<p className='mx-auto hidden font-bold text-white md:flex'>
									SAVE
								</p>
							</div>
						</ContextMenu>

						{/* Save Button */}
						<Button
							onClick={exportAsPng}
							className='mr-2 hidden rounded-full border-primary bg-gradient-to-br from-blue-500 to-primary hover:border-primary hover:bg-gradient-to-l'
						>
							<IconFlask className='text-white'></IconFlask>
							<p className='hidden text-white md:flex'>Save</p>
						</Button>

						{/* Preview Button */}
						<Button
							onClick={showPreviewImage}
							className='mr-2 rounded-full border-primary bg-gradient-to-br from-blue-500 to-primary hover:border-primary hover:bg-gradient-to-l'
						>
							<IconFlask className='text-white'></IconFlask>
							<p className='hidden text-white md:flex'>Preview</p>
						</Button>
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
					<div className='order-3 mx-3 my-3 flex flex-row items-center gap-2 overflow-y-auto rounded-xl bg-base-200 p-2 shadow-xl md:order-first md:mx-0 md:ml-2 md:w-14 md:flex-col'>
						{/* Actions */}

						{/* Show Menu */}
						<Tooltip className='flex  flex-auto md:hidden' messsage='Select'>
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

						{/* Show Menu */}
						<Tooltip className='flex flex-auto md:hidden' messsage='Select'>
							<Button
								color='ghost'
								className='p-1'
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

						<p className='rounded bg-base-100 p-0.5 md:hidden'></p>

						{/* Select */}
						<Tooltip className='flex flex-auto' messsage='Select'>
							<Button
								color='ghost'
								className={`flex flex-auto flex-col ${
									editing && 'bg-primary text-white'
								} p-1 hover:bg-primary`}
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
									drag && 'bg-primary text-white hover:bg-primary'
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

						{/* Zoom Reset */}
						<Tooltip className='flex flex-auto ' messsage='Zoom Reset'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => setZoom(0.7)}
							>
								<IconZoomReset
									size={18}
									className='dark:text-white'
								></IconZoomReset>
							</Button>
						</Tooltip>

						<p className='rounded bg-base-100 p-0.5'></p>

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

					{/* Menu */}
					<div
						className={`${
							showMenu ? 'flex' : 'hidden'
						} order-2   h-96  max-h-72 w-full flex-col p-3 text-white md:h-full  md:max-h-full md:max-w-xs lg:max-w-xs`}
					>
						<ControlsMenu></ControlsMenu>
					</div>
				</div>

				{showPreview && (
					<div className='absolute z-50 flex h-screen w-screen flex-auto bg-black/80'>
						<div className='mx-auto my-auto'>
							<div className='flex flex-row gap-2 rounded-2xl bg-base-200 p-6'>
								<div className='my-auto max-h-max w-96 overflow-scroll rounded'>
									<TransformWrapper>
										<TransformComponent>
											<img className='' src={previewImage} alt='preview'></img>
										</TransformComponent>
									</TransformWrapper>
								</div>

								<div className='my-auto flex flex-auto flex-col gap-3'>
									<Button
										className='flex flex-auto cursor-pointer select-none rounded-xl bg-base-100 bg-gradient-to-br from-blue-500 to-primary p-3 text-white hover:bg-gradient-to-bl'
										onMouseDown={handleShare}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconShare></IconShare>
											<p className='my-auto'>Share</p>
										</div>
									</Button>

									<Button
										className='flex flex-auto cursor-pointer select-none rounded-xl bg-base-100 p-3'
										onMouseDown={exportAsPng}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconPng></IconPng>
											<p className='my-auto'>Export as PNG</p>
										</div>
									</Button>
									<Button
										className='flex flex-auto cursor-pointer select-none rounded-xl bg-base-100 p-3'
										onMouseDown={exportAsJpeg}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconJpg></IconJpg>
											<p className='my-auto'>Export as JPG</p>
										</div>
									</Button>
									<Button
										className='flex flex-auto cursor-pointer select-none rounded-xl bg-base-100 p-3'
										onMouseDown={exportAsSvg}
									>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconSvg></IconSvg>
											<p className='my-auto'>Export as SVG</p>
										</div>
									</Button>

									<Button
										className='flex flex-auto cursor-pointer select-none rounded-xl bg-red-600 p-3 text-white hover:bg-red-700'
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
					className='bg-base-100'
				>
					<Modal.Header className='font-bold dark:text-white'>
						<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
							Workspace
						</p>
					</Modal.Header>

					<Modal.Body className='flex flex-auto select-none flex-col overflow-hidden'>
						<div className='flex max-h-80'>
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
		</>
	);
};

export default App;
