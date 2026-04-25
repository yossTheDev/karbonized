import React, { useEffect, useState } from 'react';
import { usePanelRef } from 'react-resizable-panels';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { WorkspacePanel } from './WorkspacePanel';
import { ResizablePanel } from '../ui/resizable';
import { Button } from '../ui/button';
import {
	ChevronLeft,
	ChevronRight,
	InspectionPanel,
	Layers,
	SquarePen,
} from 'lucide-react';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { HierarchyPanel } from './HierarchyPanel';
import { Tooltip } from '../CustomControls/Tooltip';
import { motion, AnimatePresence } from 'framer-motion';

export const RightPanel: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);
	const workspaceTab = useStoreState((state) => state.selectedTab);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	/* Component State */
	const panel = usePanelRef();
	const [showMenu, setShowMenu] = useState(true);
	const [tab, setTab] = useState<'workspace' | 'control' | 'hierarchy'>(
		'control',
	);

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
			className={'min-w-16'}
			collapsible
			collapsedSize={54}
			defaultSize={500}
			maxSize={600}
			minSize={120}
			panelRef={panel}
		>
			<div
				className={`pointer-events-auto mr-auto flex h-full w-full gap-2 overflow-hidden bg-popover p-2 text-foreground shadow-md transition-all`}
			>
				{/* Selectors */}
				<div className='flex flex-col gap-4 shrink-0'>
					<Tooltip message={showMenu ? 'Collapse Panel' : 'Expand Panel'}>
						<button
							onClick={() => {
								setShowMenu(!showMenu);
								setWorkspaceMode('custom');
							}}
							className='shrink-0 inline-flex items-center justify-center size-9 rounded-4xl border border-transparent bg-clip-padding text-sm font-medium transition-all outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-muted/50'
						>
							{showMenu ? (
								<ChevronRight size={16} />
							) : (
								<ChevronLeft size={16} />
							)}
						</button>
					</Tooltip>

					{[
						{ id: 'hierarchy', icon: <Layers size={16} />, label: 'Hierarchy' },
						{ id: 'control', icon: <SquarePen size={16} />, label: 'Control' },
						{
							id: 'workspace',
							icon: <InspectionPanel size={16} />,
							label: 'Workspace',
						},
					].map((item) => {
						const isActive = tab === item.id;

						return (
							<Tooltip key={item.id} message={`${item.label} Settings`}>
								<motion.button
									onClick={() => {
										setTab(item.id as any);
										setWorkspaceMode('custom');
										setShowMenu(true);
										if (item.id === 'workspace') setWorkspaceTab('workspace');
									}}
									className={`shrink-0 flex flex-col items-center w-9 rounded-4xl border border-transparent outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-px overflow-hidden ${
										isActive
											? 'bg-accent text-accent-foreground'
											: 'text-muted-foreground hover:bg-muted hover:text-foreground'
									}`}
									initial={false}
									animate={{
										height: isActive ? 120 : 36,
									}}
									transition={{ type: 'spring', stiffness: 400, damping: 30 }}
								>
									<div className='shrink-0 flex items-center justify-center size-9'>
										{item.icon}
									</div>

									<AnimatePresence>
										{isActive && (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.15 }}
												className='flex flex-col items-center justify-start pb-4'
											>
												<span
													className='text-[10px] h-16 font-bold uppercase tracking-widest'
													style={{
														writingMode: 'vertical-rl',
														textOrientation: 'mixed',
													}}
												>
													{item.label}
												</span>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.button>
							</Tooltip>
						);
					})}
				</div>

				{/* Tab Panels */}
				<div
					className={`relative flex-auto flex-col min-h-0 overflow-hidden ${!showMenu ? 'hidden' : 'flex'}`}
				>
					{/* Controls */}
					<div
						className={`flex h-full min-h-0 flex-col overflow-hidden ${tab === 'control' ? 'flex' : 'hidden'}`}
					>
						<Label className='mb-1 mt-4 select-none text-sm font-bold'>
							Control
						</Label>
						<ScrollArea className='flex-1 h-full'>
							{/* Menu Portal Container - always in DOM when control tab is active */}
							<div className='p-1' id='menu'></div>
							{currentID === '' && (
								<div className='flex h-64 flex-auto items-center justify-center'>
									<p className='text-muted-foreground select-none text-center text-sm'>
										Select a control to start editing it
									</p>
								</div>
							)}
						</ScrollArea>
					</div>

					{/* Workspace */}
					{tab === 'workspace' && (
						<div className='flex h-full min-h-0 flex-col overflow-hidden'>
							<Label className='mb-1 mt-4 select-none text-sm font-bold'>
								Workspace
							</Label>
							<ScrollArea className='flex-1 p-1 h-full'>
								<WorkspacePanel></WorkspacePanel>
							</ScrollArea>
						</div>
					)}

					{/* Hierarchy */}
					{tab === 'hierarchy' && (
						<div className='flex h-full min-h-0 flex-col overflow-hidden'>
							<Label className='mb-1 mt-4 select-none text-sm font-bold'>
								Hierarchy
							</Label>
							<ScrollArea className='flex-1 h-full'>
								<HierarchyPanel></HierarchyPanel>
							</ScrollArea>
						</div>
					)}
				</div>
			</div>
		</ResizablePanel>
	);
};

export default RightPanel;
