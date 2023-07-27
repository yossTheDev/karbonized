import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import {
	IconBrandGithub,
	IconCircleDashed,
	IconHeart,
	IconHierarchy,
	IconPalette,
	IconSquareRotated,
	IconSquareRotatedForbid2,
	IconSquareRoundedPlus,
	IconTag,
	IconTools,
} from '@tabler/icons-react';
import { AboutModal } from '../Modals/AboutModal';
import { IconCircleSquare } from '@tabler/icons-react';
import { Tooltip } from '../CustomControls/Tooltip';

export const StatusBar: React.FC = () => {
	/* Component Store */
	const [showAbout, setShowAbout] = useState(false);

	/* App Store */
	const workspaceName = useStoreState((state) => state.workspaceName);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);
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
		<>
			<div className='hidden select-none flex-row p-1 text-gray-500 md:flex'>
				<div className='my-auto flex flex-auto flex-row gap-2'>
					{/* Layout Mode */}
					<Tooltip
						placement='top'
						className='my-auto'
						message='Change Layout Mode (Tab)'
					>
						<div
							onClick={handleChangeMode}
							className='flex flex-row gap-1 rounded px-2 py-1 hover:cursor-pointer  hover:bg-neutral'
						>
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
						</div>
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

						<p className='my-auto ml-2 text-center text-xs'>{workspaceName}</p>
					</div>

					{/* Workspace Settings  Size*/}
					<div className='flex flex-row'>
						<IconSquareRotatedForbid2
							className='my-auto'
							size={16}
						></IconSquareRotatedForbid2>

						<p className='my-auto ml-2 text-center text-xs'>
							Size: {workspaceWidth} X {workspaceHeight}
						</p>
					</div>

					{/* Source Code */}
					<div className='my-auto ml-auto flex flex-row'>
						<a
							href='https://github.com/yossthedev/karbonized/'
							target={'_blank'}
							className='mx-2 my-auto flex flex-auto cursor-pointer flex-row p-1 hover:rounded hover:bg-neutral'
						>
							<IconBrandGithub className='my-auto' size={16}></IconBrandGithub>
							<p className='my-auto ml-1 text-xs hover:cursor-pointer'>
								Source Code
							</p>
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
