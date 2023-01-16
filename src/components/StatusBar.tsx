import React from 'react';
import { useStoreState } from '../stores/Hooks';

export const StatusBar: React.FC = () => {
	// App Store
	const workspaceName = useStoreState((state) => state.workspaceName);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	return (
		<div className='flex flex-row p-2 text-gray-500 select-none'>
			<p className='text-xs my-auto'>
				Workspace: {workspaceName} Size: {workspaceHeight} X {workspaceWidth}
			</p>

			<div className='ml-auto flex flex-row gap-2'>
				<p className='text-xs my-auto'>Karbonized V1.0.0</p>
				<p className='text-xs my-auto'>made by @yossthedev</p>
			</div>
		</div>
	);
};
