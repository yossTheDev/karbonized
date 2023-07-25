import React, { useEffect, useState } from 'react';
import {
	IconChevronLeft,
	IconChevronRight,
	IconEdit,
	IconHierarchy3,
	IconWallpaper,
} from '@tabler/icons-react';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { AnimatePresence } from 'framer-motion';
import { HierarchyPanel } from './Panels/HierarchyPanel';
import { WorkspacePanel } from './Panels/WorkspacePanel';
import { Tooltip } from './CustomControls/Tooltip';

export const Menu: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);
	const workspaceTab = useStoreState((state) => state.selectedTab);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	/* Component State */
	const [showMenu, setShowMenu] = useState(true);

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

	return (
		<div className='pointer-events-auto flex w-full flex-auto flex-row gap-1 overflow-y-auto overflow-x-hidden rounded-2xl bg-base-200/95 p-2  text-gray-950 shadow-xl backdrop-blur-2xl dark:text-gray-400'>
			{/* Tab Panels */}
			<div
				className={`relative ${
					showMenu ? 'flex' : 'hidden'
				} h-full w-96 flex-auto flex-col overflow-hidden`}
			>
				{/* Hierarchy */}
				{workspaceTab === 'hierarchy' && (
					<AnimatePresence>
						{workspaceTab === 'hierarchy' && <HierarchyPanel></HierarchyPanel>}
					</AnimatePresence>
				)}

				{/* Controls */}
				<AnimatePresence>
					<div
						className={` h-full min-h-full  flex-col overflow-hidden ${
							workspaceTab === 'control' ? 'flex' : 'hidden'
						}`}
					>
						<label className='mb-2 ml-3 mt-1 select-none text-xl font-bold'>
							Control
						</label>
						<div className='overflow-auto' id='menu'></div>
						{currentID === '' && (
							<div className='flex h-96 flex-auto'>
								<p className='mx-auto my-auto text-center text-xs text-gray-700'>
									Select a control to start editing it
								</p>
							</div>
						)}
					</div>
				</AnimatePresence>

				{/* Workspace */}
				{workspaceTab === 'workspace' && (
					<AnimatePresence>
						{workspaceTab === 'workspace' && <WorkspacePanel></WorkspacePanel>}
					</AnimatePresence>
				)}
			</div>

			{/* Selectors */}
			<div className='flex flex-auto flex-col gap-1 dark:text-gray-300'>
				{/* Show/Close Menu */}
				<Tooltip message='Show/Close Menu (Ctrl+B)'>
					<div
						onClick={() => {
							setShowMenu(!showMenu);
						}}
						className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral`}
					>
						{showMenu ? (
							<IconChevronRight
								className='mx-auto'
								size={16}
							></IconChevronRight>
						) : (
							<IconChevronLeft className='mx-auto' size={16}></IconChevronLeft>
						)}
					</div>
				</Tooltip>

				{/* Hierarchy */}
				<Tooltip message='Hierarchy'>
					<div
						onClick={() => {
							setWorkspaceTab('hierarchy');
							setShowMenu(true);
						}}
						className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
							workspaceTab === 'hierarchy' && showMenu && 'bg-base-100'
						}`}
					>
						<IconHierarchy3 className='mx-auto' size={16}></IconHierarchy3>
					</div>
				</Tooltip>

				{/* Edit */}
				<Tooltip message='Edit'>
					<div
						onClick={() => {
							setWorkspaceTab('control');
							setShowMenu(true);
						}}
						className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
							workspaceTab === 'control' && showMenu && 'bg-base-100'
						}`}
					>
						<IconEdit className='mx-auto' size={16}></IconEdit>
					</div>
				</Tooltip>

				{/* Workspace */}
				<Tooltip message='Workspace'>
					<div
						onClick={() => {
							setWorkspaceTab('workspace');
							setShowMenu(true);
						}}
						className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
							workspaceTab === 'workspace' && showMenu && 'bg-base-100'
						}`}
					>
						<IconWallpaper className='mx-auto' size={16}></IconWallpaper>
					</div>
				</Tooltip>
			</div>
		</div>
	);
};
