import {
	IconChevronLeft,
	IconChevronRight,
	IconEdit,
	IconWallpaper,
} from '@tabler/icons-react';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { Tooltip } from '../CustomControls/Tooltip';
import { WorkspacePanel } from './WorkspacePanel';

export const RightPanel: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);
	const workspaceTab = useStoreState((state) => state.selectedTab);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	/* Component State */
	const [showMenu, setShowMenu] = useState(false);
	const [tab, setTab] = useState<'workspace' | 'control'>('control');

	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);

	/* Show/Close Menu KeyShortcut */
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'b') {
			event.preventDefault();

			setShowMenu(!showMenu);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [showMenu]);

	useEffect(() => {
		if (workspaceMode === 'edit') {
			setShowMenu(true);
		} else if (workspaceMode !== 'custom') {
			setShowMenu(false);
		}
	}, [workspaceMode]);

	useEffect(() => {
		if (workspaceTab === 'control') {
			setTab('control');
		}
	}, [workspaceTab]);

	return (
		<div className='pointer-events-auto my-2 hidden w-full max-w-[23rem] flex-row gap-1 overflow-y-auto overflow-x-hidden rounded-s-2xl bg-base-100 p-2 text-gray-950  backdrop-blur-2xl  dark:text-gray-400 md:flex'>
			{/* Tab Panels */}
			<div
				className={`relative ${
					showMenu ? 'flex' : 'hidden'
				} w-96 flex-auto flex-col overflow-hidden`}
			>
				{/* Controls */}
				<AnimatePresence>
					<div
						className={` h-full min-h-full  flex-col overflow-hidden ${
							tab === 'control' ? 'flex' : 'hidden'
						}`}
					>
						<label className='mb-2 ml-3 mt-1 select-none text-xl font-bold'>
							Control
						</label>
						<div className='overflow-auto' id='menu'></div>
						{currentID === '' && (
							<div className='flex h-96 flex-auto'>
								<p className='mx-auto my-auto select-none text-center text-xs text-base-content/70'>
									Select a control to start editing it
								</p>
							</div>
						)}
					</div>
				</AnimatePresence>

				{/* Workspace */}
				{tab === 'workspace' && (
					<AnimatePresence>
						{tab === 'workspace' && <WorkspacePanel></WorkspacePanel>}
					</AnimatePresence>
				)}
			</div>

			{/* Selectors */}
			<div className='flex flex-auto flex-col gap-1 dark:text-gray-300'>
				{/* Show/Close Menu */}
				<Tooltip message='Show/Close Menu (Ctrl+B)'>
					<button
						onClick={() => {
							setShowMenu(!showMenu);
							setWorkspaceMode('custom');
						}}
						className={`btn btn-ghost h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral`}
					>
						{showMenu ? (
							<IconChevronRight
								className='mx-auto'
								size={16}
							></IconChevronRight>
						) : (
							<IconChevronLeft className='mx-auto' size={16}></IconChevronLeft>
						)}
					</button>
				</Tooltip>

				{/* Edit */}
				<Tooltip message='Edit'>
					<button
						onClick={() => {
							setTab('control');
							setWorkspaceMode('custom');
							setShowMenu(true);
						}}
						className={`btn btn-ghost h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
							tab === 'control' && showMenu && 'bg-base-200'
						}`}
					>
						<IconEdit className='mx-auto' size={16}></IconEdit>
					</button>
				</Tooltip>

				{/* Workspace */}
				<Tooltip message='Workspace'>
					<button
						onClick={() => {
							setTab('workspace');
							setWorkspaceMode('custom');
							setWorkspaceTab('workspace');
							setShowMenu(true);
						}}
						className={`btn btn-ghost h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
							tab === 'workspace' && showMenu && 'bg-base-200'
						}`}
					>
						<IconWallpaper className='mx-auto' size={16}></IconWallpaper>
					</button>
				</Tooltip>
			</div>
		</div>
	);
};
