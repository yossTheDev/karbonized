import {
	IconHome,
	IconMaximize,
	IconMinimize,
	IconMoon,
	IconSun,
	IconX,
} from '@tabler/icons-react';
import { appWindow } from '@tauri-apps/api/window';
import React, { useState } from 'react';
import { MiniminizeSvg } from '../General/Icons';
import karbonized from '../../assets/karbonized.svg';
import { useTheme } from '../../hooks/useTheme';

export const TitleBar: React.FC = () => {
	const [maximized, setMaximized] = useState(true);

	const { appTheme, toggleTheme } = useTheme();

	const toggleMaximized = async () => {
		setMaximized(!(await appWindow.isMaximized()));
		appWindow.toggleMaximize();
	};

	return (
		<div
			className='mt-1 flex max-h-12 w-full flex-auto bg-base-100 p-1'
			data-tauri-drag-region
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			<a
				href='/'
				className='ml-2 mr-2 flex-row gap-2 rounded-xl bg-base-200 p-2 text-black transition-all active:scale-90 dark:text-white md:flex'
			>
				<IconHome size={20} className='mx-auto my-auto'></IconHome>
			</a>

			<div className='hidden select-none flex-row gap-2 rounded-xl bg-base-200 p-2 text-black dark:text-white md:flex'>
				<img className='my-auto h-6' src={karbonized}></img>
				<label className='poppins-font-family my-auto mr-1 select-none'>
					Karbonized
				</label>
			</div>

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
						onClick={() => appWindow.minimize()}
					>
						<MiniminizeSvg className='ml-auto h-4 w-4 dark:fill-white'></MiniminizeSvg>
					</div>

					<div
						className='flex flex-auto cursor-pointer rounded-xl p-2 hover:bg-neutral'
						onClick={() => toggleMaximized()}
					>
						{maximized ? (
							<IconMinimize className='ml-auto h-4 w-4 dark:text-white'></IconMinimize>
						) : (
							<IconMaximize className='ml-auto h-4 w-4 dark:text-white'></IconMaximize>
						)}
					</div>

					<div
						className='flex flex-auto cursor-pointer rounded-xl p-2 hover:bg-neutral'
						onClick={() => appWindow.close()}
					>
						<IconX size={16} className='my-auto dark:text-white'></IconX>
					</div>
				</div>
			</div>
		</div>
	);
};
