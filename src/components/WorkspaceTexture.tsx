import React, { Suspense } from 'react';
import { useStoreState } from '../stores/Hooks';

/* Svg Textures */
const Coil = React.lazy(() => import('./Misc/SvgBackgrounds/Coil'));
const Circular = React.lazy(() => import('./Misc/SvgBackgrounds/Circular'));
const Horizon = React.lazy(() => import('./Misc/SvgBackgrounds/Horizon'));
const Grayrate = React.lazy(() => import('./Misc/SvgBackgrounds/Grayrate'));
const Hirl = React.lazy(() => import('./Misc/SvgBackgrounds/Hirl'));
const Neon = React.lazy(() => import('./Misc/SvgBackgrounds/Neon'));
const Undulate = React.lazy(() => import('./Misc/SvgBackgrounds/Undulate'));
const Chaos = React.lazy(() => import('./Misc/SvgBackgrounds/Chaos'));
const Oscilate = React.lazy(() => import('./Misc/SvgBackgrounds/Oscilate'));
const Vortex = React.lazy(() => import('./Misc/SvgBackgrounds/Vortex'));
const Flux = React.lazy(() => import('./Misc/SvgBackgrounds/Flux'));

export const WorkspaceTexture: React.FC<{
	texture: string;
}> = ({ texture }) => {
	// App Store
	/*const currentWorkspace.workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);
	const workspaceGradient = useStoreState((state) => state.textureColors);*/

	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	switch (texture) {
		case 'flux':
			return (
				<Suspense>
					<Flux
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						className='absolute'
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
					></Flux>
				</Suspense>
			);

		case 'coil':
			return (
				<Suspense>
					<Coil
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						className='absolute'
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
					></Coil>
				</Suspense>
			);

		case 'circular':
			return (
				<Suspense>
					<Circular
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						className='absolute'
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
					></Circular>
				</Suspense>
			);

		case 'horizon':
			return (
				<Suspense>
					<Horizon
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Horizon>
				</Suspense>
			);

		case 'grayrate':
			return (
				<Suspense>
					<Grayrate
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Grayrate>
				</Suspense>
			);

		case 'hirl':
			return (
				<Suspense>
					<Hirl
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Hirl>
				</Suspense>
			);

		case 'neon':
			return (
				<Suspense>
					<Neon
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Neon>
				</Suspense>
			);

		case 'undulate':
			return (
				<Suspense>
					<Undulate
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Undulate>
				</Suspense>
			);

		case 'chaos':
			return (
				<Suspense>
					<Chaos
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Chaos>
				</Suspense>
			);

		case 'oscilate':
			return (
				<Suspense>
					<Oscilate
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Oscilate>
				</Suspense>
			);

		case 'vortex':
			return (
				<Suspense>
					<Vortex
						color1={currentWorkspace.textureColors.color1}
						color2={currentWorkspace.textureColors.color2}
						style={{
							height: currentWorkspace.workspaceHeight + 'px',
							width: currentWorkspace.workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Vortex>
				</Suspense>
			);

		default:
			return <></>;
	}
};
export default WorkspaceTexture;
