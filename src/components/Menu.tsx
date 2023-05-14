import React, { useRef } from 'react';
import { IconSettings, IconShape } from '@tabler/icons-react';
import { TabPanel } from 'react-headless-tabs';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { WorkspacePanel } from './Panels/WorkspacePanel';
import { TabSelector } from './Base/TabsSelector';
import { AnimatePresence } from 'framer-motion';

export const Menu: React.FC = () => {
	// App Store
	const currentID = useStoreState((state) => state.currentControlID);
	const workspaceTab = useStoreState((state) => state.selectedTab);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	const reference = useRef<HTMLDivElement>(null);

	return (
		<div className=' flex w-full flex-auto flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-base-200 p-2 shadow-xl'>
			{/* Selectors */}
			<div className='min-h-12  flex max-h-12 flex-auto shrink-0 overflow-y-auto'>
				<TabSelector
					isActive={workspaceTab === 'control'}
					onClick={() => {
						// setSelectedTab('control');
						setWorkspaceTab('control');
					}}
				>
					<div className='mx-auto my-auto flex flex-row gap-2'>
						<IconShape className='mx-auto my-auto' size={22}></IconShape>
						<label className='my-auto hidden cursor-pointer md:flex'>
							Control
						</label>
					</div>
				</TabSelector>

				<TabSelector
					isActive={workspaceTab === 'workspace'}
					onClick={() => {
						// setSelectedTab('workspace');
						setWorkspaceTab('workspace');
					}}
				>
					<div className='mx-auto my-auto flex flex-row gap-2'>
						<IconSettings className='mx-auto my-auto' size={22}></IconSettings>
						<label className='my-auto hidden cursor-pointer md:flex'>
							Workspace
						</label>
					</div>
				</TabSelector>
			</div>

			{/* Tab Panels */}
			<div className='flex w-full flex-auto flex-col overflow-y-auto overflow-x-hidden'>
				{/* Workspace */}
				<TabPanel
					hidden={workspaceTab !== 'workspace'}
					className={`${
						workspaceTab === 'workspace' &&
						'flex flex-auto text-black dark:text-gray-400'
					}`}
					render='lazy'
					id='workspace'
				>
					<AnimatePresence>
						{workspaceTab === 'workspace' && <WorkspacePanel></WorkspacePanel>}
					</AnimatePresence>
				</TabPanel>

				{/* Controls */}
				<TabPanel
					className={`${
						workspaceTab === 'control' &&
						'flex h-full flex-auto flex-col text-black dark:text-gray-400'
					}`}
					render='lazy'
					hidden={workspaceTab !== 'control'}
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
