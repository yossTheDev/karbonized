import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Dropdown, Navbar } from 'react-daisyui';
import './App.css';
import './utils.css';
import {
	IconAppWindow,
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

import { HorizontalGuide } from './components/Rulers/HorizontalGuide';
import { VerticalGuide } from './components/Rulers/VerticalGuide';
import { ArrowSvg } from './components/General/Icons';
import { AboutModal } from './components/Modals/AboutModal';
import { Tooltip } from './components/CustomControls/Tooltip';
import React from 'react';
import { useWindowsSize } from './hooks/useWindowsSize';

const App: React.FC = () => {
	// App Store
	const addControl = useStoreActions((state) => state.addControl);
	const setEditing = useStoreActions((state) => state.setEditing);
	const setReady = useStoreActions((state) => state.setReadyToSave);
	const workspaceName = useStoreState((state) => state.workspaceName);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const editing = useStoreState((state) => state.editing);
	const aspectRatio = useStoreState((state) => state.lockAspect);
	const setAspectRatio = useStoreActions((state) => state.setLockAspect);

	// Component Store and Actions
	const [drag, setDrag] = useState(false);
	const [zoom, setZoom] = useState(0.9);
	const [showAbout, setShowAbout] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	const refe = useRef<InfiniteViewer>(null);

	const windowSize = useWindowsSize();

	// Auto Scroll to Center o Init
	useEffect(() => {
		refe.current?.scrollCenter();

		if (windowSize.width && windowSize.width > 640)
			refe.current?.scrollTo(
				refe.current.getScrollLeft() - 180,
				refe.current.getScrollTop()
			);
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
				className='bg-base-200 h-screen w-screen flex flex-col flex-auto overflow-hidden'
			>
				{/* Nav Bar */}
				<Navbar className='flex shrink h-2'>
					<Navbar.Start>
						{/* About Button */}
						<Button
							color='ghost'
							className='md:hidden rounded-full ml-2   hover:bg-base-100 hover:border-base-100'
							onClick={() => setShowAbout(true)}
						>
							<IconInfoCircle className='dark:text-white text-black'></IconInfoCircle>
							<p className='dark:text-white text-black md:flex hidden md:ml-2'>
								Share
							</p>
						</Button>

						<p className='md:flex hidden dark:text-white text-black poppins-font-family ml-2 text-2xl select-none'>
							Karbonized
						</p>
					</Navbar.Start>

					<Navbar.Center>
						<p className='md:hidden flex dark:text-white text-black poppins-font-family ml-2 text-2xl select-none'>
							Karbonized
						</p>
					</Navbar.Center>

					<Navbar.End>
						{/* Share Button */}
						<Button
							color='ghost'
							className='rounded-full mr-2 md:bg-base-100 md:border-base-100 hover:bg-base-200 hover:border-base-200'
							onClick={handleShare}
						>
							<IconShare className='dark:text-white text-black'></IconShare>
							<p className='dark:text-white text-black md:flex hidden md:ml-2'>
								Share
							</p>
						</Button>

						<Dropdown vertical='end' hover>
							<div className='hidden md:flex rounded-full mr-2 p-3 w-24 cursor-pointer bg-gradient-to-br border-primary hover:border-primary from-blue-500 to-primary hover:bg-gradient-to-l'>
								<IconFlask className='text-white'></IconFlask>
								<p className='text-white md:flex hidden font-bold mx-auto'>
									SAVE
								</p>
							</div>

							<Dropdown.Menu className='w-52 text-gray-400'>
								<Dropdown.Item onMouseDown={exportAsPng}>
									<IconPng></IconPng>
									<p>Export as PNG</p>
								</Dropdown.Item>
								<Dropdown.Item onMouseDown={exportAsJpeg}>
									<IconJpg></IconJpg>
									<p>Export as JPG</p>
								</Dropdown.Item>
								<Dropdown.Item onMouseDown={exportAsSvg}>
									<IconSvg></IconSvg>
									<p>Export as SVG</p>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>

						{/* Save Button */}
						<Button
							onClick={exportAsPng}
							className='hidden rounded-full mr-2 bg-gradient-to-br border-primary hover:border-primary from-blue-500 to-primary hover:bg-gradient-to-l'
						>
							<IconFlask className='text-white'></IconFlask>
							<p className='text-white md:flex hidden'>Save</p>
						</Button>
					</Navbar.End>
				</Navbar>

				{/* Quick Bar */}
				<div className='absolute lg:flex hidden ml-20 mt-20  z-50'>
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
							className={`ml-2 ${aspectRatio && 'bg-primary border-primary'}`}
							onClick={() => {
								setAspectRatio(!aspectRatio);
							}}
						>
							<IconLock></IconLock>
						</Button>
					</Tooltip>
				</div>

				{/* Content*/}
				<div className='flex flex-auto flex-col md:flex-row overflow-hidden'>
					{/* Controls Tree */}
					<div className='flex order-3 md:order-first flex-row md:flex-col bg-base-200 p-2 gap-2 md:w-16 overflow-y-auto'>
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
								className='p-1 flex flex-auto'
								color='ghost'
								onClick={() => setZoom(zoom + 0.2)}
							>
								<IconZoomIn size={18} className='dark:text-white'></IconZoomIn>
							</Button>
						</Tooltip>

						{/* Zoom Out */}
						<Tooltip className='flex flex-auto ' messsage='Zoom Out'>
							<Button
								className='p-1 flex flex-auto'
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
								className='p-1 flex flex-auto'
								color='ghost'
								onClick={() => setZoom(0.7)}
							>
								<IconZoomReset
									size={18}
									className='dark:text-white'
								></IconZoomReset>
							</Button>
						</Tooltip>

						<p className='p-0.5 rounded bg-base-100'></p>

						{/* Code Control */}
						<Tooltip className='flex flex-auto ' messsage='Code'>
							<Button
								className='p-1 flex flex-auto'
								color='ghost'
								onClick={() => addControl({ type: 'code' })}
							>
								<IconCode size={18} className='dark:text-white'></IconCode>
							</Button>
						</Tooltip>

						{/* FaIcon Control */}
						<Tooltip className='flex flex-auto ' messsage='Font Awesome Icon'>
							<Button
								className='p-1 flex flex-auto'
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
								className='p-1 flex flex-auto'
								color='ghost'
								onClick={() => addControl({ type: 'text' })}
							>
								<IconLetterT
									size={18}
									className='dark:text-white'
								></IconLetterT>
							</Button>
						</Tooltip>

						{/* Arrow Control */}
						<Tooltip className='flex flex-auto ' messsage='Arrow'>
							<Button
								className='p-1 flex flex-auto'
								color='ghost'
								onClick={() => addControl({ type: 'arrow' })}
							>
								<ArrowSvg className='h-4 w-4 mx-auto dark:fill-white fill-black'></ArrowSvg>
							</Button>
						</Tooltip>

						{/* Qr Control */}
						<Tooltip className='flex flex-auto ' messsage='QR'>
							<Button
								className='p-1 flex flex-auto'
								color='ghost'
								onClick={() => addControl({ type: 'qr' })}
							>
								<IconQrcode size={18} className='dark:text-white'></IconQrcode>
							</Button>
						</Tooltip>

						{/* Image Control */}
						<Tooltip className='flex flex-auto ' messsage='Image'>
							<Button
								className='p-1 flex flex-auto'
								color='ghost'
								onClick={() => addControl({ type: 'image' })}
							>
								<IconPhoto size={18} className='dark:text-white'></IconPhoto>
							</Button>
						</Tooltip>

						{/* Window Control */}
						<Tooltip className='flex flex-auto ' messsage='Window'>
							<Button
								className='p-1 flex flex-auto'
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
								className='p-1 flex flex-auto'
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
					<div className='hidden'>
						<VerticalGuide></VerticalGuide>
					</div>

					{/* Workspace */}
					<div className={`flex flex-auto flex-col ${drag && 'cursor-move'}`}>
						{/* Ruler Horizontal */}
						<div className='hidden'>
							<HorizontalGuide></HorizontalGuide>
						</div>

						<InfiniteViewer
							ref={refe}
							className='viewer flex flex-auto bg-base-100  rounded-2xl'
							useMouseDrag={drag}
							useAutoZoom
							zoom={zoom}
							usePinch={!drag}
							threshold={0}
							rangeX={[-2048, 2048]}
							rangeY={[-2048, 2048]}
							useWheelScroll
							onScroll={(e) => {
								console.log(
									'scroll left ' + e.scrollLeft + 'scroll top ' + e.scrollTop
								);
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
					<div className='max-h-72 h-60 md:h-full md:max-h-full order-3 flex shrink-0 grow-0 flex-col md:max-w-xs lg:max-w-sm w-full  p-2  text-white bg-base-200'>
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
