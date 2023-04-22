import React, { useEffect, useRef, useState } from 'react';
import { IconSettings, IconShape, IconSquare } from '@tabler/icons-react';
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
		<div className=' flex w-full flex-auto flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-base-200 p-2 shadow-xl'>
			{/* Selectors */}
			<div className='min-h-12 hidden max-h-12 flex-auto shrink-0 overflow-y-auto md:flex'>
				<TabSelector
					isActive={selectedTab === 'control'}
					onClick={() => {
						setSelectedTab('control');
						setWorkspaceTab('control');
					}}
				>
					<div className='mx-auto my-auto flex flex-row gap-2'>
						<IconShape className='mx-auto my-auto' size={22}></IconShape>
						<p className='my-auto hidden md:flex'>Control</p>
					</div>
				</TabSelector>

				<TabSelector
					isActive={selectedTab === 'workspace'}
					onClick={() => {
						setSelectedTab('workspace');
						setWorkspaceTab('workspace');
					}}
				>
					<div className='mx-auto my-auto flex flex-row gap-2'>
						<IconSettings className='mx-auto my-auto' size={22}></IconSettings>
						<p className='my-auto hidden md:flex'>Workspace</p>
					</div>
				</TabSelector>
			</div>

			{/* Tab Panels */}
			<div className='flex w-full flex-auto flex-col overflow-y-auto overflow-x-hidden'>
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
						'flex h-full flex-auto flex-col text-black dark:text-gray-400'
					}`}
					hidden={selectedTab !== 'control'}
				>
					<div
						id='menu'
						ref={reference}
						className='flex h-full min-h-full flex-auto flex-col'
					>
						{currentID === '' && (
							<div className='flex h-96 flex-auto'>
								<p className='mx-auto my-auto text-center text-xs text-gray-700'>
									Select a control to start editing it
								</p>
							</div>
						)}
					</div>
				</TabPanel>
			</div>
		</div>
	);
};
