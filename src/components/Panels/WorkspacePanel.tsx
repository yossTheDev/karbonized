import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Palette, Settings } from 'lucide-react';
import React, { Suspense } from 'react';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { Wallpapers } from '../../utils/wallpapers';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ScrollArea } from '../ui/scroll-area';

const Coil = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Coil'),
);
const Circular = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Circular'),
);
const Horizon = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Horizon'),
);
const Grayrate = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Grayrate'),
);
const Hirl = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Hirl'),
);
const Neon = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Neon'),
);
const Undulate = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Undulate'),
);
const Chaos = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Chaos'),
);
const Oscilate = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Oscilate'),
);
const Vortex = React.lazy(
	async () => await import('../Misc/SvgBackgrounds/Vortex'),
);

const textures = [
	{ name: 'grayrate', component: Grayrate },
	{ name: 'coil', component: Coil },
	{ name: 'circular', component: Circular },
	{ name: 'horizon', component: Horizon },
	{ name: 'hirl', component: Hirl },
	{ name: 'neon', component: Neon },
	{ name: 'undulate', component: Undulate },
	{ name: 'chaos', component: Chaos },
	{ name: 'oscilate', component: Oscilate },
	{ name: 'vortex', component: Vortex },
];

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

const getSize = (label: string): SizeItem | undefined => {
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
	const setWorkspaceDynamic = useStoreActions(
		(state) => state.setWorkspaceDynamic,
	);
	const setWorkspaceBlur = useStoreActions((state) => state.setWorkspaceBlur);
	const setWorkspaceNoise = useStoreActions((state) => state.setWorkspaceNoise);
	const setTextureColors = useStoreActions((state) => state.setTextureColors);
	const setWorkspaceColorMode = useStoreActions(
		(state) => state.setWorkspaceColorMode,
	);

	if (currentWorkspace == null) {
		return <></>;
	}

	return (
		<div className='flex flex-col mt-1 gap-3 bg-background border border-border shadow-md rounded-lg p-3'>
			{/* Background Settings */}
			<CustomCollapse
				menu={
					<div className='flex items-center gap-2'>
						<Settings size={18}></Settings>
						<Label className='text-foreground text-sm font-semibold'>
							Settings
						</Label>
					</div>
				}
			>
				{/* Workspace Name */}
				<>
					<Label htmlFor='workspace-name'>Workspace Name</Label>
					<Input
						id='workspace-name'
						spellCheck={false}
						onChange={(ev) => {
							setWorkspaceName(ev.target.value);
						}}
						value={currentWorkspace.workspaceName}
					></Input>
				</>

				{/* Size */}
				<>
					<Label>Size</Label>

					{/* Predefined Sizes */}
					<Select
						onValueChange={(e) => {
							const size = getSize(e);
							size != null &&
								setWorkspaceSize({
									width: size?.width.toString(),
									height: size?.height.toString(),
								});
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder='Workspace Size' />
						</SelectTrigger>
						<SelectContent>
							{Sizes.map((i) => {
								return (
									<SelectItem key={i.label} value={i.label}>
										{i.label}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>

					<div className='flex flex-auto select-none'>
						{/* Size W */}
						<div className='flex flex-auto flex-row items-center gap-2'>
							<Label>W:</Label>
							<Input
								type={'number'}
								placeholder='Width'
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
						<div className='ml-2 flex flex-auto select-none flex-row items-center gap-2'>
							<Label>H:</Label>

							<Input
								type={'number'}
								placeholder='Height'
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
					<div className='flex items-center gap-2'>
						<Palette size={16}></Palette>
						<Label className='text-foreground text-sm font-semibold'>
							Background
						</Label>
					</div>
				}
			>
				<Tabs
					value={currentWorkspace.workspaceType}
					onValueChange={(e: string) => {
						setWorkspaceType(e);
					}}
				>
					<TabsList className='mx-auto mb-4 flex w-fit'>
						<TabsTrigger value='color'>Color</TabsTrigger>
						<TabsTrigger value='texture'>Texture</TabsTrigger>
						<TabsTrigger value='image'>Image</TabsTrigger>
						<TabsTrigger value='dynamic'>Dynamic</TabsTrigger>
					</TabsList>

					<TabsContent value='color'>
						<>
							<div className='flex flex-wrap items-center justify-between gap-2'>
								{Gradients.map((item) => (
									<button
										key={item.c1 + item.c2}
										className={`h-16 w-16 overflow-hidden rounded-lg transition-all hover:shadow-md active:scale-90 ${
											currentWorkspace.workspaceGradientSettings.color1 ===
											item.c1
												? 'border-2 border-primary shadow-md'
												: 'border border-border'
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
									>
										{currentWorkspace.workspaceGradientSettings.color1 ===
											item.c1 &&
											currentWorkspace.workspaceGradientSettings.color2 ===
												item.c2 && <Check></Check>}
									</button>
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
										color2,
										deg: currentWorkspace.workspaceGradientSettings.deg,
									});
								}}
								onGradientDegChange={(deg) => {
									setWorkspaceGradient({
										color1: currentWorkspace.workspaceGradientSettings.color1,
										color2: currentWorkspace.workspaceGradientSettings.color2,
										deg,
									});
								}}
								onModeChange={(mode) => {
									setWorkspaceColorMode(mode);
								}}
								mode={currentWorkspace.workspaceColorMode}
								color={currentWorkspace.workspaceColor}
								onColorChange={setWorkspaceColor}
							></ColorPicker>
						</>
					</TabsContent>
					<TabsContent value='texture'>
						<div className='flex flex-auto flex-row flex-wrap gap-2 overflow-auto'>
							{textures.map((texture) => (
								<div
									key={texture.name}
									className={`size-16 cursor-pointer rounded-lg border-2 bg-background p-2 hover:border-border active:scale-95 transition-all ${
										currentWorkspace.textureName === texture.name
											? 'border-primary shadow-md'
											: 'border-border'
									}`}
									onClick={() => {
										setTexture(texture.name);
									}}
								>
									<Suspense>
										<texture.component className='flex h-full w-full flex-auto rounded-lg'></texture.component>
									</Suspense>
								</div>
							))}
						</div>
						<ColorPicker
							type='HexAlpha'
							colorGradient1={currentWorkspace.textureColors.color1}
							colorGradient2={currentWorkspace.textureColors.color2}
							onGradientChange={(color: any, color2: any) => {
								setTextureColors({
									color1: color,
									color2,
								});
							}}
							color={currentWorkspace.workspaceColor}
							mode={'Gradient'}
							onColorChange={() => {}}
						></ColorPicker>
					</TabsContent>
					<TabsContent value='image'>
						<div className='flex flex-auto flex-row flex-wrap gap-2 overflow-auto'>
							{Wallpapers.map((item) => (
								<button
									key={item.id}
									className={`h-16 w-16 overflow-hidden rounded-lg border-2 bg-background transition-all hover:shadow-md active:scale-90 ${
										currentWorkspace.textureName === item.id
											? 'border-primary shadow-md'
											: 'border-border'
									}`}
									onClick={() => {
										setTexture(item.id);
									}}
								>
									<img
										className='flex h-full w-full flex-auto'
										src={item.thumb}
									></img>
								</button>
							))}
						</div>
					</TabsContent>
					<TabsContent value='dynamic'>
						<div className='flex flex-col gap-4'>
							<div>
								<Label className='text-xs text-muted-foreground'>
									Colors (add up to 5)
								</Label>
								<div className='mt-2 flex flex-wrap gap-2'>
									{currentWorkspace.workspaceDynamicSettings.colors.map(
										(color, index) => (
											<div key={index} className='flex items-center gap-1'>
												<ColorPicker
													type='Hex'
													color={color}
													isGradientEnable={false}
													showLabel={false}
													onColorChange={(newColor) => {
														const newColors = [
															...currentWorkspace.workspaceDynamicSettings
																.colors,
														];
														newColors[index] = newColor;
														setWorkspaceDynamic({
															colors: newColors,
															seed: currentWorkspace.workspaceDynamicSettings
																.seed,
														});
													}}
												/>
												{currentWorkspace.workspaceDynamicSettings.colors
													.length > 2 && (
													<button
														onClick={() => {
															const newColors =
																currentWorkspace.workspaceDynamicSettings.colors.filter(
																	(_, i) => i !== index,
																);
															setWorkspaceDynamic({
																colors: newColors,
																seed: currentWorkspace.workspaceDynamicSettings
																	.seed,
															});
														}}
														className='text-muted-foreground hover:text-foreground'
													>
														×
													</button>
												)}
											</div>
										),
									)}
									{currentWorkspace.workspaceDynamicSettings.colors.length <
										5 && (
										<button
											onClick={() => {
												const newColors = [
													...currentWorkspace.workspaceDynamicSettings.colors,
													'#888888',
												];
												setWorkspaceDynamic({
													colors: newColors,
													seed: currentWorkspace.workspaceDynamicSettings.seed,
												});
											}}
											className='flex h-10 w-10 items-center justify-center rounded border border-border text-2xl hover:bg-base-200'
										>
											+
										</button>
									)}
								</div>
							</div>

							<button
								onClick={() => {
									const newSeed = Math.floor(Math.random() * 10000);
									setWorkspaceDynamic({
										colors: currentWorkspace.workspaceDynamicSettings.colors,
										seed: newSeed,
									});
								}}
								className='w-full rounded-md bg-primary py-2 text-primary-foreground hover:bg-primary/90'
							>
								Regenerate Positions
							</button>
						</div>
					</TabsContent>
				</Tabs>
				<Separator className='my-4' />

				<div>
					<Label className='text-xs text-muted-foreground'>
						Blur: {Math.round((currentWorkspace.workspaceBlur / 25) * 100)}%
					</Label>
					<Slider
						value={[currentWorkspace.workspaceBlur]}
						min={0}
						max={25}
						onValueChange={(value) => {
							setWorkspaceBlur(value[0]);
						}}
						className='mt-1'
					/>
				</div>

				<div>
					<Label className='text-xs text-muted-foreground'>
						Noise: {Math.round((currentWorkspace.workspaceNoise / 45) * 100)}%
					</Label>
					<Slider
						value={[currentWorkspace.workspaceNoise]}
						min={0}
						max={45}
						onValueChange={(value) => {
							setWorkspaceNoise(value[0]);
						}}
						className='mt-1'
					/>
				</div>
			</CustomCollapse>
		</div>
	);
};

export default WorkspacePanel;
