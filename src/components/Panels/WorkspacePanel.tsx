import {
	IconAspectRatio,
	IconPalette,
	IconTag,
	IconTrash,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { Input, Select } from 'react-daisyui';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { NumberInput } from '../CustomControls/NumberInput';

const Coil = React.lazy(() => import('../General/SvgBackgrounds/Coil'));
const Circular = React.lazy(() => import('../General/SvgBackgrounds/Circular'));
const Horizon = React.lazy(() => import('../General/SvgBackgrounds/Horizon'));
const Grayrate = React.lazy(() => import('../General/SvgBackgrounds/Grayrate'));
const Hirl = React.lazy(() => import('../General/SvgBackgrounds/Hirl'));
const Neon = React.lazy(() => import('../General/SvgBackgrounds/Neon'));
const Undulate = React.lazy(() => import('../General/SvgBackgrounds/Undulate'));
const Chaos = React.lazy(() => import('../General/SvgBackgrounds/Chaos'));
const Oscilate = React.lazy(() => import('../General/SvgBackgrounds/Oscilate'));
const Vortex = React.lazy(() => import('../General/SvgBackgrounds/Vortex'));

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
	const workspaceName = useStoreState((state) => state.workspaceName);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);
	const workspaceColor = useStoreState((state) => state.workspaceColor);
	const workspaceType = useStoreState((state) => state.workspaceType);
	const workspaceColorMode = useStoreState((state) => state.workspaceColorMode);
	const workspaceGadient = useStoreState(
		(state) => state.workspaceGradientSettings
	);
	const setWorkspaceName = useStoreActions((state) => state.setWorkspaceName);
	const setWorkspaceColor = useStoreActions((state) => state.setWorkspaceColor);
	const setWorkspaceType = useStoreActions((state) => state.setWorkspaceType);
	const setTexture = useStoreActions((state) => state.setTextureName);
	const setWorkspaceSize = useStoreActions((state) => state.setWorkspaceSize);
	const setWorkspaceGradient = useStoreActions(
		(state) => state.setWorkspaceGradient
	);

	const textureColors = useStoreState((state) => state.textureColors);
	const setTextureColors = useStoreActions((state) => state.setTextureColors);
	const setWorkspaceColorMode = useStoreActions(
		(state) => state.setWorkspaceColorMode
	);
	const cleanWorkspace = useStoreActions((state) => state.cleanWorkspace);

	return (
		<>
			<motion.div
				initial={{ marginTop: '25px' }}
				animate={{ marginTop: '0px' }}
				className='flex flex-auto select-none flex-col overflow-auto p-2 text-xs'
			>
				{/* Workspace Name */}
				<>
					<div className='m-2 flex flex-row gap-2'>
						<IconTag size={22}></IconTag>
						<p className='my-auto font-bold'>Workspace Name</p>
					</div>
					<div className='flex max-h-14 flex-auto flex-row p-2'>
						<Input
							spellCheck={false}
							className='my-auto w-full rounded-xl bg-base-100  p-2'
							onChange={(ev) => setWorkspaceName(ev.target.value)}
							value={workspaceName}
						></Input>
					</div>
				</>

				{/* Size */}
				<>
					<div className='m-2 flex select-none flex-row gap-2'>
						<IconAspectRatio size={22}></IconAspectRatio>
						<p className='my-auto font-bold'>Size</p>
					</div>

					{/* Predefined Sizes */}
					<div className='mx-2 my-2 flex'>
						<Select
							defaultValue={'Default'}
							className='flex flex-auto'
							tabIndex={0}
							onChange={(e) => {
								const size = getSize(e as string);
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
							<NumberInput
								onChange={(number) => {
									setWorkspaceSize({
										width: number.toString(),
										height: workspaceHeight,
									});
								}}
								number={parseInt(workspaceWidth)}
							></NumberInput>
						</div>
						{/* Size H */}
						<div className='ml-2 flex flex-auto select-none flex-row'>
							<p className='my-auto mr-2'>H:</p>
							<NumberInput
								onChange={(number) => {
									setWorkspaceSize({
										height: number.toString(),
										width: workspaceWidth,
									});
								}}
								number={parseInt(workspaceHeight)}
							></NumberInput>
						</div>
					</div>
				</>

				{/* Background Color */}
				<>
					{/* Header */}
					<div className='m-2 flex flex-row gap-2 '>
						<IconPalette size={22}></IconPalette>
						<p className='my-auto font-bold'>Background</p>
					</div>

					{/* Workspace  Background Type */}
					<div className='mb-1 flex h-8 flex-row gap-2'>
						<div
							onClick={() => {
								setWorkspaceType('color');
							}}
							className={`flex h-8 w-8 grow cursor-pointer flex-col rounded-xl bg-base-200 p-2 ${
								workspaceType === 'color' && 'border-2 border-primary'
							}`}
						>
							<p className='mx-auto my-auto'>Color</p>
						</div>

						<div
							className={`flex h-8 w-8 grow cursor-pointer flex-col rounded-xl bg-base-200 p-2 ${
								workspaceType === 'texture' && 'border-2 border-primary'
							}`}
							onClick={() => {
								setWorkspaceType('texture');
							}}
						>
							<p className='mx-auto my-auto'>Texture</p>
						</div>
					</div>

					{/* Select Texture */}
					{workspaceType === 'texture' && (
						<div className='flex flex-auto flex-row flex-wrap  gap-2 overflow-auto'>
							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('grayrate');
								}}
							>
								<Suspense>
									<Grayrate className='flex h-full w-full flex-auto rounded-full'></Grayrate>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('coil');
								}}
							>
								<Suspense>
									<Coil className='flex h-full w-full flex-auto rounded-full '></Coil>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('circular');
								}}
							>
								<Suspense>
									<Circular className='flex h-full w-full flex-auto rounded-full'></Circular>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('horizon');
								}}
							>
								<Suspense>
									<Horizon className='flex h-full w-full flex-auto rounded-full'></Horizon>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('hirl');
								}}
							>
								<Suspense>
									<Hirl className='flex h-full w-full flex-auto rounded-full'></Hirl>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('neon');
								}}
							>
								<Suspense>
									<Neon className='flex h-full w-full flex-auto rounded-full'></Neon>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('undulate');
								}}
							>
								<Suspense>
									<Undulate className='flex h-full w-full flex-auto rounded-full'></Undulate>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('chaos');
								}}
							>
								<Suspense>
									<Chaos className='flex h-full w-full flex-auto rounded-full'></Chaos>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
								onClick={() => {
									setTexture('oscilate');
								}}
							>
								<Suspense>
									<Oscilate className='flex h-full w-full flex-auto rounded-full'></Oscilate>
								</Suspense>
							</div>

							<div
								className='h-12  w-12 cursor-pointer rounded-full hover:border-2 hover:border-gray-400'
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

					{workspaceType === 'color' ? (
						<ColorPicker
							type='HexAlpha'
							colorGradient1={workspaceGadient.color1}
							colorGradient2={workspaceGadient.color2}
							gradientDeg={workspaceGadient.deg}
							onGradientChange={(color: any, color2: any) => {
								setWorkspaceGradient({
									color1: color,
									color2: color2,
									deg: workspaceGadient.deg,
								});
							}}
							onGradientDegChange={(deg) => {
								setWorkspaceGradient({
									color1: workspaceGadient.color1,
									color2: workspaceGadient.color2,
									deg: deg,
								});
							}}
							onModeChange={(mode) => setWorkspaceColorMode(mode)}
							mode={workspaceColorMode}
							color={workspaceColor}
							onColorChange={setWorkspaceColor}
						></ColorPicker>
					) : (
						<ColorPicker
							type='HexAlpha'
							colorGradient1={textureColors.color1}
							colorGradient2={textureColors.color2}
							onGradientChange={(color: any, color2: any) => {
								setTextureColors({
									color1: color,
									color2: color2,
								});
							}}
							color={workspaceColor}
							mode={'Gradient'}
							onColorChange={() => {}}
						></ColorPicker>
					)}
				</>
			</motion.div>
		</>
	);
};
