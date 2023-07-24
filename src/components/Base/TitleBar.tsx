import {
	IconHome,
	IconMaximize,
	IconMinimize,
	IconMoon,
	IconSun,
	IconX,
} from '@tabler/icons-react';
import { appWindow } from '@tauri-apps/api/window';
import React, { useEffect, useState } from 'react';
import { MinimizeSvg } from '../Misc/Icons';
import karbonized from '../../assets/karbonized.svg';
import { useTheme } from '../../hooks/useTheme';
import { HomeButton } from './HomeButton';

import { ipcRenderer } from 'electron';
import './TitleBar.css';

export const TitleBar: React.FC = () => {
	const [maximized, setMaximized] = useState(false);

	const [appTheme, toggleTheme] = useTheme();

	const toggleMaximized = async () => {
		setMaximized(!(await appWindow.isMaximized()));
		appWindow.toggleMaximize();
	};

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
			className='z-50 mt-1 flex max-h-12 w-full flex-auto bg-base-100 p-1'
			data-tauri-drag-region
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			<HomeButton
				className='my-auto ml-1 mt-0 h-10 w-10 rounded-2xl p-1'
				size={20}
			></HomeButton>

			<div className='hidden select-none flex-row gap-2 rounded-xl bg-base-200 p-2 text-black dark:text-white md:flex'>
				<img className='my-auto h-6' src={karbonized}></img>
				<label className='poppins-font-family my-auto mr-1 select-none'>
					Karbonized
				</label>
			</div>

			<div className='titlebar flex flex-auto'></div>

			<div className='ml-auto'>
				<div className='my-auto flex flex-row'>
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
						<MinimizeSvg className='ml-auto h-4 w-4 dark:fill-white'></MinimizeSvg>
					</div>

					<div
						className='flex flex-auto cursor-pointer rounded-xl p-2 hover:bg-neutral'
						onClick={() =>
							(window as any).electron.ipcRenderer.sendMessage('maximizeApp')
						}
					>
						{maximized ? (
							<IconMinimize className='ml-auto h-4 w-4 dark:text-white'></IconMinimize>
						) : (
							<IconMaximize className='ml-auto h-4 w-4 dark:text-white'></IconMaximize>
						)}
					</div>

					<div
						className='flex flex-auto cursor-pointer rounded-xl p-2 hover:bg-neutral'
						onClick={() =>
							(window as any).electron.ipcRenderer.sendMessage('closeApp')
						}
					>
						<IconX size={16} className='my-auto dark:text-white'></IconX>
					</div>
				</div>
			</div>
		</div>
	);
};
