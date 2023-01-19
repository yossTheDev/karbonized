import { useCallback, useRef, useState } from 'react';
import { Button, Menu, Navbar } from 'react-daisyui';
import './App.css';
import './utils.css';
import {
	IconAppWindow,
	IconArrowBack,
	IconCode,
	IconFlask,
	IconHandFinger,
	IconLetterT,
	IconPhoto,
	IconPointer,
	IconQrcode,
	IconShare,
	IconUserCircle,
	IconZoomIn,
	IconZoomOut,
	IconZoomReset,
} from '@tabler/icons';
import { useStoreActions, useStoreState } from './stores/Hooks';
import { Workspace } from './components/Workspace';
import { Menu as ControlsMenu } from './components/Menu';
import { toBlob, toPng } from 'html-to-image';
import { StatusBar } from './components/StatusBar';
import InfiniteViewer from 'react-infinite-viewer';

import { HorizontalGuide } from './components/Rulers/HorizontalGuide';
import { VerticalGuide } from './components/Rulers/VerticalGuide';
import { ArrowSvg } from './components/General/Icons';

function App(this: any) {
	// App Store
	const addControl = useStoreActions((state) => state.addControl);
	const setEditing = useStoreActions((state) => state.setEditing);
	const setReady = useStoreActions((state) => state.setReadyToSave);
	const workspaceName = useStoreState((state) => state.workspaceName);
	const editing = useStoreState((state) => state.editing);

	// Component Store and Actions
	const [drag, setDrag] = useState(false);
	const [zoom, setZoom] = useState(0.7);

	const ref = useRef<HTMLDivElement>(null);

	// Save Image
	const onButtonClick = useCallback(async () => {
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

	// Share Image
	const handleShare = async () => {
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
	};

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
					<div className='flex-1'>
						<p className='dark:text-white text-black poppins-font-family ml-2 text-2xl select-none'>
							Karbonized
						</p>
					</div>
					<div className='flex-none'>
						<Menu horizontal className='p-0'>
							<Menu.Item>
								{/* Share Button */}
								<Button className='rounded mr-3 ' onClick={handleShare}>
									<IconShare className='text-white'></IconShare>
									<p className='text-white'>Share</p>
								</Button>

								{/* Save Button */}
								<button
									onClick={onButtonClick}
									className=' border-primary border rounded-3xl text-white font-bold flex flex-row bg-gradient-to-br from-blue-500 to-primary'
								>
									<IconFlask></IconFlask>
									Save
								</button>
							</Menu.Item>
						</Menu>
					</div>
				</Navbar>

				{/* Content*/}
				<div className='flex flex-auto flex-col md:flex-row overflow-hidden'>
					{/* Controls Tree */}
					<div className='flex order-3 lg:order-first flex-row lg:flex-col bg-base-200 p-2 gap-2 w-16 overflow-y-auto'>
						{/* Actions */}

						{/* Select */}
						<Button
							color='ghost'
							className={`${
								editing && 'bg-primary text-white'
							} p-1 hover:bg-primary`}
							onClick={() => {
								setEditing(true);
								setDrag(false);
							}}
						>
							<IconPointer size={18} className='dark:text-white'></IconPointer>
						</Button>

						{/* Hand */}
						<Button
							color='ghost'
							className={`${
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

						{/* Zoom In */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => setZoom(zoom + 0.2)}
						>
							<IconZoomIn size={18} className='dark:text-white'></IconZoomIn>
						</Button>

						{/* Zoom Out */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => setZoom(zoom - 0.2)}
						>
							<IconZoomOut size={18} className='dark:text-white'></IconZoomOut>
						</Button>

						{/* Zoom Reset */}
						<Button className='p-1' color='ghost' onClick={() => setZoom(0.7)}>
							<IconZoomReset
								size={18}
								className='dark:text-white'
							></IconZoomReset>
						</Button>

						<p className='p-0.5 rounded bg-base-100'></p>

						{/* Code Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'code' })}
						>
							<IconCode size={18} className='dark:text-white'></IconCode>
						</Button>

						{/* Text Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'text' })}
						>
							<IconLetterT size={18} className='dark:text-white'></IconLetterT>
						</Button>

						{/* Qr Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'qr' })}
						>
							<IconQrcode size={18} className='dark:text-white'></IconQrcode>
						</Button>

						{/* Image Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'image' })}
						>
							<IconPhoto size={18} className='dark:text-white'></IconPhoto>
						</Button>

						{/* Arrow Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'arrow' })}
						>
							<ArrowSvg className='h-4 mx-auto dark:fill-white fill-black'></ArrowSvg>
						</Button>

						{/* Window Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'window' })}
						>
							<IconAppWindow
								size={18}
								className='dark:text-white'
							></IconAppWindow>
						</Button>

						{/* Avatar Control */}
						<Button
							className='p-1 hidden'
							color='ghost'
							onClick={() => addControl({ type: 'avatar' })}
						>
							<IconUserCircle
								size={18}
								className='dark:text-white'
							></IconUserCircle>
						</Button>
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
							className='viewer flex flex-auto bg-base-100 rounded-2xl'
							useMouseDrag={drag}
							useAutoZoom
							margin={0}
							zoom={zoom}
							threshold={0}
							rangeX={[-250, 250]}
							rangeY={[-250, 250]}
							useWheelScroll
							onPinch={(e) => console.log(e)}
							onScroll={(e) => {
								console.log('scroll' + e.scrollLeft);
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
					<div className='order-3 flex shrink-0 grow-0 flex-col lg:max-w-xs w-72  p-2  text-white bg-base-200'>
						<ControlsMenu></ControlsMenu>
					</div>
				</div>

				{/* Status Bar */}
				<StatusBar></StatusBar>
			</div>
		</>
	);
}

export default App;
