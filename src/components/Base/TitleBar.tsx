import { IconMoon, IconSun } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
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
			className='flex max-h-44 w-full bg-base-200 p-1'
			data-tauri-drag-region
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			<svg
				className='fill-base-content my-auto ml-2 flex h-6 w-6 dark:fill-white'
				viewBox='0 0 451.31622 451.31616'
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
			>
				<defs>
					<path
						d='M251.114 10.5456C237.053 -3.5152 214.263 -3.5152 200.202 10.5456L10.5456 200.202C-3.51519 214.263 -3.51519 237.053 10.5456 251.114L200.202 440.771C214.263 454.831 237.053 454.831 251.114 440.771L440.771 251.114C454.831 237.053 454.831 214.263 440.771 200.202L251.114 10.5456ZM251.151 18.1452C237.091 4.08441 214.3 4.08443 200.24 18.1452L18.2403 200.145C4.17954 214.205 4.17954 236.995 18.2403 251.056L200.24 433.056C214.3 447.116 237.091 447.116 251.151 433.056L433.151 251.056C447.212 236.995 447.212 214.205 433.151 200.145L251.151 18.1452Z'
						id='path_1'
					/>
				</defs>
				<g id='Group-3'>
					<g id='Rec-Subtract'>
						<g clip-path='url(#clip_1)'>
							<use fill='none' stroke-width='12' />
						</g>
					</g>
					<path
						d='M203.05 47.5693C215.56 35.0586 235.838 35.0586 248.349 47.5693L403.75 202.971C416.261 215.482 416.261 235.759 403.75 248.27L248.349 403.672C244.634 407.387 240.234 409.999 235.556 411.507C235.585 398.816 232.019 400.749 239.573 374.964C247.126 349.179 255.652 338.375 265.771 308.368C275.89 278.36 275.179 275.842 280.05 254.932C284.92 234.023 281.278 201.52 258.561 169.564C233.034 133.656 192.433 98.9087 169.001 81.618L203.05 47.5693L203.05 47.5693ZM88.4009 288.828C88.3898 288.882 88.3787 288.936 88.3677 288.99L47.6482 248.27C35.1375 235.759 35.1375 215.482 47.6482 202.971L162.022 86.373C165.225 101.533 178.6 131.78 169.14 158.04C150.072 210.97 99.9601 233.004 88.4009 288.828L88.4009 288.828Z'
						id='Vector'
						fill-rule='evenodd'
						stroke='none'
					/>
				</g>
			</svg>

			<MenuBar></MenuBar>

			<div className='titlebar flex flex-auto'></div>

			{/* Icons */}
			<div className='z-30 ml-auto mr-1 select-none'>
				<div className='my-auto flex flex-row gap-1'>
					<div
						className='hover:bg-neutral mr-2 flex flex-auto rounded-full p-3 hover:cursor-pointer active:bg-base-100'
						onClick={() => toggleTheme()}
					>
						{appTheme === 'light' ? (
							<IconMoon className='ml-auto h-4 w-4 dark:text-white'></IconMoon>
						) : (
							<IconSun className='ml-auto h-4 w-4 dark:text-white'></IconSun>
						)}
					</div>

					<div
						className='hover:bg-neutral  my-auto cursor-pointer  rounded-full p-3 active:bg-base-100'
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
						className='hover:bg-neutral  my-auto cursor-pointer  rounded-full p-3 active:bg-base-100'
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
						className='hover:bg-neutral  my-auto cursor-pointer  rounded-full p-3 active:bg-base-100'
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
