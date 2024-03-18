import {
	IconBrandGithub,
	IconHierarchy,
	IconSquareRotatedForbid2,
	IconTag,
} from '@tabler/icons-react';
import { Axis3D, CircleDashed, MousePointer, PencilRuler } from 'lucide-react';
import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { Button } from '../ui/button';
import { ViewPanel } from '../Panels/ViewPanel';
import useMousePosition from '@/hooks/useMousePosition';

export const StatusBar: React.FC = () => {
	/* Component State */
	const mousePosition = useMousePosition();

	/* App Store */
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	const controlPosition = useStoreState((state) => state.controlPosition);

	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);

	const handleChangeMode = (): void => {
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

	const onKeyDown = (event: KeyboardEvent): void => {
		if (event.ctrlKey && event.key === 'Tab') {
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
		<div className='flex h-8 w-full items-center gap-2 border-t-2 border-base-200 bg-base-300 py-4 shadow-2xl shadow-base-200 dark:text-gray-200 '>
			{/* Layout Mode */}
			<Button
				className='ml-1 h-7 gap-2 px-2 py-1'
				onClick={handleChangeMode}
				variant={'ghost'}
			>
				{workspaceMode === 'design' && (
					<>
						<Axis3D className='my-auto' size={16}></Axis3D>
						<p className='my-auto text-xs hover:cursor-pointer'>Design</p>
					</>
				)}

				{workspaceMode === 'zen' && (
					<>
						<CircleDashed className='my-auto' size={16}></CircleDashed>
						<p className='my-auto text-xs hover:cursor-pointer'>Zen</p>
					</>
				)}

				{workspaceMode === 'edit' && (
					<>
						<PencilRuler className='my-auto' size={16}></PencilRuler>
						<p className='my-auto text-xs hover:cursor-pointer'>Edit</p>
					</>
				)}

				{workspaceMode === 'custom' && (
					<>
						<PencilRuler className='my-auto' size={16}></PencilRuler>
						<p className='my-auto text-xs hover:cursor-pointer'>Custom</p>
					</>
				)}
			</Button>

			{/* Mouse Position */}
			<div className='flex items-center'>
				<MousePointer className='ml-1' size={16}></MousePointer>

				<p className='ml-2 text-center text-xs'>
					Pos: x: {Math.round(mousePosition.x)} y: {Math.round(mousePosition.y)}
				</p>
			</div>

			{/* Control Position */}
			<div className='flex items-center'>
				<IconHierarchy className='my-auto ml-1' size={16}></IconHierarchy>

				<p className='ml-2 text-center text-xs'>
					Pos: x: {Math.round(controlPosition?.x as any)} y:{' '}
					{Math.round(controlPosition?.y as any)}
				</p>
			</div>

			{/* Workspace Name */}
			<div className='flex items-center'>
				<IconTag className='my-auto ml-1' size={16}></IconTag>

				<p className='my-auto ml-2 text-center text-xs'>
					{currentWorkspace.workspaceName}
				</p>
			</div>

			{/* Workspace Settings Size */}
			<div className='flex items-center'>
				<IconSquareRotatedForbid2
					className='my-auto'
					size={16}
				></IconSquareRotatedForbid2>

				<p className='my-auto ml-2 text-center text-xs'>
					Size: {currentWorkspace.workspaceWidth} X{' '}
					{currentWorkspace.workspaceHeight}
				</p>
			</div>

			<ViewPanel></ViewPanel>

			{/* Source Code */}
			<Button variant={'link'} asChild>
				<a
					href='https://github.com/yossthedev/karbonized/'
					target={'_blank'}
					rel='noreferrer'
				>
					<IconBrandGithub
						className='pointer-events-none my-auto'
						size={16}
					></IconBrandGithub>
					<p className='pointer-events-none my-auto ml-1 text-xs hover:cursor-pointer'>
						Source Code
					</p>
				</a>
			</Button>
		</div>
	);
};

export default StatusBar;
