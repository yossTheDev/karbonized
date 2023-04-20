import React, { useEffect, useRef, useState } from 'react';
import { IconShape, IconSquare } from '@tabler/icons-react';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { WorkspacePanel } from './Panels/WorkspacePanel';
import { TabSelector } from './TabsSelector';
import { AnimatePresence } from 'framer-motion';

export const Menu: React.FC = () => {
	// Component Store
	const [selectedTab, setSelectedTab] = useTabs(
		['workspace', 'control'],
		'control'
	);
	const [isEmpty, setIsEmpty] = useState(true);
	const [showMenu, setShowMenu] = useState(true);

	// App Store
	const controls = useStoreState((state) => state.ControlsTree);
	const currentID = useStoreState((state) => state.currentControlID);
	const workspaceTab = useStoreState((state) => state.selectedTab);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	const reference = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setSelectedTab(workspaceTab);
	}, [workspaceTab]);

	return (
		<div className='flex w-full flex-auto flex-row overflow-y-auto overflow-x-hidden'>
			{/* Selectors */}
			<div className='flex flex-auto shrink-0 grow flex-col overflow-y-auto '>
				{/* Seletors */}
				<div className='flex flex-auto flex-col'>
					<TabSelector
						isActive={selectedTab === 'control'}
						onClick={() => {
							setSelectedTab('control');
							setWorkspaceTab('control');
						}}
					>
						<div className='mx-auto'>
							<IconShape className='mx-auto' size={18}></IconShape>
							<p className='mt-6 hidden rotate-90 md:flex'>Control</p>
						</div>
					</TabSelector>

					<TabSelector
						isActive={selectedTab === 'workspace'}
						onClick={() => {
							setSelectedTab('workspace');
							setWorkspaceTab('workspace');
						}}
					>
						<div className='mx-auto'>
							<IconSquare className='mx-auto' size={18}></IconSquare>
							<div className='mx-auto mt-6 hidden rotate-90 md:flex'>
								Workspace
							</div>
						</div>
					</TabSelector>
				</div>
			</div>

			{/* Tab Panels */}
			<div className='ml-2 flex w-full flex-auto flex-col overflow-y-auto overflow-x-hidden'>
				{/* Workspace */}
				<TabPanel
					hidden={selectedTab !== 'workspace'}
					className={`${
						selectedTab === 'workspace' &&
						'flex flex-auto text-black dark:text-gray-400'
					}`}
					id='workspace'
				>
					<AnimatePresence>
						{selectedTab === 'workspace' && <WorkspacePanel></WorkspacePanel>}
					</AnimatePresence>
				</TabPanel>

				{/* Controls */}
				<TabPanel
					className={`${
						selectedTab === 'control' &&
						'flex flex-auto flex-col text-black dark:text-gray-400'
					}`}
					hidden={selectedTab !== 'control'}
				>
					<div id='menu' ref={reference} className='flex flex-auto flex-col'>
						{currentID === '' && (
							<p className='mx-auto my-auto text-center text-xs text-gray-700'>
								Select a control to start editing it
							</p>
						)}
					</div>
				</TabPanel>
			</div>
		</div>
	);
};
