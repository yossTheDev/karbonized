import React, { RefObject, useEffect, useRef, useState } from 'react';
import { TabPanel, useTabs } from 'react-headless-tabs';
import { useStoreState } from '../stores/Hooks';
import { TabSelector } from './TabsSelector';

export const Menu: React.FC = () => {
	// Component Store
	const [selectedTab, setSelectedTab] = useTabs(['workspace', 'control']);
	const [isEmpty, setIsEmpty] = useState(true);

	// App Store
	const controls = useStoreState((state) => state.ControlsTree);
	const currentID = useStoreState((state) => state.currentControlID);

	const reference = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (reference.current?.childNodes)
			if (reference.current?.childNodes.length > 1) {
				setIsEmpty(false);
				console.log(reference.current?.childNodes.length);
			} else {
				setIsEmpty(true);
				console.log(reference.current?.childNodes.length);
			}
	}, [controls, isEmpty, currentID]);

	return (
		<div className='flex flex-auto flex-col'>
			{/* Seletors */}
			<div className='flex flex-auto  max-h-8 flex-row gap-4'>
				<TabSelector
					isActive={selectedTab === 'control'}
					onClick={() => setSelectedTab('control')}
				>
					<div>
						<p>Control</p>
					</div>
				</TabSelector>

				<TabSelector
					isActive={selectedTab === 'workspace'}
					onClick={() => setSelectedTab('workspace')}
				>
					<div>Workspace</div>
				</TabSelector>
			</div>

			{/* Tab Panels */}
			<div className='flex flex-auto flex-col'>
				<TabPanel
					hidden={selectedTab !== 'workspace'}
					className={`${selectedTab === 'workspace' && 'flex flex-auto'}`}
				></TabPanel>

				<TabPanel
					className={`${
						selectedTab === 'control' && 'flex flex-auto flex-col'
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
