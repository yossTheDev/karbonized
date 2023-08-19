import { IconPalette, IconSettings } from '@tabler/icons-react';
import React, { Suspense } from 'react';
import { Input, Select } from 'react-daisyui';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { Wallpapers } from '../../utils/wallpapers';
import { CustomCollapse } from '../CustomControls/CustomCollapse';

const Coil = React.lazy(() => import('../Misc/SvgBackgrounds/Coil'));
const Circular = React.lazy(() => import('../Misc/SvgBackgrounds/Circular'));
const Horizon = React.lazy(() => import('../Misc/SvgBackgrounds/Horizon'));
const Grayrate = React.lazy(() => import('../Misc/SvgBackgrounds/Grayrate'));
const Hirl = React.lazy(() => import('../Misc/SvgBackgrounds/Hirl'));
const Neon = React.lazy(() => import('../Misc/SvgBackgrounds/Neon'));
const Undulate = React.lazy(() => import('../Misc/SvgBackgrounds/Undulate'));
const Chaos = React.lazy(() => import('../Misc/SvgBackgrounds/Chaos'));
const Oscilate = React.lazy(() => import('../Misc/SvgBackgrounds/Oscilate'));
const Vortex = React.lazy(() => import('../Misc/SvgBackgrounds/Vortex'));

interface SizeItem {
	label: string;
	height: number;
	width: number;
}

const Sizes: SizeItem[] = [
	{ label: 'Default', width: 512, height: 512 },
	{ label: 'Ultra HD', width: 3840, height: 2160 },
	{ label: 'Quad HD', width: 2560, height: 1440 },
	{ label: 'Full HD', width: 1920, height: 1080 },
	{ label: 'HD', width: 1280, height: 720 },
	{ label: 'Iphone 13 Pro Max', width: 428, height: 926 },
	{ label: 'Android', width: 360, height: 640 },
	{ label: 'Legal', width: 612, height: 1008 },
	{ label: 'Letter', width: 612, height: 792 },
	{ label: 'You Tube', width: 2560, height: 1440 },
	{ label: 'Facebook Cover', width: 820, height: 312 },
	{ label: 'Facebook Post', width: 1200, height: 630 },
	{ label: 'Twitter Header', width: 1500, height: 500 },
	{ label: 'Twitter Post', width: 1012, height: 506 },
	{ label: 'Instagram Story', width: 1080, height: 1920 },
	{ label: 'Instagram Post', width: 1080, height: 1080 },
	{ label: 'LinkedIn Cover', width: 1584, height: 396 },
	{ label: 'Pinterest', width: 735, height: 1102 },
];

const getSize = (label: string) => {
	return Sizes.find((item) => label === item.label);
};

export const WorkspacePanel: React.FC = () => {
	/* App Store */
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);
	const setWorkspaceName = useStoreActions((state) => state.setWorkspaceName);
	const setWorkspaceColor = useStoreActions((state) => state.setWorkspaceColor);
	const setWorkspaceType = useStoreActions((state) => state.setWorkspaceType);
	const setTexture = useStoreActions((state) => state.setTextureName);
	const setWorkspaceSize = useStoreActions((state) => state.setWorkspaceSize);
	const setWorkspaceGradient = useStoreActions(
		(state) => state.setWorkspaceGradient,
	);
	const setTextureColors = useStoreActions((state) => state.setTextureColors);
	const setWorkspaceColorMode = useStoreActions(
		(state) => state.setWorkspaceColorMode,
	);

	return (
		<>
			<label className='mb-2 ml-3 mt-1 select-none text-xl font-bold'>
				Workspace
			</label>

			<div className='flex flex-auto select-none flex-col overflow-auto p-1 text-xs'>
				{/* Background Settings */}
				<CustomCollapse
					menu={
						<div className='m-2 flex flex-row gap-2'>
							<IconSettings></IconSettings>
							<p className='my-auto font-bold'>Settings</p>
						</div>
					}
				>
					{/* Workspace Name */}
					<>
						<p className='my-auto font-bold'>Workspace Name</p>

						<div className='flex max-h-14 flex-auto flex-row p-2'>
							<Input
								spellCheck={false}
								className='my-auto w-full rounded-xl bg-base-100  p-2'
								onChange={(ev) => setWorkspaceName(ev.target.value)}
								value={currentWorkspace.workspaceName}
							></Input>
						</div>
					</>

					{/* Size */}
					<>
						<p className='my-auto font-bold'>Size</p>

						{/* Predefined Sizes */}
						<div className='mx-2 my-2 flex'>
							<Select
								defaultValue={'Default'}
								className='flex flex-auto'
								tabIndex={0}
								onChange={(e) => {
									const size = getSize(e.currentTarget.value);
									size &&
										setWorkspaceSize({
											width: size?.width.toString(),
											height: size?.height.toString(),
										});
								}}
							>
								{Sizes.map((i) => {
									return (
										<option key={i.label} value={i.label}>
											{i.label}
										</option>
									);
								})}
							</Select>
						</div>

						<div className='flex max-h-16 flex-auto select-none flex-row p-2'>
							{/* Size W */}
							<div className='flex flex-auto flex-row'>
								<p className='my-auto mr-2'>W:</p>
								<Input
									type={'number'}
									className='w-full rounded-xl bg-base-100 p-2 text-xs'
									onChange={(ev) => {
										setWorkspaceSize({
											width: ev.currentTarget.value,
											height: currentWorkspace.workspaceHeight,
										});
									}}
									value={currentWorkspace.workspaceWidth}
								></Input>
							</div>
							{/* Size H */}
							<div className='ml-2 flex flex-auto select-none flex-row'>
								<p className='my-auto mr-2'>H:</p>

								<Input
									type={'number'}
									className='w-full rounded-xl bg-base-100 p-2 text-xs'
									onChange={(ev) => {
										setWorkspaceSize({
											height: ev.currentTarget.value,
											width: currentWorkspace.workspaceWidth,
										});
									}}
									value={currentWorkspace.workspaceHeight}
								></Input>
							</div>
						</div>
					</>
				</CustomCollapse>

				{/* Background Color */}
				<CustomCollapse
					isOpen
					menu={
						<div className='m-2 flex flex-row gap-2'>
							<IconPalette></IconPalette>
							<p className='my-auto font-bold'>Background</p>
						</div>
					}
				>
					{/* Workspace  Background Type */}
					<div className='mb-1 flex h-fit flex-row gap-2 rounded-2xl bg-base-300/60 p-2'>
						<button
							onClick={() => {
								setWorkspaceType('color');
							}}
							className={`flex h-8 w-8 grow cursor-pointer flex-col rounded-xl bg-base-100 p-2 transition-all hover:scale-105 hover:cursor-pointer hover:bg-neutral active:scale-90 ${
								currentWorkspace.workspaceType === 'color' && 'bg-base-300'
							}`}
						>
							<label className='mx-auto my-auto cursor-pointer'>Color</label>
						</button>

						<button
							className={`flex  h-8 w-8 grow cursor-pointer flex-col rounded-xl bg-base-100 p-2  transition-all hover:scale-105 hover:cursor-pointer hover:bg-neutral active:scale-90 ${
								currentWorkspace.workspaceType === 'texture' && 'bg-base-300'
							}`}
							onClick={() => {
								setWorkspaceType('texture');
							}}
						>
							<label className='mx-auto my-auto cursor-pointer'>Texture</label>
						</button>

						<button
							className={`flex  h-8 w-8 grow cursor-pointer flex-col rounded-xl bg-base-100 p-2  transition-all hover:scale-105 hover:cursor-pointer hover:bg-neutral active:scale-90 ${
								currentWorkspace.workspaceType === 'image' && 'bg-base-300'
							}`}
							onClick={() => {
								setWorkspaceType('image');
							}}
						>
							<label className='mx-auto my-auto cursor-pointer'>Image</label>
						</button>
					</div>

					{/* Select Texture */}
					{currentWorkspace.workspaceType === 'texture' && (
						<div className='flex flex-auto flex-row flex-wrap  gap-2 overflow-auto'>
							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'grayrate'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('grayrate');
								}}
							>
								<Suspense>
									<Grayrate className='flex h-full w-full flex-auto rounded-full'></Grayrate>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'coil'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('coil');
								}}
							>
								<Suspense>
									<Coil className='flex h-full w-full flex-auto rounded-full'></Coil>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'circular'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('circular');
								}}
							>
								<Suspense>
									<Circular className='flex h-full w-full flex-auto rounded-full'></Circular>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'horizon'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('horizon');
								}}
							>
								<Suspense>
									<Horizon className='flex h-full w-full flex-auto rounded-full'></Horizon>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'hirl'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('hirl');
								}}
							>
								<Suspense>
									<Hirl className='flex h-full w-full flex-auto rounded-full'></Hirl>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'neon'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('neon');
								}}
							>
								<Suspense>
									<Neon className='flex h-full w-full flex-auto rounded-full'></Neon>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'undulate'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('undulate');
								}}
							>
								<Suspense>
									<Undulate className='flex h-full w-full flex-auto rounded-full'></Undulate>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'chaos'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('chaos');
								}}
							>
								<Suspense>
									<Chaos className='flex h-full w-full flex-auto rounded-full'></Chaos>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'oscilate'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('oscilate');
								}}
							>
								<Suspense>
									<Oscilate className='flex h-full w-full flex-auto rounded-full'></Oscilate>
								</Suspense>
							</div>

							<div
								className={`h-12 w-12 cursor-pointer rounded-full border-2 bg-base-300 p-2 hover:border-2 hover:border-gray-400 active:scale-95 ${
									currentWorkspace.textureName === 'vortex'
										? 'border-primary'
										: 'border-base-300'
								}`}
								onClick={() => {
									setTexture('vortex');
								}}
							>
								<Suspense>
									<Vortex className='flex h-full w-full flex-auto rounded-full'></Vortex>
								</Suspense>
							</div>
						</div>
					)}

					{/* Image */}
					{currentWorkspace.workspaceType === 'image' && (
						<div className='flex flex-auto flex-row flex-wrap gap-2 overflow-auto'>
							{Wallpapers.map((item) => (
								<button
									className={`mx-auto h-20 w-32 overflow-hidden rounded-2xl border-4 bg-base-100 transition-transform hover:shadow active:scale-90 ${
										currentWorkspace.textureName === item.id
											? 'border-2 border-primary shadow-2xl'
											: 'border-base-300'
									}`}
									onClick={() => setTexture(item.id)}
								>
									<img
										className='flex h-full w-full flex-auto'
										src={item.thumb}
									></img>
								</button>
							))}
						</div>
					)}

					{/* Color or Gradient */}
					{currentWorkspace.workspaceType === 'color' && (
						<ColorPicker
							type='HexAlpha'
							colorGradient1={currentWorkspace.workspaceGradientSettings.color1}
							colorGradient2={currentWorkspace.workspaceGradientSettings.color2}
							gradientDeg={currentWorkspace.workspaceGradientSettings.deg}
							onGradientChange={(color: any, color2: any) => {
								setWorkspaceGradient({
									color1: color,
									color2: color2,
									deg: currentWorkspace.workspaceGradientSettings.deg,
								});
							}}
							onGradientDegChange={(deg) => {
								setWorkspaceGradient({
									color1: currentWorkspace.workspaceGradientSettings.color1,
									color2: currentWorkspace.workspaceGradientSettings.color2,
									deg: deg,
								});
							}}
							onModeChange={(mode) => setWorkspaceColorMode(mode)}
							mode={currentWorkspace.workspaceColorMode}
							color={currentWorkspace.workspaceColor}
							onColorChange={setWorkspaceColor}
						></ColorPicker>
					)}

					{currentWorkspace.workspaceType === 'texture' && (
						<ColorPicker
							type='HexAlpha'
							colorGradient1={currentWorkspace.textureColors.color1}
							colorGradient2={currentWorkspace.textureColors.color2}
							onGradientChange={(color: any, color2: any) => {
								setTextureColors({
									color1: color,
									color2: color2,
								});
							}}
							color={currentWorkspace.workspaceColor}
							mode={'Gradient'}
							onColorChange={() => {}}
						></ColorPicker>
					)}
					{/* Select Shape */}
				</CustomCollapse>
			</div>
		</>
	);
};

export default WorkspacePanel;
