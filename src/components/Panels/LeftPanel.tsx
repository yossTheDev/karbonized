import React, { useEffect, useState } from 'react';
import {
	IconChevronLeft,
	IconChevronRight,
	IconCircleSquare,
	IconEdit,
	IconHierarchy,
	IconHierarchy3,
	IconPuzzle,
	IconWallpaper,
} from '@tabler/icons-react';
import { AnimatePresence } from 'framer-motion';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { HierarchyPanel } from './HierarchyPanel';
import { Tooltip } from '../CustomControls/Tooltip';
import { ExtensionPanel } from './ExtensionsPanel';

export const LeftPanel: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);
	//const workspaceTab = useStoreState((state) => state.selectedTab);
	//const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);

	/* Component State */
	const [showMenu, setShowMenu] = useState(false);
	const [workspaceTab, setWorkspaceTab] = useState('');

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
		if (workspaceMode === 'design') {
			setShowMenu(true);
			setWorkspaceTab('hierarchy');
		} else if (workspaceMode !== 'custom') {
			setShowMenu(false);
		}
	}, [workspaceMode]);

	return (
		<div className='pointer-events-auto flex w-full flex-auto flex-row gap-1 overflow-y-auto overflow-x-hidden  p-2  text-gray-950 shadow-xl backdrop-blur-2xl dark:text-gray-400'>
			{/* Selectors */}
			<div className='flex flex-auto flex-col gap-1 dark:text-gray-300'>
				{/* Hierarchy */}
				<Tooltip message='Hierarchy'>
					<div
						onClick={() => {
							setWorkspaceMode('custom');
							setWorkspaceTab('hierarchy');
							setShowMenu(true);
						}}
						className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
							workspaceTab === 'hierarchy' && showMenu && 'bg-base-100'
						}`}
					>
						<IconCircleSquare className='mx-auto' size={16}></IconCircleSquare>
					</div>
				</Tooltip>

				{/* Extensions */}
				<Tooltip message='Extensions'>
					<div
						onClick={() => {
							setWorkspaceMode('custom');
							setWorkspaceTab('extensions');
							setShowMenu(true);
						}}
						className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
							workspaceTab === 'extensions' && showMenu && 'bg-base-100'
						}`}
					>
						<IconPuzzle className='mx-auto' size={16}></IconPuzzle>
					</div>
				</Tooltip>

				{/* Show/Close Menu */}
				<Tooltip message='Show/Close Menu (Ctrl+B)'>
					<div
						onClick={() => {
							setWorkspaceMode('custom');
							setWorkspaceTab('hierarchy');
							setShowMenu(!showMenu);
						}}
						className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral`}
					>
						{showMenu ? (
							<IconChevronLeft size={16}></IconChevronLeft>
						) : (
							<IconChevronRight
								className='mx-auto'
								size={16}
							></IconChevronRight>
						)}
					</div>
				</Tooltip>
			</div>

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

				{/* Hierarchy */}
				{workspaceTab === 'extensions' && (
					<AnimatePresence>
						{workspaceTab === 'extensions' && <ExtensionPanel></ExtensionPanel>}
					</AnimatePresence>
				)}
			</div>
		</div>
	);
};
