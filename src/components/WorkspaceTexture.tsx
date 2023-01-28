import React from 'react';
import { useStoreState } from '../stores/Hooks';
import {
	Chaos,
	Circular,
	Coil,
	Flux,
	Grayrate,
	Hirl,
	Horizon,
	Neon,
	Oscilate,
	Undulate,
	Vortex,
} from './General/Backgrounds';

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
				<Flux
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
				></Flux>
			);

		case 'coil':
			return (
				<Coil
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
				></Coil>
			);

		case 'circular':
			return (
				<Circular
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
				></Circular>
			);

		case 'horizon':
			return (
				<Horizon
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className='flex flex-auto h-full w-full'
				></Horizon>
			);

		case 'grayrate':
			return (
				<Grayrate
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className='flex flex-auto h-full w-full'
				></Grayrate>
			);

		case 'hirl':
			return (
				<Hirl
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className='flex flex-auto h-full w-full'
				></Hirl>
			);

		case 'neon':
			return (
				<Neon
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className='flex flex-auto h-full w-full'
				></Neon>
			);

		case 'undulate':
			return (
				<Undulate
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className='flex flex-auto h-full w-full'
				></Undulate>
			);

		case 'chaos':
			return (
				<Chaos
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className='flex flex-auto h-full w-full'
				></Chaos>
			);

		case 'oscilate':
			return (
				<Oscilate
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className='flex flex-auto h-full w-full'
				></Oscilate>
			);

		case 'vortex':
			return (
				<Vortex
					color1={workspaceGradient.color1}
					color2={workspaceGradient.color2}
					style={{
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
					className='flex flex-auto h-full w-full'
				></Vortex>
			);

		default:
			return <></>;
	}
};
export default WorkspaceTexture;
