import React, { useRef } from 'react';
import { IconEdit, IconHierarchy3, IconWallpaper } from '@tabler/icons-react';
import { TabPanel } from 'react-headless-tabs';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { TabSelector } from './Base/TabsSelector';
import { AnimatePresence } from 'framer-motion';
import { HierarchyPanel } from './Panels/HierarchyPanel';
import { WorkspacePanel } from './Panels/WorkspacePanel';

export const Menu: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);
	const workspaceTab = useStoreState((state) => state.selectedTab);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);
	const setControlID = useStoreActions((state) => state.setcurrentControlID);

	const reference = useRef<HTMLDivElement>(null);

	return (
		<div className=' flex w-full flex-auto flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-base-200/90 p-2 shadow-xl backdrop-blur-xl'>
			{/* Selectors */}
			<div className='min-h-12 flex max-h-12 flex-auto shrink-0 gap-2 overflow-y-auto'>
				{/* Hierarchy */}
				<TabSelector
					isActive={workspaceTab === 'hierarchy'}
					onClick={() => {
						// setSelectedTab('workspace');
						setWorkspaceTab('hierarchy');
					}}
				>
					<div className='mx-auto my-auto flex flex-row gap-2'>
						<IconHierarchy3
							className='mx-auto my-auto'
							size={20}
						></IconHierarchy3>
						<label className='my-auto hidden cursor-pointer md:flex'>
							Hierarchy
						</label>
					</div>
				</TabSelector>

				{/* Workspace */}
				<TabSelector
					isActive={workspaceTab === 'workspace'}
					onClick={() => {
						// setSelectedTab('control');
						setWorkspaceTab('workspace');
					}}
				>
					<div className='mx-auto my-auto flex flex-row gap-2'>
						<IconWallpaper
							className='mx-auto my-auto'
							size={20}
						></IconWallpaper>
						<label className='my-auto hidden cursor-pointer md:flex'>
							Background
						</label>
					</div>
				</TabSelector>

				{/* Edit */}
				<TabSelector
					isActive={workspaceTab === 'control'}
					onClick={() => {
						// setSelectedTab('control');
						setWorkspaceTab('control');
					}}
				>
					<div className='mx-auto my-auto flex flex-row gap-2'>
						<IconEdit className='mx-auto my-auto' size={20}></IconEdit>
						<label className='my-auto hidden cursor-pointer md:flex'>
							Edit
						</label>
					</div>
				</TabSelector>
			</div>

			{/* Tab Panels */}
			<div className='relative flex w-full flex-auto flex-col overflow-y-auto overflow-x-hidden'>
				{/* Hierarchy */}
				<TabPanel
					hidden={workspaceTab !== 'hierarchy'}
					className={`${
						workspaceTab === 'hierarchy' &&
						'flex flex-auto text-black dark:text-gray-400'
					}`}
					render='lazy'
					id='workspace'
				>
					<AnimatePresence>
						{workspaceTab === 'hierarchy' && <HierarchyPanel></HierarchyPanel>}
					</AnimatePresence>
				</TabPanel>

				{/* Controls */}
				<TabPanel
					className={`${
						workspaceTab === 'control' &&
						'flex h-full flex-auto flex-col text-black dark:text-gray-400'
					}`}
					render='idle'
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

				{/* Workspace */}
				<TabPanel
					className={`${
						workspaceTab === 'workspace' &&
						'flex h-full flex-auto flex-col text-black dark:text-gray-400'
					}`}
					render='idle'
					hidden={workspaceTab !== 'workspace'}
				>
					<AnimatePresence>
						{workspaceTab === 'workspace' && <WorkspacePanel></WorkspacePanel>}
					</AnimatePresence>
				</TabPanel>
			</div>

			{/* Workspace Selector */}
		</div>
	);
};
