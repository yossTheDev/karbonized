import { IconMoon, IconSun } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import karbonized from '../../assets/karbonized.svg';
import { useTheme } from '../../hooks/useTheme';

import './TitleBar.css';
import { MenuBar } from './MenuBar';

export const TitleBar: React.FC = () => {
	const [maximized, setMaximized] = useState(false);

	const [appTheme, toggleTheme] = useTheme();

	useEffect(() => {
		(window as any).electron.ipcRenderer.on(
			'maximizedStatus',
			(
				event: any,
				isMaximized: boolean | ((prevState: boolean) => boolean),
			) => {
				setMaximized(isMaximized);
			},
		);
	}, []);

	return (
		<div
			id='titlebar'
			className='z-50 flex max-h-12 w-full  bg-base-200 p-1'
			data-tauri-drag-region
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			<img className='my-auto ml-2 h-5' src={karbonized}></img>

			<MenuBar></MenuBar>

			<div className='titlebar flex flex-auto'></div>

			{/* Icons */}
			<div className='ml-auto mr-1 select-none'>
				<div className='my-auto flex flex-row gap-1'>
					<div
						className='mr-2 flex flex-auto rounded-xl p-2 hover:cursor-pointer hover:bg-neutral'
						onClick={() => toggleTheme()}
					>
						{appTheme === 'light' ? (
							<IconMoon className='ml-auto h-4 w-4 dark:text-white'></IconMoon>
						) : (
							<IconSun className='ml-auto h-4 w-4 dark:text-white'></IconSun>
						)}
					</div>

					<div
						className='flex flex-auto cursor-pointer rounded-xl p-2 hover:bg-neutral'
						onClick={() =>
							(window as any).electron.ipcRenderer.sendMessage('minimizeApp')
						}
					>
						<img
							className='my-auto h-3 w-3'
							alt='minimize'
							srcSet={`./assets/window_icons/min-${
								appTheme === 'light' ? 'k' : 'w'
							}-10.png`}
						/>
					</div>

					<div
						className='flex flex-auto cursor-pointer rounded-xl p-2 hover:bg-neutral'
						onClick={() =>
							(window as any).electron.ipcRenderer.sendMessage('maximizeApp')
						}
					>
						{maximized ? (
							<img
								className='my-auto h-3 w-3'
								alt='maximize'
								srcSet={`./assets/window_icons/max-${
									appTheme === 'light' ? 'k' : 'w'
								}-10.png`}
							/>
						) : (
							<img
								className='my-auto h-3 w-3'
								alt='restore'
								srcSet={`./assets/window_icons/restore-${
									appTheme === 'light' ? 'k' : 'w'
								}-10.png`}
							/>
						)}
					</div>

					<div
						className='flex flex-auto cursor-pointer rounded-xl p-2 hover:bg-neutral'
						onClick={() =>
							(window as any).electron.ipcRenderer.sendMessage('closeApp')
						}
					>
						<img
							className='my-auto h-3 w-3'
							alt='close'
							srcSet={`./assets/window_icons/close-${
								appTheme === 'light' ? 'k' : 'w'
							}-30.png`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
