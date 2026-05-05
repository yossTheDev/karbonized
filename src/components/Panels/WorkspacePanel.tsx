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
import { useWorkspaceStore, useUIStore } from '../../stores';
import { Wallpapers } from '../../utils/wallpapers';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ScrollArea } from '../ui/scroll-area';
import {
	textures,
	MeshGradient,
	LavaLampBackground,
	StarfieldBackground,
	GalaxyBackground,
} from '../../constants/textures';
import { Gradients } from '../../constants/gradients';
import { SizeItem, Sizes, getSize } from '../../constants/sizes';

export const WorkspacePanel: React.FC = () => {
	/* App Store */
	const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
	const setWorkspaceName = useWorkspaceStore((state) => state.setWorkspaceName);
	const setWorkspaceColor = useWorkspaceStore(
		(state) => state.setWorkspaceColor,
	);
	const setWorkspaceType = useWorkspaceStore((state) => state.setWorkspaceType);
	const setTexture = useWorkspaceStore((state) => state.setTextureName);
	const setWorkspaceSize = useWorkspaceStore((state) => state.setWorkspaceSize);
	const setWorkspaceGradient = useWorkspaceStore(
		(state) => state.setWorkspaceGradient,
	);
	const setWorkspaceDynamic = useWorkspaceStore(
		(state) => state.setWorkspaceDynamic,
	);
	const setWorkspaceBlur = useWorkspaceStore((state) => state.setWorkspaceBlur);
	const setWorkspaceNoise = useWorkspaceStore(
		(state) => state.setWorkspaceNoise,
	);
	const setTextureColors = useWorkspaceStore((state) => state.setTextureColors);
	const setWorkspaceColorMode = useWorkspaceStore(
		(state) => state.setWorkspaceColorMode,
	);
	const setWorkspaceDynamicType = useWorkspaceStore(
		(state) => state.setWorkspaceDynamicType,
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
								<Label className='text-xs text-muted-foreground mb-2 block'>
									Dynamic Type
								</Label>
								<Select
									value={currentWorkspace.workspaceDynamicType}
									onValueChange={(
										value: 'mesh' | 'lava' | 'starfield' | 'galaxy',
									) => {
										setWorkspaceDynamicType(value);
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select dynamic type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='mesh'>Mesh Gradient</SelectItem>
										<SelectItem value='lava'>Lava Lamp</SelectItem>
										<SelectItem value='starfield'>Starfield</SelectItem>
										<SelectItem value='galaxy'>Galaxy</SelectItem>
									</SelectContent>
								</Select>
							</div>

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
