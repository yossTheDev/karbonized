import { LegacyRef, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Dropdown, Menu, Navbar } from 'react-daisyui';
import './App.css';
import './utils.css';
import {
	IconAppWindow,
	IconBrandGravatar,
	IconCode,
	IconFlask,
	IconHandFinger,
	IconLetterT,
	IconPhoto,
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
import { toBlob } from 'html-to-image';
import { StatusBar } from './components/StatusBar';
import InfiniteViewer from 'react-infinite-viewer';

import Guides from '@scena/react-guides';
import Selecto from 'react-selecto';

function App(this: any) {
	// App Store
	const addControl = useStoreActions((state) => state.addControl);
	const setReady = useStoreActions((state) => state.setReadyToSave);
	const workspaceName = useStoreState((state) => state.workspaceName);

	const controlID = useStoreState((state) => state.currentControlID);

	// Component Store and Actions
	const [drag, setDrag] = useState(false);
	const [zoom, setZoom] = useState(0.7);

	const ref = useRef<HTMLDivElement>(null);
	const workspace = useRef<HTMLDivElement>(null);
	const guidex = useRef<Guides>(null);
	const guidey = useRef<Guides>(null);

	useEffect(() => {
		console.log('resize guides');
		guidex.current?.resize();
		guidey.current?.resize();
	});

	// Save Image
	const onButtonClick = useCallback(async () => {
		const { toPng } = await import('html-to-image');
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
				id='body'
				className='bg-base-200 h-screen w-screen flex flex-col flex-auto overflow-hidden'
			>
				{/* Nav Bar */}
				<Navbar className='flex shrink-0'>
					<div className='flex-1'>
						<p className='text-white poppins-font-family ml-2 text-2xl select-none'>
							Karbonized
						</p>
					</div>
					<div className='flex-none'>
						<Menu horizontal className='p-0'>
							{/* Add Control Button */}
							<Menu.Item>
								<Dropdown className='text-white hidden' color='ghost'>
									<p>Controls</p>
									<Dropdown.Menu className='bg-gray-800'>
										<Dropdown.Item>
											<div className='flex flex-row gap-2'>
												<IconCode></IconCode>
												<p>Code</p>
											</div>
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Menu.Item>
							{/* Save Button */}
							<Menu.Item>
								<Button className='rounded mr-3 ' onClick={handleShare}>
									<IconShare className='text-white'></IconShare>
									<p className='text-white'>Share</p>
								</Button>
								<button
									onClick={onButtonClick}
									className=' border-primary border rounded-3xl text-white font-bold flex flex-row bg-gradient-to-br from-blue-400 to-blue-500'
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
						<Button
							color='ghost'
							className={`${drag && 'bg-primary'} p-1`}
							onClick={() => setDrag(!drag)}
						>
							<IconHandFinger size={18} className='text-white'></IconHandFinger>
						</Button>

						{/* Zoom In */}
						<Button
							className='p-1'
							color='primary'
							onClick={() => setZoom(zoom + 0.2)}
						>
							<IconZoomIn size={18} className='text-white'></IconZoomIn>
						</Button>

						{/* Zoom Out */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => setZoom(zoom - 0.2)}
						>
							<IconZoomOut size={18} className='text-white'></IconZoomOut>
						</Button>

						{/* Zoom Reset */}
						<Button className='p-1' color='ghost' onClick={() => setZoom(0.7)}>
							<IconZoomReset size={18} className='text-white'></IconZoomReset>
						</Button>

						<p className='p-0.5 rounded bg-base-100'></p>

						{/* Code Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'code' })}
						>
							<IconCode size={18} className='text-white'></IconCode>
						</Button>

						{/* Text Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'text' })}
						>
							<IconLetterT size={18} className='text-white'></IconLetterT>
						</Button>

						{/* Qr Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'qr' })}
						>
							<IconQrcode size={18} className='text-white'></IconQrcode>
						</Button>

						{/* Image Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'image' })}
						>
							<IconPhoto size={18} className='text-white'></IconPhoto>
						</Button>

						{/* Window Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'window' })}
						>
							<IconAppWindow size={18} className='text-white'></IconAppWindow>
						</Button>

						{/* Avatar Control */}
						<Button
							className='p-1'
							color='ghost'
							onClick={() => addControl({ type: 'avatar' })}
						>
							<IconUserCircle size={18} className='text-white'></IconUserCircle>
						</Button>
					</div>

					{/* Ruler Vertical */}
					<div className='ruler vertical flex flex-auto flex-col max-w-xs grow-0 w-6 rounded-2xl mr-0.2 p-1 bg-base-100'>
						<Guides
							ref={guidey}
							type='vertical'
							backgroundColor='#090b11'
							textColor='#525863'
							lineColor='#525863'
							zoom={1}
							unit={50}
							dragPosFormat={(v) => `${v}cm`}
							textFormat={(v) => `${v}px`}
							rulerStyle={{
								height: 'calc(100%)',
								width: '100%',
							}}
							displayDragPos={true}
							onChangeGuides={({ guides }) => {
								console.log('vertical', guides);
							}}
							onDragStart={(e) => {
								console.log('dragStart', e);
							}}
							onDrag={(e) => {
								console.log('drag', e);
							}}
							onDragEnd={(e) => {
								console.log('dragEnd', e);
							}}
						/>
					</div>

					{/* Workspace */}
					<div className='flex flex-auto flex-col'>
						{/* Ruler Horizontal */}
						<div className='ruler horizontal flex flex-auto flex-col grow-0 p-1 h-8  rounded bg-base-100'>
							<Guides
								ref={guidex}
								type='horizontal'
								zoom={37.7}
								textOffset={[0, 50]}
								unit={1}
								backgroundColor='#090b11'
								textColor='#525863'
								lineColor='#525863'
								snapThreshold={0}
								textFormat={(v) => `${v}px`}
								snaps={[1, 2, 3]}
								digit={1}
								style={{ height: '30px' }}
								rulerStyle={{
									width: 'calc(100%)',
									height: '100%',
								}}
								dragPosFormat={(v) => `${v}cm`}
								displayDragPos={true}
								displayGuidePos={true}
								onChangeGuides={({ guides }) => {
									console.log('horizontal', guides);
								}}
								onDragStart={(e) => {
									console.log('dragStart', e);
								}}
								onDrag={(e) => {
									console.log('drag', e);
								}}
								onDragEnd={(e) => {
									console.log('dragEnd', e);
								}}
								onClickRuler={(e) => {
									console.log('?', e);
								}}
							/>
						</div>

						<InfiniteViewer
							className='viewer flex flex-auto bg-base-100 rounded-2xl'
							useMouseDrag={drag}
							margin={0}
							zoom={zoom}
							threshold={0}
							rangeX={[-250, 250]}
							rangeY={[-250, 250]}
							useWheelScroll
							useAutoZoom
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
