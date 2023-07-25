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
		<div className='flex w-full flex-auto flex-row gap-1 overflow-y-auto overflow-x-hidden bg-base-200/90 p-2  text-gray-950 shadow-xl backdrop-blur-xl dark:text-gray-400'>
			{/* Tab Panels */}
			<div
				className={`relative ${
					showMenu ? 'flex' : 'hidden'
				} w-96 flex-auto flex-col overflow-y-auto overflow-x-hidden`}
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
						id='menu'
						className={` h-full min-h-full  flex-col ${
							workspaceTab === 'control' ? 'flex' : 'hidden'
						}`}
					>
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
				{/* Workspace */}
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
							workspaceTab === 'hierarchy' && 'bg-base-100'
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
							workspaceTab === 'control' && 'bg-base-100'
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
							workspaceTab === 'workspace' && 'bg-base-100'
						}`}
					>
						<IconWallpaper className='mx-auto' size={16}></IconWallpaper>
					</div>
				</Tooltip>
			</div>
		</div>
	);
};
