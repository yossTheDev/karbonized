import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Dropdown, Navbar } from 'react-daisyui';
import './App.css';
import './utils.css';
import {
	IconAppWindow,
	IconBrandTwitter,
	IconCircle,
	IconCode,
	IconDeviceMobile,
	IconFlask,
	IconFocusCentered,
	IconHandFinger,
	IconInfoCircle,
	IconJpg,
	IconLetterT,
	IconLock,
	IconPhoto,
	IconPng,
	IconPointer,
	IconQrcode,
	IconShare,
	IconSticker,
	IconSvg,
	IconZoomIn,
	IconZoomOut,
	IconZoomReset,
} from '@tabler/icons-react';
import { useStoreActions, useStoreState } from './stores/Hooks';
import { Workspace } from './components/Workspace';
import { Menu as ControlsMenu } from './components/Menu';
import { toBlob, toJpeg, toPng, toSvg } from 'html-to-image';
import { StatusBar } from './components/StatusBar';
import InfiniteViewer from 'react-infinite-viewer';
import { AboutModal } from './components/Modals/AboutModal';
import { Tooltip } from './components/CustomControls/Tooltip';
import React from 'react';
import { useScreenDirection } from './hooks/useScreenDirection';
import { ContextMenu } from './components/CustomControls/ContextMenu';

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

	const [drag, setDrag] = useState(false);
	const [showAbout, setShowAbout] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	const refe = useRef<InfiniteViewer>(null);

	const isHorizontal = useScreenDirection();

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
				className='flex h-screen w-screen flex-auto flex-col overflow-hidden bg-base-200'
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

						<p className='poppins-font-family ml-2 hidden select-none text-2xl text-black dark:text-white md:flex'>
							Karbonized
						</p>
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
					</Navbar.End>
				</Navbar>

				{/* Quick Bar */}
				<div className='absolute z-50 ml-20 mt-20 hidden  lg:flex'>
					<Tooltip messsage='Center View'>
						<Button
							onClick={() => {
								refe.current?.scrollCenter();
								refe.current?.scrollTo(
									refe.current.getScrollLeft() - 180,
									refe.current.getScrollTop()
								);
							}}
						>
							<IconFocusCentered></IconFocusCentered>
						</Button>
					</Tooltip>

					<Tooltip messsage='Lock Aspect Ratio'>
						<Button
							className={`ml-2 ${
								aspectRatio && 'border-primary bg-primary text-white'
							}`}
							onClick={() => {
								setAspectRatio(!aspectRatio);
							}}
						>
							<IconLock></IconLock>
						</Button>
					</Tooltip>
				</div>

				{/* Content*/}
				<div className='flex flex-auto flex-col overflow-hidden md:flex-row'>
					{/* Controls Tree */}
					<div className='order-3 flex flex-row gap-2 overflow-y-auto bg-base-200 p-2 md:order-first md:w-16 md:flex-col'>
						{/* Actions */}

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

						{/* Zoom In */}
						<Tooltip className='flex flex-auto ' messsage='Zoom In'>
							<Button
								className='flex flex-auto p-1'
								color='ghost'
								onClick={() => setZoom(zoom + 0.2)}
							>
								<IconZoomIn size={18} className='dark:text-white'></IconZoomIn>
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
									size={18}
									className='dark:text-white'
								></IconZoomOut>
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
					<div className='order-3 flex h-60 max-h-72 w-full  flex-col bg-base-200 p-2 text-white md:h-full  md:max-h-full  md:max-w-xs lg:max-w-sm'>
						<ControlsMenu></ControlsMenu>
					</div>
				</div>

				{/* Status Bar */}
				<StatusBar></StatusBar>
			</div>

			{/* Modals */}
			{showAbout && (
				<AboutModal open onClose={() => setShowAbout(false)}></AboutModal>
			)}
		</>
	);
};

export default App;
