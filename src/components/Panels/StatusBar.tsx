import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import {
	IconBrandGithub,
	IconCircleDashed,
	IconHeart,
	IconPalette,
	IconSquareRotated,
	IconTools,
} from '@tabler/icons-react';
import { AboutModal } from '../Modals/AboutModal';
import { IconCircleSquare } from '@tabler/icons-react';

export const StatusBar: React.FC = () => {
	/* Component Store */
	const [showAbout, setShowAbout] = useState(false);

	/* App Store */
	const workspaceName = useStoreState((state) => state.workspaceName);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);

	const handleChangeMode = () => {
		const modes = ['design', 'edit', 'zen'];

		let i = modes.findIndex((mode) => mode === workspaceMode);

		if (i < modes.length - 1) {
			i += 1;
		} else {
			i = 0;
		}

		setWorkspaceMode(modes[i] as any);

		console.log(modes[i]);
	};

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			handleChangeMode();
		}
	};

	/* Handle Key Shortcuts */
	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [workspaceMode]);

	return (
		<>
			<div className='hidden select-none flex-row p-1 text-gray-500 md:flex'>
				<div className='my-auto flex flex-auto flex-row'>
					<div className='z-10 flex'>
						{workspaceMode === 'design' && (
							<div
								className='flex gap-1 rounded px-2 hover:cursor-pointer hover:bg-neutral'
								onClick={handleChangeMode}
							>
								<IconCircleSquare
									className='my-auto'
									size={16}
								></IconCircleSquare>
								<p className='my-auto text-xs hover:cursor-pointer'>Design</p>
							</div>
						)}

						{workspaceMode === 'zen' && (
							<div
								className='flex gap-1 rounded px-2 hover:cursor-pointer  hover:bg-neutral'
								onClick={handleChangeMode}
							>
								<IconCircleDashed
									className='my-auto'
									size={16}
								></IconCircleDashed>
								<p className='my-auto text-xs hover:cursor-pointer'>Zen</p>
							</div>
						)}

						{workspaceMode === 'edit' && (
							<div
								className='flex gap-1 rounded px-2  hover:cursor-pointer  hover:bg-neutral'
								onClick={handleChangeMode}
							>
								<IconTools className='my-auto' size={16}></IconTools>
								<p className='my-auto text-xs hover:cursor-pointer'>Edit</p>
							</div>
						)}

						{workspaceMode === 'custom' && (
							<div
								className='flex gap-1 rounded px-2 hover:cursor-pointer  hover:bg-neutral'
								onClick={() => handleChangeMode()}
							>
								<IconTools className='my-auto' size={16}></IconTools>
								<p className='my-auto text-xs hover:cursor-pointer'>Custom</p>
							</div>
						)}
					</div>

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
