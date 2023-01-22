import {
	IconAspectRatio,
	IconPalette,
	IconTag,
	IconTrash,
} from '@tabler/icons';
import React from 'react';
import { Input, Select } from 'react-daisyui';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { NumberInput } from '../CustomControls/NumberInput';

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
	const setWorkspaceName = useStoreActions((state) => state.setWorkspaceName);
	const setWorkspaceColor = useStoreActions((state) => state.setWorkspaceColor);
	const setWorkspaceSize = useStoreActions((state) => state.setWorkspaceSize);
	const cleanWorkspace = useStoreActions((state) => state.cleanWorkspace);

	return (
		<>
			<div className='flex flex-auto flex-col p-2 text-xs'>
				{/* Workspace Name */}
				<>
					<div className='flex flex-row m-2 gap-2'>
						<IconTag size={22}></IconTag>
						<p className='font-bold my-auto'>Workspace Name</p>
					</div>
					<div className='flex flex-auto flex-row max-h-14 p-2'>
						<Input
							spellCheck={false}
							className='bg-base-100 p-2 rounded-xl my-auto  w-full'
							onChange={(ev) => setWorkspaceName(ev.target.value)}
							value={workspaceName}
						></Input>
					</div>
				</>

				{/* Size */}
				<>
					<div className='flex flex-row m-2 gap-2 select-none'>
						<IconAspectRatio size={22}></IconAspectRatio>
						<p className='font-bold my-auto'>Size</p>
					</div>

					{/* Predefined Sizes */}
					<div className='flex my-2 mx-2'>
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

					<div className='flex flex-auto flex-row max-h-16 p-2 select-none'>
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
						<div className='flex flex-auto flex-row ml-2 select-none'>
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
				<div className='flex flex-col select-none'>
					<div className='flex flex-row m-2 gap-2 '>
						<IconPalette size={22}></IconPalette>
						<p className='font-bold my-auto'>Background</p>
					</div>
					<ColorPicker
						type='HexAlpha'
						color={workspaceColor}
						onColorChange={setWorkspaceColor}
					></ColorPicker>
				</div>

				{/* Clean */}
				<div
					onClick={() => {
						cleanWorkspace();
					}}
					className='mt-auto  bg-gray-800/20 hover:bg-red-600 hover:text-white rounded flex flex-auto flex-row gap-2 max-h-12 p-2 cursor-pointer'
				>
					<div className='flex flex-row gap-2 mx-auto my-auto'>
						<IconTrash className='my-auto' size={18}></IconTrash>
						<p className='my-auto'>Clean</p>
					</div>
				</div>
			</div>
		</>
	);
};
