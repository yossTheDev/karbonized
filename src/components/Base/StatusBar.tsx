import {
	IconBrandGithub,
	IconCircleDashed,
	IconCircleSquare,
	IconHierarchy,
	IconSquareRotatedForbid2,
	IconTag,
	IconTools,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { Tooltip } from '../CustomControls/Tooltip';
import { AboutModal } from '../Modals/AboutModal';

export const StatusBar: React.FC = () => {
	/* Component Store */
	const [showAbout, setShowAbout] = useState(false);

	/* App Store */
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	const controlPosition = useStoreState((state) => state.controlPosition);

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
		<div className='pointer-events-none absolute flex h-full w-full'>
			<div className='pointer-events-auto relative mb-2 mt-auto flex w-full flex-auto flex-row gap-2 px-4'>
				{/* Layout Mode */}
				<Tooltip
					placement='top'
					className='my-auto'
					message='Change Layout Mode (Tab)'
				>
					<button onClick={handleChangeMode} className='btn btn-xs'>
						{workspaceMode === 'design' && (
							<>
								<IconCircleSquare
									className='my-auto'
									size={16}
								></IconCircleSquare>
								<p className='my-auto text-xs hover:cursor-pointer'>Design</p>
							</>
						)}

						{workspaceMode === 'zen' && (
							<>
								<IconCircleDashed
									className='my-auto'
									size={16}
								></IconCircleDashed>
								<p className='my-auto text-xs hover:cursor-pointer'>Zen</p>
							</>
						)}

						{workspaceMode === 'edit' && (
							<>
								<IconTools className='my-auto' size={16}></IconTools>
								<p className='my-auto text-xs hover:cursor-pointer'>Edit</p>
							</>
						)}

						{workspaceMode === 'custom' && (
							<>
								<IconTools className='my-auto' size={16}></IconTools>
								<p className='my-auto text-xs hover:cursor-pointer'>Custom</p>
							</>
						)}
					</button>
				</Tooltip>

				{/* Control Position */}
				<div className='flex flex-row'>
					<IconHierarchy className='my-auto ml-1' size={16}></IconHierarchy>

					<p className='my-auto ml-2 text-center text-xs'>
						Pos: x: {Math.round(controlPosition?.x as any)} y:{' '}
						{Math.round(controlPosition?.y as any)}
					</p>
				</div>

				{/* Workspace Name */}
				<div className='flex flex-row'>
					<IconTag className='my-auto ml-1' size={16}></IconTag>

					<p className='my-auto ml-2 text-center text-xs'>
						{currentWorkspace.workspaceName}
					</p>
				</div>

				{/* Workspace Settings  Size*/}
				<div className='flex flex-row'>
					<IconSquareRotatedForbid2
						className='my-auto'
						size={16}
					></IconSquareRotatedForbid2>

					<p className='my-auto ml-2 text-center text-xs'>
						Size: {currentWorkspace.workspaceWidth} X{' '}
						{currentWorkspace.workspaceHeight}
					</p>
				</div>

				{/* Source Code */}
				<a
					href='https://github.com/yossthedev/karbonized/'
					target={'_blank'}
					className='btn btn-xs ml-auto'
				>
					<IconBrandGithub className='my-auto' size={16}></IconBrandGithub>
					<p className='my-auto ml-1 text-xs hover:cursor-pointer'>
						Source Code
					</p>
				</a>
			</div>

			{showAbout && (
				<AboutModal open onClose={() => setShowAbout(false)}></AboutModal>
			)}
		</div>
	);
};
