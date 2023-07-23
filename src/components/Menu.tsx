import React, { useRef } from 'react';
import {
	IconDots,
	IconEdit,
	IconHierarchy3,
	IconSettings,
	IconShape,
} from '@tabler/icons-react';
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
			<div className='min-h-12  flex max-h-12 flex-auto shrink-0 overflow-y-auto'>
				{/* Workspace */}
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
							size={22}
						></IconHierarchy3>
						<label className='my-auto hidden cursor-pointer md:flex'>
							Hierarchy
						</label>
					</div>
				</TabSelector>

				{/* Controls */}
				<TabSelector
					isActive={workspaceTab === 'control'}
					onClick={() => {
						// setSelectedTab('control');
						setWorkspaceTab('control');
					}}
				>
					<div className='mx-auto my-auto flex flex-row gap-2'>
						<IconEdit className='mx-auto my-auto' size={22}></IconEdit>
						<label className='my-auto hidden cursor-pointer md:flex'>
							Edit
						</label>
					</div>
				</TabSelector>
			</div>

			{/* Tab Panels */}
			<div className='flex w-full relative flex-auto flex-col overflow-y-auto overflow-x-hidden'>
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

				{/* Controls */}
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

			<div
				onClick={() => setWorkspaceTab('workspace')}
				className={`p-3 hover:cursor-pointer flex z-30 flex-row gap-2 mt-auto mx-auto w-full rounded-xl  text-xs font-bold text-black dark:text-white ${
					workspaceTab === 'workspace' ? 'bg-base-100/80' : 'bg-base-100/20'
				}`}
			>
				<IconSettings className='cursor-pointer' size={22}></IconSettings>
				<label className='my-auto font-bold cursor-pointer'>Workspace</label>
			</div>
		</div>
	);
};
