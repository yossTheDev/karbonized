import { useCallback, useRef } from 'react';
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
	IconWindow,
} from '@tabler/icons';
import { useStoreActions, useStoreState } from './stores/Hooks';
import { Workspace } from './components/Workspace';
import { Menu as ControlsMenu } from './components/Menu';
import { toBlob } from 'html-to-image';
import { StatusBar } from './components/StatusBar';

function App(this: any) {
	// App Store
	const addControl = useStoreActions((state) => state.addControl);
	const workspaceName = useStoreState((state) => state.workspaceName);

	// Component Store and Actions
	const ref = useRef<HTMLDivElement>(null);

	// Save Image
	const onButtonClick = useCallback(async () => {
		const { toPng } = await import('html-to-image');
		if (ref.current === null) {
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
					</div>

					{/* Workspace */}
					<div
						style={{ width: '700px', height: '512px' }}
						className='order-2 mx-auto my-auto overflow-auto flex flex-auto flex-col  bg-base-100 rounded'
					>
						<Workspace reference={ref}></Workspace>
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
