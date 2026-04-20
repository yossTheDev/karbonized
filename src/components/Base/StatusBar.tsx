import {
	GitBranch,
	Layers,
	MousePointer2,
	PencilRuler,
	Square,
	Tag,
	Box,
	CircleDashed,
} from 'lucide-react';
import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { Button } from '../ui/button';
import { ViewPanel } from '../Panels/ViewPanel';
import useMousePosition from '@/hooks/useMousePosition';
import { Separator } from '../ui/separator';

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
		<div className='flex h-9 w-full items-center gap-3 border-t border-border bg-background px-3 text-xs text-muted-foreground shadow-sm'>
			<>;)</>
			
			{/* Layout Mode */}
			<Button
				className='h-7 gap-1.5 px-2.5 font-medium text-xs'
				onClick={handleChangeMode}
				variant={'ghost'}
			>
				{workspaceMode === 'design' && (
					<>
						<Box className='h-3.5 w-3.5' />
						<span>Design</span>
					</>
				)}

				{workspaceMode === 'zen' && (
					<>
						<CircleDashed className='h-3.5 w-3.5' />
						<span>Zen</span>
					</>
				)}

				{workspaceMode === 'edit' && (
					<>
						<PencilRuler className='h-3.5 w-3.5' />
						<span>Edit</span>
					</>
				)}

				{workspaceMode === 'custom' && (
					<>
						<PencilRuler className='h-3.5 w-3.5' />
						<span>Custom</span>
					</>
				)}
			</Button>

			<Separator orientation='vertical' className='h-4' />

			{/* Mouse Position */}
			<div className='flex items-center gap-2'>
				<MousePointer2 className='h-3.5 w-3.5 text-muted-foreground' />
				<span className='font-mono'>
					x: {Math.round(mousePosition.x)} y: {Math.round(mousePosition.y)}
				</span>
			</div>

			{/* Control Position */}
			<div className='flex items-center gap-2'>
				<Layers className='h-3.5 w-3.5 text-muted-foreground' />
				<span className='font-mono'>
					x: {Math.round(controlPosition?.x as any)} y:{' '}
					{Math.round(controlPosition?.y as any)}
				</span>
			</div>

			<Separator orientation='vertical' className='h-4' />

			{/* Workspace Name */}
			<div className='flex items-center gap-2'>
				<Tag className='h-3.5 w-3.5 text-muted-foreground' />
				<span className='font-medium'>{currentWorkspace?.workspaceName}</span>
			</div>

			{/* Workspace Settings Size */}
			<div className='flex items-center gap-2'>
				<Square className='h-3.5 w-3.5 text-muted-foreground' />
				<span className='font-mono'>
					{currentWorkspace?.workspaceWidth}
					{' × '}
					{currentWorkspace?.workspaceHeight}
				</span>
			</div>

			<div className='flex-auto' />

			<ViewPanel />

			<Separator orientation='vertical' className='h-4' />

			{/* Source Code */}
			<Button
				variant={'ghost'}
				size={'sm'}
				className='h-7 gap-1.5 text-xs'
				asChild
			>
				<a
					href='https://github.com/yossthedev/karbonized/'
					target={'_blank'}
					rel='noreferrer'
				>
					<GitBranch className='h-3.5 w-3.5' />
					<span>Source</span>
				</a>
			</Button>
		</div>
	);
};

export default StatusBar;
