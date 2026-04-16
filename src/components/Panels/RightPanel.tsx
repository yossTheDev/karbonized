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
				className={`pointer-events-auto mr-auto flex h-full w-full gap-2 overflow-hidden rounded-lg bg-background p-2 text-foreground shadow-md border border-border transition-all`}
			>
				{/* Selectors */}
				<div className='flex flex-col gap-1 shrink-0'>
					{/* Show/Close Menu */}
					<Tooltip message={showMenu ? 'Collapse Panel' : 'Expand Panel'}>
						<Button
							size={'icon'}
							variant={'ghost'}
							onClick={() => {
								setShowMenu(!showMenu);
								setWorkspaceMode('custom');
							}}
							className='shrink-0'
						>
							{showMenu ? (
								<ChevronRight size={16}></ChevronRight>
							) : (
								<ChevronLeft size={16}></ChevronLeft>
							)}
						</Button>
					</Tooltip>

					{/* Layers */}
					<Tooltip message='Hierarchy'>
						<Button
							variant={tab === 'hierarchy' ? 'default' : 'ghost'}
							size={'icon'}
							onClick={() => {
								setTab('hierarchy');
								setWorkspaceMode('custom');
								setShowMenu(true);
							}}
							className='shrink-0'
						>
							<Layers size={16}></Layers>
						</Button>
					</Tooltip>

					{/* Edit */}
					<Tooltip message='Edit Control'>
						<Button
							variant={tab === 'control' ? 'default' : 'ghost'}
							size={'icon'}
							onClick={() => {
								setTab('control');
								setWorkspaceMode('custom');
								setShowMenu(true);
							}}
							className='shrink-0'
						>
							<SquarePen size={16}></SquarePen>
						</Button>
					</Tooltip>

					{/* Workspace */}
					<Tooltip message='Workspace Settings'>
						<Button
							variant={tab === 'workspace' ? 'default' : 'ghost'}
							size={'icon'}
							onClick={() => {
								setTab('workspace');
								setWorkspaceMode('custom');
								setWorkspaceTab('workspace');
								setShowMenu(true);
							}}
							className='shrink-0'
						>
							<InspectionPanel size={16}></InspectionPanel>
						</Button>
					</Tooltip>
				</div>

				{/* Tab Panels */}
				<div
					className={`relative flex-auto flex-col overflow-hidden ${!showMenu ? 'hidden' : 'flex'}`}
				>
					{/* Controls */}
					{tab === 'control' && (
						<div className='flex flex-col overflow-hidden'>
							<Label className='mb-2 mt-2 select-none text-lg font-semibold'>
								Control
							</Label>
							<Separator className='mb-3'></Separator>
							<ScrollArea className='flex-auto'>
								<div className='overflow-auto p-1' id='menu'></div>
								{currentID === '' && (
									<div className='flex h-64 flex-auto items-center justify-center'>
										<p className='text-muted-foreground select-none text-center text-sm'>
											Select a control to start editing it
										</p>
									</div>
								)}
							</ScrollArea>
						</div>
					)}

					{/* Workspace */}
					{tab === 'workspace' && <WorkspacePanel></WorkspacePanel>}

					{/* Hierarchy */}
					{tab === 'hierarchy' && <HierarchyPanel></HierarchyPanel>}
				</div>
			</div>
		</ResizablePanel>
	);
};

export default RightPanel;
