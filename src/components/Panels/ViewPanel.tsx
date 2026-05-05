import { AppContext } from '@/AppContext';
import { isElectron } from '@/utils/isElectron';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { useWorkspaceStore, useUIStore } from '@/stores';
import {
	Focus,
	Lock,
	Moon,
	Sun,
	ZoomIn,
	ZoomOut,
	RotateCcw,
} from 'lucide-react';
import { Separator } from '../ui/separator';

export const ViewPanel: React.FC = () => {
	const { viewerRef, theme, toggleTheme } = useContext(AppContext);
	const aspectRatio = useUIStore((state) => state.lockAspect);
	const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
	const setAspectRatio = useUIStore((state) => state.setLockAspect);

	const centerView = (): void => {
		const width = parseFloat(currentWorkspace?.workspaceWidth || '0');

		if (width < 1280) {
			viewerRef.current?.setZoom(0.9);
		} else if (width >= 1280 && width < 1920) {
			viewerRef.current?.setZoom(0.6);
		} else if (width >= 1920 && width < 2560) {
			viewerRef.current?.setZoom(0.4);
		} else if (width >= 2560 && width < 3840) {
			viewerRef.current?.setZoom(0.3);
		} else if (width >= 3840) {
			viewerRef.current?.setZoom(0.2);
		}

		viewerRef.current?.scrollCenter();
	};

	return (
		<>
			<div className='ml-auto flex items-center gap-1'>
				{/* Change Theme */}
				{!isElectron() && (
					<>
						<Button
							size='icon'
							variant={'ghost'}
							className='h-7 w-7'
							onClick={() => {
								toggleTheme();
							}}
						>
							{theme === 'light' ? (
								<Moon className='h-4 w-4' />
							) : (
								<Sun className='h-4 w-4' />
							)}
						</Button>

						<Separator orientation='vertical' className='h-4 mx-1' />
					</>
				)}

				{/* Lock Aspect Ratio */}
				<Button
					size='icon'
					className='h-7 w-7'
					onClick={() => {
						setAspectRatio(!aspectRatio);
					}}
					variant={aspectRatio ? 'default' : 'ghost'}
				>
					<Lock className='h-3.5 w-3.5' />
				</Button>

				<Separator orientation='vertical' className='h-4 mx-1' />

				{/* Zoom Out */}
				<Button
					size='icon'
					variant={'ghost'}
					className='h-7 w-7'
					onClick={() =>
						viewerRef.current?.setZoom(viewerRef.current?.getZoom() - 0.2)
					}
				>
					<ZoomOut className='h-3.5 w-3.5' />
				</Button>

				{/* Zoom In */}
				<Button
					size='icon'
					variant={'ghost'}
					className='h-7 w-7'
					onClick={() =>
						viewerRef.current?.setZoom(viewerRef.current?.getZoom() + 0.2)
					}
				>
					<ZoomIn className='h-3.5 w-3.5' />
				</Button>

				{/* Zoom Reset */}
				<Button
					size='icon'
					variant={'ghost'}
					className='h-7 w-7'
					onClick={() => viewerRef.current?.setZoom(0.7)}
				>
					<RotateCcw className='h-3.5 w-3.5' />
				</Button>

				{/* Center View */}
				<Button
					size='icon'
					variant={'ghost'}
					className='h-7 w-7'
					onClick={() => {
						centerView();
					}}
				>
					<Focus className='h-3.5 w-3.5' />
				</Button>
			</div>
		</>
	);
};
