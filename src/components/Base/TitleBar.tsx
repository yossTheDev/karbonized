import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../AppContext';
import './TitleBar.css';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { KarbonizedLogoFlat } from '../Icons/Icons';
import { ContextualMenuBar } from './ContextualMenuBar';

export const TitleBar: React.FC = () => {
	const [maximized, setMaximized] = useState(false);
	const { theme, toggleTheme } = useContext(AppContext);

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
			className='draggable h-12 min-h-12 border-b bg-sidebar flex w-screen border-border z-1000'
			onContextMenu={(e) => {
				e.preventDefault();
			}}
		>
			{/* Menu Bar */}
			<div className='not-draggable flex max-w-[80% py-0 items-center overflow-x-hidden'>
				<KarbonizedLogoFlat className='size-4 min-w-4 ml-4 mr-2' />

				<ContextualMenuBar></ContextualMenuBar>
			</div>

			{/* Actions */}
			<div className='not-draggable pointer-events-auto z-10 ml-auto flex items-center gap-1'>
				<Button
					size={'icon'}
					variant={'ghost'}
					className='ml-auto mr-2 rounded-full p-3 hover:cursor-pointer hover:bg-accent active:bg-accent/70'
					onClick={() => {
						toggleTheme();
					}}
				>
					{theme === 'light' ? (
						<Moon className='ml-auto h-4 w-4 text-foreground'></Moon>
					) : (
						<Sun className='ml-auto h-4 w-4 text-foreground'></Sun>
					)}
				</Button>

				<button
					className='cursor-pointer px-5 py-4 hover:bg-foreground/10 active:bg-foreground/20'
					onClick={() =>
						(window as any).electron.ipcRenderer.sendMessage('minimizeApp')
					}
				>
					<svg
						className='mx-auto my-auto h-3 w-3 text-foreground'
						viewBox='0 0 412 41'
						version='1.1'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M0 0L412 0L412 41L0 41L0 0Z'
							id='Rectangle-2'
							fillRule='evenodd'
							fill='currentColor'
							stroke='none'
						/>
					</svg>
				</button>

				<button
					className='cursor-pointer px-5 py-4 hover:bg-foreground/10 active:bg-foreground/20'
					onClick={() =>
						(window as any).electron.ipcRenderer.sendMessage('maximizeApp')
					}
				>
					{maximized ? (
						<svg
							className='mx-auto my-auto h-3 w-3 text-foreground'
							width='412px'
							viewBox='0 0 412 416'
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M371 0L412 0L412 416L0 416L0 -1.90735e-05L41 0L371 0ZM371 41L41 41L41 375L371 375L371 41Z'
								id='Rectangle-2-Union'
								fillRule='evenodd'
								fill='currentColor'
								stroke='none'
							/>
						</svg>
					) : (
						<svg
							className='mx-auto my-auto h-3 w-3 text-foreground'
							viewBox='0 0 412 412.5'
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M368 0.00012207L368 0L412 0L412 331L368 331L329 331L329 412L42.2462 412L42.2462 412.5L0.246216 412.5L0.246216 412L0 412L0 370L0.246212 370L0.246178 125L0 125L0 83.0001L81 83.0001L81 0.00012207L368 0.00012207ZM42.2462 125L42.2462 370L287 370L287 125L42.2462 125ZM287 83.0001L329 83.0001L329 125L329 288L368 288L368 41.0001L125 41.0001L125 83.0001L287 83.0001Z'
								id='Rectangle-2-Union'
								fillRule='evenodd'
								fill='currentColor'
								stroke='none'
							/>
						</svg>
					)}
				</button>

				<button
					className='group cursor-pointer px-5 py-4 hover:bg-red-700 active:bg-red-800'
					onClick={() =>
						(window as any).electron.ipcRenderer.sendMessage('closeApp')
					}
				>
					<svg
						className='mx-auto my-auto h-3 w-3 text-foreground group-hover:text-destructive-foreground'
						viewBox='0 0 411.34656 402.79956'
						version='1.1'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M27.5772 0L0 27.5772L179.385 206.962L11.1242 375.222L38.7013 402.8L206.962 234.539L372.645 400.222L400.222 372.645L234.539 206.962L411.347 30.1543L383.769 2.57716L206.962 179.385L27.5772 0Z'
							id='Rectangle-2-Union'
							fillRule='evenodd'
							fill='currentColor'
							stroke='none'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default TitleBar;
