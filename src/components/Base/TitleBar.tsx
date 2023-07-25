import { IconMoon, IconSun } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import karbonized from '../../assets/karbonized.svg';
import { useTheme } from '../../hooks/useTheme';
import { HomeButton } from './HomeButton';

import './TitleBar.css';

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
			className='z-50 flex max-h-10 w-full flex-auto bg-base-200 p-1'
			data-tauri-drag-region
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			<HomeButton
				className='my-auto ml-2 mt-0 h-8 w-8 rounded  p-1 hover:bg-neutral'
				size={20}
			></HomeButton>

			<div className='hidden select-none flex-row gap-2 rounded-xl bg-base-200 p-1 text-black dark:text-white md:flex'>
				<img className='my-auto h-5' src={karbonized}></img>
				<label className='poppins-font-family my-auto mr-1 select-none'>
					Karbonized
				</label>
			</div>

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
