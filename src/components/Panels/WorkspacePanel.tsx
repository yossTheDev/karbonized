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

const Gradients = [
	{ c1: '#ff9a9e', c2: '#fad0c4' },
	{ c1: '#a18cd1', c2: '#fbc2eb' },
	{ c1: '#fad0c4', c2: '#ffd1ff' },
	{ c1: '#ffecd2', c2: '#fcb69f' },
	{ c1: '#fe9698', c2: '#fecfef' },
	{ c1: '#f6d365', c2: '#fda085' },
	{ c1: '#fbc2eb', c2: '#a6c1ee' },
	{ c1: '#a1c4fd', c2: '#c2e9fb' },
	{ c1: '#d4fc79', c2: '#96a6a1' },
	{ c1: '#84fab0', c2: '#8fd3f4' },
	{ c1: '#a6c0fe', c2: '#f68084' },
	{ c1: '#fccb90', c2: '#d57eeb' },
	{ c1: '#e0c3fc', c2: '#8ec5fc' },
	{ c1: '#f093fb', c2: '#f5576c' },
	{ c1: '#43e97b', c2: '#38f9d8' },
	{ c1: '#fa709a', c2: '#fee140' },
	{ c1: '#30cfd0', c2: '#330867' },
	{ c1: '#a8edea', c2: '#fed6e3' },
	{ c1: '#5ee7df', c2: '#b490ca' },
	{ c1: '#d299c2', c2: '#fef9d7' },
	{ c1: '#667eea', c2: '#764ba2' },
	{ c1: '#89f7fe', c2: '#66a6ff' },
	{ c1: '#fddb92', c2: '#d1fdff' },
	{ c1: '#9890e3', c2: '#b1f4cf' },
	{ c1: '#96fbc4', c2: '#f9f586' },
	{ c1: '#2af958', c2: '#009efd' },
	{ c1: '#37ecba', c2: '#72afd3' },
	{ c1: '#fff1eb', c2: '#ace0f9' },
	{ c1: '#c471f5', c2: '#fa71cd' },
	{ c1: '#0ba360', c2: '#3cba92' },
	{ c1: '#0250c5', c2: '#d43f8d' },
	{ c1: '#ff0844', c2: '#ffb199' },
	{ c1: '#92fe9d', c2: '#00c9ff' },
];

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

				{/* Background Type */}
				<CustomCollapse
					isOpen
					menu={
						<div className='m-2 flex flex-row gap-2'>
							<IconPalette></IconPalette>
							<p className='my-auto font-bold'>Background</p>
						</div>
					}
				>
					{/* Workspace Background Type Selectors */}
					<div className='mb-1 flex h-fit flex-row gap-2 rounded-2xl bg-base-300/60 p-2'>
						<button
							onClick={() => {
								setWorkspaceType('color');
							}}
							className={`flex h-8 w-fit shrink-0 grow cursor-pointer flex-col rounded-xl bg-base-100 p-2 transition-all hover:scale-105 hover:cursor-pointer hover:bg-neutral active:scale-90 ${
								currentWorkspace.workspaceType === 'color' && 'bg-base-300'
							}`}
						>
							<label className='mx-auto my-auto cursor-pointer'>Color</label>
						</button>

						<button
							className={`flex h-8  w-fit shrink-0 grow cursor-pointer flex-col rounded-xl bg-base-100 p-2  transition-all hover:scale-105 hover:cursor-pointer hover:bg-neutral active:scale-90 ${
								currentWorkspace.workspaceType === 'texture' && 'bg-base-300'
							}`}
							onClick={() => {
								setWorkspaceType('texture');
							}}
						>
							<label className='mx-auto my-auto cursor-pointer'>Texture</label>
						</button>

						<button
							className={`flex h-8  w-fit shrink-0 grow cursor-pointer flex-col rounded-xl bg-base-100 p-2  transition-all hover:scale-105 hover:cursor-pointer hover:bg-neutral active:scale-90 ${
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
									className={`mx-auto h-16 w-20 overflow-hidden rounded-2xl border-4 bg-base-100 transition-transform hover:shadow active:scale-90 md:h-20 md:w-32 ${
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

					{/* Select Shape */}
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

					{/* Gradients */}
					{currentWorkspace.workspaceType === 'color' && (
						<>
							<div className='flex h-full flex-auto flex-row flex-wrap gap-2 overflow-auto '>
								{Gradients.map((item) => (
									<button
										className={`mx-auto h-16 w-16 overflow-hidden rounded-2xl border-4 transition-transform hover:bg-gradient-to-bl hover:shadow active:scale-90 md:h-16 md:w-20 ${
											currentWorkspace.workspaceGradientSettings.color1 ===
											item.c1
												? 'border-2 border-primary shadow-2xl'
												: 'border-base-300'
										}`}
										style={{
											background: `linear-gradient(${item.c1},${item.c2})`,
										}}
										onClick={() => {
											setWorkspaceColorMode('Gradient');
											setWorkspaceGradient({
												color1: item.c1,
												color2: item.c2,
												deg: currentWorkspace.workspaceGradientSettings.deg,
											});
										}}
									></button>
								))}
							</div>

							<ColorPicker
								type='HexAlpha'
								colorGradient1={
									currentWorkspace.workspaceGradientSettings.color1
								}
								colorGradient2={
									currentWorkspace.workspaceGradientSettings.color2
								}
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
						</>
					)}
				</CustomCollapse>
			</div>
		</>
	);
};

export default WorkspacePanel;
