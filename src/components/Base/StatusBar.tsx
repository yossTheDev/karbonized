import React, { useState } from 'react';
import { useStoreState } from '../../stores/Hooks';
import {
	IconBrandGithub,
	IconHeart,
	IconSquareRotated,
} from '@tabler/icons-react';
import { AboutModal } from '../Modals/AboutModal';

export const StatusBar: React.FC = () => {
	//Component Store
	const [showAbout, setShowAbout] = useState(false);
	// App Store
	const workspaceName = useStoreState((state) => state.workspaceName);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	return (
		<>
			<div className='hidden select-none flex-row p-1 text-gray-500 md:flex'>
				<div className='my-auto flex flex-auto flex-row'>
					<IconSquareRotated
						className='my-auto ml-1'
						size={18}
					></IconSquareRotated>

					<p className='my-auto ml-2 text-center text-xs'>
						Workspace: {workspaceName} Size: {workspaceWidth} X{' '}
						{workspaceHeight}
					</p>

					<div className='my-auto ml-auto flex flex-row'>
						<div
							onMouseDown={() => setShowAbout(true)}
							className='flex cursor-pointer flex-row gap-0.5 p-1 hover:rounded hover:bg-base-100'
						>
							<p className='my-auto text-xs'> Made With</p>
							<IconHeart
								size={18}
								className='mx-1 my-auto inline-flex'
							></IconHeart>
							<p className='my-auto text-xs'>by @yossthedev</p>
						</div>

						<a
							href='https://github.com/yossthedev/karbonized/'
							target={'_blank'}
							className='mx-2 my-auto flex flex-auto cursor-pointer flex-row p-1 hover:rounded hover:bg-base-100'
						>
							<IconBrandGithub className='my-auto' size={18}></IconBrandGithub>
							<p className='my-auto ml-1 text-xs'>Source Code</p>
						</a>
					</div>
				</div>
			</div>

			{showAbout && (
				<AboutModal open onClose={() => setShowAbout(false)}></AboutModal>
			)}
		</>
	);
};
