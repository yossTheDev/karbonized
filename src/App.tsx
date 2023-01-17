import { LegacyRef, useCallback, useEffect, useRef } from 'react';
import { Button, Dropdown, Menu, Navbar } from 'react-daisyui';
import './App.css';
import './utils.css';
import {
	IconAppWindow,
	IconCode,
	IconFlask,
	IconLetterT,
	IconPhoto,
	IconQrcode,
	IconShare,
	IconUserCircle,
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
	const workspaceName = useStoreState((state) => state.workspaceName);

	const controlID = useStoreState((state) => state.currentControlID);

	// Component Store and Actions
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
		if (ref.current === null) {
			console.log('NULL');

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
			})
			.catch((err) => {
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
				<div className='flex flex-auto flex-col lg:flex-row overflow-hidden'>
					{/* Controls Tree */}
					<div className='flex order-3 lg:order-first flex-row lg:flex-col bg-base-200 p-2 gap-2 w-18'>
						{/* Code Control */}
						<Button color='ghost' onClick={() => addControl({ type: 'code' })}>
							<IconCode className='text-white'></IconCode>
						</Button>

						{/* Text Control */}
						<Button color='ghost' onClick={() => addControl({ type: 'text' })}>
							<IconLetterT className='text-white'></IconLetterT>
						</Button>

						{/* Qr Control */}
						<Button color='ghost' onClick={() => addControl({ type: 'qr' })}>
							<IconQrcode className='text-white'></IconQrcode>
						</Button>

						{/* Image Control */}
						<Button color='ghost' onClick={() => addControl({ type: 'image' })}>
							<IconPhoto className='text-white'></IconPhoto>
						</Button>

						{/* Window Control */}
						<Button
							color='ghost'
							onClick={() => addControl({ type: 'window' })}
						>
							<IconAppWindow className='text-white'></IconAppWindow>
						</Button>

						{/* Avatar Control */}
						<Button
							color='ghost'
							onClick={() => addControl({ type: 'avatar' })}
						>
							<IconUserCircle className='text-white'></IconUserCircle>
						</Button>
					</div>

					{/* Ruler Vertical */}
					<div className='ruler vertical flex flex-auto flex-col max-w-xs grow-0 w-8 rounded-2xl mr-2'>
						<Guides
							ref={guidey}
							type='vertical'
							backgroundColor='#090b11'
							textColor='#525863'
							lineColor='#525863'
							rulerStyle={{
								height: 'calc(100%)',
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

					<div className='flex flex-auto flex-col'>
						<InfiniteViewer
							className='viewer flex flex-auto bg-base-100 rounded-2xl'
							margin={0}
							zoom={0.8}
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

						{/* Ruler Horizontal */}
						<div
							className='ruler horizontal flex flex-auto flex-col grow-0 p-2 rounded'
							style={{}}
						>
							<Guides
								ref={guidex}
								type='horizontal'
								zoom={37.7}
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
					</div>

					{/* Menu */}
					<div className='order-3 flex flex-auto flex-col lg:max-w-xs p-2  text-white bg-base-200 overflow-y-auto overflow-x-hidden'>
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
