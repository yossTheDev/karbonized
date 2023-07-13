import React, { Suspense } from 'react';
import { useStoreState } from '../stores/Hooks';

/* Svg Textures */
const Coil = React.lazy(() => import('./General/SvgBackgrounds/Coil'));
const Circular = React.lazy(() => import('./General/SvgBackgrounds/Circular'));
const Horizon = React.lazy(() => import('./General/SvgBackgrounds/Horizon'));
const Grayrate = React.lazy(() => import('./General/SvgBackgrounds/Grayrate'));
const Hirl = React.lazy(() => import('./General/SvgBackgrounds/Hirl'));
const Neon = React.lazy(() => import('./General/SvgBackgrounds/Neon'));
const Undulate = React.lazy(() => import('./General/SvgBackgrounds/Undulate'));
const Chaos = React.lazy(() => import('./General/SvgBackgrounds/Chaos'));
const Oscilate = React.lazy(() => import('./General/SvgBackgrounds/Oscilate'));
const Vortex = React.lazy(() => import('./General/SvgBackgrounds/Vortex'));
const Flux = React.lazy(() => import('./General/SvgBackgrounds/Flux'));

export const WorkspaceTexture: React.FC<{
	texture: string;
}> = ({ texture }) => {
	// App Store
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);
	const workspaceGradient = useStoreState((state) => state.textureColors);

	switch (texture) {
		case 'flux':
			return (
				<Suspense>
					<Flux
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						className='absolute'
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
					></Flux>
				</Suspense>
			);

		case 'coil':
			return (
				<Suspense>
					<Coil
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						className='absolute'
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
					></Coil>
				</Suspense>
			);

		case 'circular':
			return (
				<Suspense>
					<Circular
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						className='absolute'
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
					></Circular>
				</Suspense>
			);

		case 'horizon':
			return (
				<Suspense>
					<Horizon
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Horizon>
				</Suspense>
			);

		case 'grayrate':
			return (
				<Suspense>
					<Grayrate
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Grayrate>
				</Suspense>
			);

		case 'hirl':
			return (
				<Suspense>
					<Hirl
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Hirl>
				</Suspense>
			);

		case 'neon':
			return (
				<Suspense>
					<Neon
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Neon>
				</Suspense>
			);

		case 'undulate':
			return (
				<Suspense>
					<Undulate
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Undulate>
				</Suspense>
			);

		case 'chaos':
			return (
				<Suspense>
					<Chaos
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Chaos>
				</Suspense>
			);

		case 'oscilate':
			return (
				<Suspense>
					<Oscilate
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
						}}
						className='absolute flex h-full w-full flex-auto'
					></Oscilate>
				</Suspense>
			);

		case 'vortex':
			return (
				<Suspense>
					<Vortex
						color1={workspaceGradient.color1}
						color2={workspaceGradient.color2}
						style={{
							height: workspaceHeight + 'px',
							width: workspaceWidth + 'px',
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
