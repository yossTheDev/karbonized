import { IconMenu, IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
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
			className='flex max-h-44 w-full bg-base-300 p-1'
			data-tauri-drag-region
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			<img
				className='my-auto ml-2 h-5 select-none text-black dark:text-white'
				src={karbonized}
			></img>

			<MenuBar></MenuBar>

			<div className='titlebar flex flex-auto'></div>

			{/* Icons */}
			<div className='z-30 ml-auto mr-1 select-none'>
				<div className='my-auto flex flex-row gap-1'>
					<div
						className='mr-2 flex flex-auto rounded-full p-3 hover:cursor-pointer hover:bg-neutral active:bg-base-100'
						onClick={() => toggleTheme()}
					>
						{appTheme === 'light' ? (
							<IconMoon className='ml-auto h-4 w-4 dark:text-white'></IconMoon>
						) : (
							<IconSun className='ml-auto h-4 w-4 dark:text-white'></IconSun>
						)}
					</div>

					<div
						className='my-auto  cursor-pointer rounded-full  p-3 hover:bg-neutral active:bg-base-100'
						onClick={() =>
							(window as any).electron.ipcRenderer.sendMessage('minimizeApp')
						}
					>
						<svg
							className='mx-auto my-auto h-3 w-3 fill-black dark:fill-white'
							viewBox='0 0 412 41'
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M0 0L412 0L412 41L0 41L0 0Z'
								id='Rectangle-2'
								fill-rule='evenodd'
								stroke='none'
							/>
						</svg>
					</div>

					<div
						className='my-auto  cursor-pointer rounded-full  p-3 hover:bg-neutral active:bg-base-100'
						onClick={() =>
							(window as any).electron.ipcRenderer.sendMessage('maximizeApp')
						}
					>
						{maximized ? (
							<svg
								className='mx-auto my-auto h-3 w-3 fill-black dark:fill-white'
								width='412px'
								viewBox='0 0 412 416'
								version='1.1'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M371 0L412 0L412 416L0 416L0 -1.90735e-05L41 0L371 0ZM371 41L41 41L41 375L371 375L371 41Z'
									id='Rectangle-2-Union'
									fill-rule='evenodd'
									stroke='none'
								/>
							</svg>
						) : (
							<svg
								className='mx-auto my-auto h-3 w-3 fill-black dark:fill-white'
								viewBox='0 0 412 412.5'
								version='1.1'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M368 0.00012207L368 0L412 0L412 331L368 331L329 331L329 412L42.2462 412L42.2462 412.5L0.246216 412.5L0.246216 412L0 412L0 370L0.246212 370L0.246178 125L0 125L0 83.0001L81 83.0001L81 0.00012207L368 0.00012207ZM42.2462 125L42.2462 370L287 370L287 125L42.2462 125ZM287 83.0001L329 83.0001L329 125L329 288L368 288L368 41.0001L125 41.0001L125 83.0001L287 83.0001Z'
									id='Rectangle-2-Union'
									fill-rule='evenodd'
									stroke='none'
								/>
							</svg>
						)}
					</div>

					<div
						className='my-auto  cursor-pointer rounded-full  p-3 hover:bg-neutral active:bg-base-100'
						onClick={() =>
							(window as any).electron.ipcRenderer.sendMessage('closeApp')
						}
					>
						<svg
							className='mx-auto my-auto h-3 w-3 fill-black dark:fill-white'
							viewBox='0 0 411.34656 402.79956'
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M27.5772 0L0 27.5772L179.385 206.962L11.1242 375.222L38.7013 402.8L206.962 234.539L372.645 400.222L400.222 372.645L234.539 206.962L411.347 30.1543L383.769 2.57716L206.962 179.385L27.5772 0Z'
								id='Rectangle-2-Union'
								fill-rule='evenodd'
								stroke='none'
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TitleBar;
