import { useCallback, useRef } from 'react';
import { Button, Dropdown, Menu, Navbar } from 'react-daisyui';
import './App.module.css';
import './utils.css';
import {
	IconCode,
	IconFlask,
	IconLetterT,
	IconPhoto,
	IconQrcode,
} from '@tabler/icons';
import { useStoreActions } from './stores/Hooks';
import { Workspace } from './components/Workspace';
import { Menu as ControlsMenu } from './components/Menu';
import { KarbonizedLogo } from './components/General/Icons';

function App(this: any) {
	const addControl = useStoreActions((state) => state.addControl);

	const ref = useRef<HTMLDivElement>(null);

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
				link.download = 'code-karbonized.png';
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ref]);

	return (
		<>
			<div
				id='body'
				className='bg-base-200 h-screen w-screen flex flex-col flex-auto overflow-hidden'
			>
				{/* Nav Bar */}
				<Navbar className='flex shrink-0'>
					<div className='flex-1'>
						<KarbonizedLogo className='h-12 fill-white w-40'></KarbonizedLogo>
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
								<button
									onClick={onButtonClick}
									className=' border-primary border rounded-2xl text-white font-bold flex flex-row'
								>
									<IconFlask></IconFlask>
									Save
								</button>
							</Menu.Item>
						</Menu>
					</div>
				</Navbar>

				{/* Content*/}
				<div className='flex flex-auto flex-col lg:flex-row overflow-hidden bg-base-100'>
					{/* Controls Tree */}
					<div className='flex order-3 lg:order-first flex-row lg:flex-col bg-base-200 p-2 gap-2'>
						{/* Code Control */}
						<Button onClick={() => addControl({ type: 'code' })}>
							<IconCode className='text-white'></IconCode>
						</Button>

						{/* Text Control */}
						<Button onClick={() => addControl({ type: 'text' })}>
							<IconLetterT className='text-white'></IconLetterT>
						</Button>

						{/* Qr Control */}
						<Button onClick={() => addControl({ type: 'qr' })}>
							<IconQrcode className='text-white'></IconQrcode>
						</Button>

						{/* Image Control */}
						<Button onClick={() => addControl({ type: 'image' })}>
							<IconPhoto className='text-white'></IconPhoto>
						</Button>
					</div>

					{/* Workspace */}
					<div className='order-2 mx-auto my-auto'>
						<Workspace reference={ref}></Workspace>
					</div>

					{/* Menu */}
					<div className='order-3 flex flex-auto flex-col lg:max-w-xs p-2  text-white bg-base-200 overflow-y-auto overflow-x-hidden'>
						<ControlsMenu></ControlsMenu>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
