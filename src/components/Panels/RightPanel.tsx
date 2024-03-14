import {
	IconChevronLeft,
	IconChevronRight,
	IconEdit,
	IconWallpaper,
} from '@tabler/icons-react';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { Tooltip } from '../CustomControls/Tooltip';
import { WorkspacePanel } from './WorkspacePanel';
import { ResizablePanel } from '../ui/resizable';

export const RightPanel: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);
	const workspaceTab = useStoreState((state) => state.selectedTab);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	/* Component State */
	const panel = useRef<any>(null);
	const [showMenu, setShowMenu] = useState(false);
	const [tab, setTab] = useState<'workspace' | 'control'>('control');

	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);

	/* Show/Close Menu KeyShortcut */
	const onKeyDown = (event: KeyboardEvent): void => {
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
		if (showMenu) {
			panel.current?.expand();
		} else {
			panel.current?.collapse();
		}
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
		<ResizablePanel
			className={'min-w-8 max-w-96'}
			collapsible
			minSize={2}
			ref={panel}
			onCollapse={() => {
				setShowMenu(false);
			}}
			onExpand={() => {
				setShowMenu(true);
			}}
		>
			<div
				className={`pointer-events-auto mr-auto flex h-full w-full gap-1 overflow-hidden rounded-tl-sm border-l-2 border-base-200 bg-base-300 p-2 text-gray-950 shadow-sm dark:text-gray-100 dark:shadow-base-200 `}
			>
				{/* Selectors */}
				<div className='text-base-content flex flex-auto flex-col gap-2'>
					{/* Show/Close Menu */}
					<Tooltip message='Show/Close Menu (Ctrl+B)'>
						<button
							onClick={() => {
								setShowMenu(!showMenu);
								setWorkspaceMode('custom');
							}}
							className={`btn btn-ghost btn-sm rounded-xl`}
						>
							{showMenu ? (
								<IconChevronRight
									className='mx-auto'
									size={16}
								></IconChevronRight>
							) : (
								<IconChevronLeft
									className='mx-auto'
									size={16}
								></IconChevronLeft>
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
							className={`btn btn-ghost btn-sm rounded-xl ${
								tab === 'control' && showMenu && 'bg-base-200 md:bg-base-300'
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
							className={`btn btn-ghost btn-sm rounded-xl ${
								tab === 'workspace' && showMenu && 'bg-base-200 md:bg-base-300'
							}`}
						>
							<IconWallpaper className='mx-auto' size={16}></IconWallpaper>
						</button>
					</Tooltip>
				</div>

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
									<p className='text-base-content/70 mx-auto my-auto select-none text-center text-xs'>
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
			</div>
		</ResizablePanel>
	);
};

export default RightPanel;
