import React, { useContext, useEffect, useState } from 'react';
import {
	IconChevronLeft,
	IconChevronRight,
	IconCircleSquare,
	IconEdit,
	IconPuzzle,
	IconWallpaper,
} from '@tabler/icons-react';
import { AnimatePresence } from 'framer-motion';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { HierarchyPanel } from './HierarchyPanel';
import { Tooltip } from '../CustomControls/Tooltip';
import { ExtensionPanel } from './ExtensionsPanel';
import { isElectron } from '../../utils/isElectron';
import { useScreenDirection } from '../../hooks/useScreenDirection';
import { WorkspacePanel } from './WorkspacePanel';

export const LeftPanel: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);

	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	/* Component State */
	const isHorizontal = useScreenDirection();

	const [show, setShow] = useState(isHorizontal ? false : true);
	const [showMenu, setShowMenu] = useState(isHorizontal ? false : true);
	const [tab, setTab] = useState('hierarchy');

	/* Show/Close Menu KeyShortcut */
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'b') {
			event.preventDefault();

			setShowMenu(!showMenu);
		}
	};

	useEffect(() => {
		if (!isHorizontal) {
			setShowMenu(true);
		}
	});

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [showMenu]);

	useEffect(() => {
		if (workspaceMode === 'design') {
			setShowMenu(true);
			setTab('hierarchy');
		} else if (workspaceMode !== 'custom') {
			setShowMenu(false);
		}
	}, [workspaceMode]);

	return (
		<>
			<div className='drawer w-0 lg:drawer-open md:w-full lg:py-2'>
				<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />

				<div className='drawer-side relative z-50 h-full'>
					<label htmlFor='my-drawer-2' className='drawer-overlay w-screen' />
					<div className='bg pointer-events-auto z-40  mr-auto flex h-full w-5/6 grow-0 flex-row gap-1 overflow-hidden rounded-e-2xl bg-base-100 p-2  text-gray-950 shadow-xl  backdrop-blur-2xl dark:text-gray-400 md:w-fit md:max-w-[20rem] '>
						{/* Selectors */}
						<div className='flex flex-auto flex-col gap-1 dark:text-gray-300'>
							{/* Hierarchy */}
							<Tooltip message='Hierarchy'>
								<div
									onClick={() => {
										setWorkspaceMode('custom');
										setTab('hierarchy');
										setShowMenu(true);
									}}
									className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
										tab === 'hierarchy' && showMenu && 'bg-base-200'
									}`}
								>
									<IconCircleSquare
										className='mx-auto'
										size={16}
									></IconCircleSquare>
								</div>
							</Tooltip>

							{/* Extensions */}
							{isElectron() && (
								<Tooltip message='Extensions'>
									<div
										onClick={() => {
											setWorkspaceMode('custom');
											setTab('extensions');

											/* Load Extension and App Data */
											(window as any).electron.ipcRenderer.sendMessage(
												'getAppData',
												'',
											);

											setShowMenu(true);
										}}
										className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
											tab === 'extensions' && showMenu && 'bg-base-100'
										}`}
									>
										<IconPuzzle className='mx-auto' size={16}></IconPuzzle>
									</div>
								</Tooltip>
							)}

							{/* Show/Close Menu */}
							{isHorizontal && (
								<Tooltip message='Show/Close Menu (Ctrl+B)'>
									<div
										onClick={() => {
											setWorkspaceMode('custom');
											setTab('hierarchy');
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
							)}

							{/* Edit */}
							{!isHorizontal && (
								<Tooltip message='Edit'>
									<div
										onClick={() => {
											setTab('control');
											setWorkspaceMode('custom');
											setShowMenu(true);
										}}
										className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
											tab === 'control' && showMenu && 'bg-base-200'
										}`}
									>
										<IconEdit className='mx-auto' size={16}></IconEdit>
									</div>
								</Tooltip>
							)}

							{/* Workspace */}
							{!isHorizontal && (
								<Tooltip message='Workspace'>
									<div
										onClick={() => {
											setTab('workspace');
											setWorkspaceMode('custom');
											setWorkspaceTab('workspace');
											setShowMenu(true);
										}}
										className={`h-fit max-h-fit cursor-pointer rounded-2xl p-4 hover:bg-neutral ${
											tab === 'workspace' && showMenu && 'bg-base-200'
										}`}
									>
										<IconWallpaper
											className='mx-auto'
											size={16}
										></IconWallpaper>
									</div>
								</Tooltip>
							)}
						</div>

						{/* Tab Panels */}
						<div
							className={`relative ${
								showMenu ? 'flex' : 'hidden'
							} h-full w-80 flex-auto flex-col overflow-hidden md:w-96 md:max-w-full`}
						>
							{/* Hierarchy */}
							{tab === 'hierarchy' && (
								<AnimatePresence>
									{tab === 'hierarchy' && <HierarchyPanel></HierarchyPanel>}
								</AnimatePresence>
							)}

							{/* Extensions */}
							{tab === 'extensions' && isElectron() && (
								<AnimatePresence>
									{tab === 'extensions' && <ExtensionPanel></ExtensionPanel>}
								</AnimatePresence>
							)}

							{/* Controls */}
							{!isHorizontal && (
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
												<p className='mx-auto my-auto select-none text-center text-xs text-gray-700'>
													Select a control to start editing it
												</p>
											</div>
										)}
									</div>
								</AnimatePresence>
							)}

							{/* Workspace */}
							{tab === 'workspace' && (
								<AnimatePresence>
									{tab === 'workspace' && <WorkspacePanel></WorkspacePanel>}
								</AnimatePresence>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
