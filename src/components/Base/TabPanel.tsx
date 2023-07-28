import React from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { Button } from 'react-daisyui';
import { IconPlus, IconSquareRotated, IconX } from '@tabler/icons-react';

export const TabPanel: React.FC = () => {
	const workspaces = useStoreState((state) => state.workspaces);

	const currentWorkspaceID = useStoreState((state) => state.currentWorkspaceID);
	const getCurrentWorkspace = useStoreState((state) => state.currentWorkspace);

	const addWorkspace = useStoreActions((state) => state.addWorkspace);
	const deleteWorkspace = useStoreActions((state) => state.deleteWorkspace);
	const setCurrentWorkspace = useStoreActions(
		(state) => state.setCurrentWorkspace,
	);

	return (
		<div className='absolute z-40 mx-2 mt-1 hidden w-2/3 flex-auto flex-row gap-2 overflow-hidden p-2 lg:flex'>
			<div
				onDoubleClick={() => addWorkspace('')}
				className='flex flex-auto flex-row gap-2 overflow-x-auto overflow-y-hidden px-1 py-2  pr-10'
			>
				{workspaces.map((item) => (
					<div
						id={item.id}
						className={`my-auto flex h-fit select-none gap-2 rounded-xl bg-base-200 p-1 shadow  hover:cursor-pointer hover:bg-neutral dark:text-gray-300 ${
							currentWorkspaceID === item.id &&
							'border border-neutral font-bold'
						}`}
					>
						<IconSquareRotated
							className='my-auto ml-2'
							size={16}
						></IconSquareRotated>
						<p
							onClick={() => setCurrentWorkspace(item.id)}
							className='mr-4 select-none text-clip whitespace-nowrap p-2 text-xs hover:cursor-pointer'
						>
							{item.workspaceName}
						</p>

						<IconX
							size={16}
							onClick={() => deleteWorkspace(item.id)}
							className='my-auto ml-auto mr-2 rounded hover:bg-base-100'
						></IconX>
					</div>
				))}
			</div>
		</div>
	);
};
