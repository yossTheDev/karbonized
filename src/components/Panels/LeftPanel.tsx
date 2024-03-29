import React, { useEffect, useState } from 'react';
import {
	IconChevronLeft,
	IconChevronRight,
	IconCircleSquare,
	IconEdit,
	IconMoon,
	IconPuzzle,
	IconSun,
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
import { useTheme } from '../../hooks/useTheme';

export const LeftPanel: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);

	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	/* Component State */
	const isHorizontal = useScreenDirection();
	const [appTheme, toggleTheme] = useTheme();

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
			<div className='drawer w-0 md:drawer-open md:w-full md:py-2'>
				<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />

				<div className='drawer-side relative z-30 h-full'>
					<label htmlFor='my-drawer-2' className='drawer-overlay w-screen' />

					{/* Content */}
					<div className='bg pointer-events-auto z-30  mr-auto flex h-full w-5/6 grow-0 flex-col gap-1 overflow-hidden rounded-e-2xl bg-base-100 p-2 text-gray-950  shadow-xl dark:text-gray-400 md:w-fit md:max-w-[20rem] md:bg-base-200 '>
						{/* Tabs */}
						<div className='flex flex-auto overflow-y-auto'>
							{/* Selectors */}
							<div className='flex flex-auto flex-col gap-2 text-base-content'>
								{/* Theme Button */}
								{!isHorizontal && (
									<button
										className='btn btn-circle btn-sm  mx-auto mb-2'
										onClick={() => toggleTheme()}
									>
										{appTheme === 'light' ? (
											<IconMoon
												size={16}
												className=' dark:text-white'
											></IconMoon>
										) : (
											<IconSun size={16} className=' dark:text-white'></IconSun>
										)}
									</button>
								)}

								{/* Hierarchy */}
								<Tooltip message='Hierarchy'>
									<button
										onClick={() => {
											setWorkspaceMode('custom');
											setTab('hierarchy');
											setShowMenu(true);
										}}
										className={`btn btn-ghost rounded-2xl md:btn-sm md:rounded-xl ${
											tab === 'hierarchy' &&
											showMenu &&
											'bg-base-200 md:bg-base-300'
										}`}
									>
										<IconCircleSquare
											className='mx-auto'
											size={16}
										></IconCircleSquare>
									</button>
								</Tooltip>

								{/* Extensions */}
								{isElectron() && (
									<Tooltip message='Extensions'>
										<button
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
											className={`btn btn-ghost btn-sm rounded-xl ${
												tab === 'extensions' &&
												showMenu &&
												'bg-base-100 md:bg-base-300'
											}`}
										>
											<IconPuzzle className='mx-auto' size={16}></IconPuzzle>
										</button>
									</Tooltip>
								)}

								{/* Show/Close Menu */}
								{isHorizontal && (
									<Tooltip message='Show/Close Menu (Ctrl+B)'>
										<button
											onClick={() => {
												setWorkspaceMode('custom');
												setTab('hierarchy');
												setShowMenu(!showMenu);
											}}
											className={`btn btn-ghost rounded-2xl md:btn-sm md:rounded-xl`}
										>
											{showMenu ? (
												<IconChevronLeft size={16}></IconChevronLeft>
											) : (
												<IconChevronRight
													className='mx-auto'
													size={16}
												></IconChevronRight>
											)}
										</button>
									</Tooltip>
								)}

								{/* Edit */}
								{!isHorizontal && (
									<Tooltip message='Edit'>
										<button
											onClick={() => {
												setTab('control');
												setWorkspaceMode('custom');
												setShowMenu(true);
											}}
											className={`btn btn-ghost rounded-2xl  ${
												tab === 'control' && showMenu && 'bg-base-200'
											}`}
										>
											<IconEdit className='mx-auto' size={16}></IconEdit>
										</button>
									</Tooltip>
								)}

								{/* Workspace */}
								{!isHorizontal && (
									<Tooltip message='Workspace'>
										<button
											onClick={() => {
												setTab('workspace');
												setWorkspaceMode('custom');
												setWorkspaceTab('workspace');
												setShowMenu(true);
											}}
											className={`btn btn-ghost rounded-2xl ${
												tab === 'workspace' && showMenu && 'bg-base-200'
											}`}
										>
											<IconWallpaper
												className='mx-auto'
												size={16}
											></IconWallpaper>
										</button>
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
								)}

								{/* Workspace */}
								{tab === 'workspace' && (
									<AnimatePresence>
										{tab === 'workspace' && <WorkspacePanel></WorkspacePanel>}
									</AnimatePresence>
								)}
							</div>
						</div>

						{/* Footer */}
						<span className='mx-auto mt-2 py-2 text-xs text-base-content/70 md:hidden'>
							Made with 💙 and ReactJS by{' '}
							<a className='link' href='https://github.com/yossthedev/'>
								@yossthedev
							</a>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default LeftPanel;
