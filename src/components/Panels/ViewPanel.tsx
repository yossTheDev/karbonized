import { AppContext } from '@/AppContext';
import { isElectron } from '@/utils/isElectron';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { useStoreActions, useStoreState } from '@/stores/Hooks';
import { Focus, Lock, Moon, Sun, ZoomIn, ZoomOut } from 'lucide-react';
import { IconZoomReset } from '@tabler/icons-react';
import { useTheme } from '@/hooks/useTheme';

export const ViewPanel: React.FC = () => {
	const { viewerRef } = useContext(AppContext);
	const aspectRatio = useStoreState((state) => state.lockAspect);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);
	const setAspectRatio = useStoreActions((state) => state.setLockAspect);
	const [appTheme, toggleTheme] = useTheme();

	const centerView = (): void => {
		const width = parseFloat(currentWorkspace.workspaceWidth);

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
							onClick={() => {
								toggleTheme();
							}}
						>
							{appTheme === 'light' ? (
								<Moon size={22}></Moon>
							) : (
								<Sun size={22}></Sun>
							)}
						</Button>

						<p className='mx-1 my-auto hidden h-0.5 rounded  bg-base-200 p-0.5 lg:block'></p>
					</>
				)}

				{/* Lock Aspect Ratio */}
				<Button
					size='statusbar'
					onClick={() => {
						setAspectRatio(!aspectRatio);
					}}
					variant={aspectRatio ? 'primary' : 'ghost'}
				>
					<Lock size={16}></Lock>
				</Button>

				<p className='mx-1 my-auto hidden h-0.5 rounded bg-base-200/90 p-0.5 md:flex '></p>

				{/* Zoom Out */}
				<Button
					className='h-6 w-6'
					size='statusbar'
					variant={'ghost'}
					onClick={() =>
						viewerRef.current?.setZoom(viewerRef.current?.getZoom() - 0.2)
					}
				>
					<ZoomOut size={16}></ZoomOut>
				</Button>

				{/* Zoom In */}
				<Button
					className='h-6 w-6'
					size='statusbar'
					variant={'ghost'}
					onClick={() =>
						viewerRef.current?.setZoom(viewerRef.current?.getZoom() + 0.2)
					}
				>
					<ZoomIn size={16}></ZoomIn>
				</Button>

				{/* Zoom Reset */}
				<Button
					size='statusbar'
					variant={'ghost'}
					onClick={() => viewerRef.current?.setZoom(0.7)}
				>
					<IconZoomReset size={16}></IconZoomReset>
				</Button>

				{/* Center View */}
				<Button
					size='statusbar'
					variant={'ghost'}
					onClick={() => {
						centerView();
					}}
				>
					<Focus size={16} className='my-auto dark:text-white'></Focus>
				</Button>
			</div>
		</>
	);
};
