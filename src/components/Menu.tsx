import React, { useEffect, useRef, useState } from 'react';
import { IconShape, IconSquare } from '@tabler/icons';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { WorkspacePanel } from './Panels/WorkspacePanel';
import { TabSelector } from './TabsSelector';

export const Menu: React.FC = () => {
	// Component Store
	const [selectedTab, setSelectedTab] = useTabs(
		['workspace', 'control'],
		'control'
	);
	const [isEmpty, setIsEmpty] = useState(true);

	// App Store
	const controls = useStoreState((state) => state.ControlsTree);
	const currentID = useStoreState((state) => state.currentControlID);
	const workspaceTab = useStoreState((state) => state.selectedTab);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	const reference = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (reference.current?.childNodes)
			if (reference.current?.childNodes.length > 1) {
				setIsEmpty(false);
			} else {
				setIsEmpty(true);
			}
	}, [controls, isEmpty, currentID]);

	useEffect(() => {
		setSelectedTab(workspaceTab);
	}, [workspaceTab]);

	return (
		<div className='flex flex-auto flex-row overflow-y-auto overflow-x-hidden'>
			{/* Selectors */}
			<div className='flex grow shrink-0 flex-col overflow-y-auto'>
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
							<p className='hidden md:flex rotate-90 mt-6'>Control</p>
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
							<div className='hidden md:flex rotate-90 mx-auto mt-6'>
								Workspace
							</div>
						</div>
					</TabSelector>
				</div>
			</div>

			{/* Tab Panels */}
			<div className='flex flex-auto w-full flex-col ml-2 overflow-y-auto overflow-x-hidden'>
				{/* Workspace */}
				<TabPanel
					hidden={selectedTab !== 'workspace'}
					className={`${
						selectedTab === 'workspace' &&
						'flex flex-auto dark:text-gray-400 text-black'
					}`}
					id='workspace'
				>
					<WorkspacePanel></WorkspacePanel>
				</TabPanel>

				{/* Controls */}
				<TabPanel
					className={`${
						selectedTab === 'control' &&
						'flex flex-auto flex-col dark:text-gray-400 text-black'
					}`}
					hidden={selectedTab !== 'control'}
				>
					<div id='menu' ref={reference} className='flex flex-auto flex-col'>
						{isEmpty && (
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
