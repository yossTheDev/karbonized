import { IconAppWindow } from '@tabler/icons-react';
import React, { useState } from 'react';
import { FileInput, Input, Select } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/image-example.png';
import { CloseSvg, MiniminizeSvg } from '../General/Icons';
import { ColorPicker } from '../CustomControls/ColorPicker';

export const WindowBlock: React.FC = () => {
	/* Component States */
	const [title, setTitle] = useState('lorem');
	const [color, setColor] = useState('#0f172a');
	const [controlsColor, setControlsColor] = useState('#1f2937');

	const [windowStyle, setWindowStyle] = useState('mac');

	const [src, setSrc] = useState(karbonized);

	return (
		<>
			<ControlTemplate
				minHeight='200px'
				maxWidth='3000px'
				maxHeight='2000px'
				border={6}
				defaultHeight={'200px'}
				defaultWidth={'350px'}
				color={color}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconAppWindow></IconAppWindow>
									<p className='my-auto'>Window</p>
								</div>
							}
						>
							<>
								<p className='text-xs'>Window Style</p>
								<Select
									defaultValue={'mac'}
									tabIndex={0}
									value={windowStyle}
									onChange={(e) => setWindowStyle(e)}
								>
									<option value={'mac'}>mac</option>
									<option value={'window'}>window</option>
								</Select>
							</>
							<>
								<p className='text-xs'>Title</p>
								<Input
									spellCheck={false}
									onChange={(ev) => setTitle(ev.target.value)}
									value={title}
									className='flex flex-auto'
								></Input>
							</>

							<>
								{/* Source */}
								<p className='text-xs'>Source</p>
								<FileInput
									accept='image/*'
									onChange={(e) => {
										if (e.target.files && e.target.files.length > 0) {
											const reader = new FileReader();
											reader.addEventListener('load', () => {
												setSrc(reader.result?.toString() || '');
											});
											reader.readAsDataURL(e.target.files[0]);
										}
									}}
								></FileInput>
							</>

							{/* Colors */}
							<p className='text-xs'>Colors</p>
							<>
								<ColorPicker
									color={color}
									onColorChange={setColor}
									isGradientEnable={false}
									label='Window Color'
								></ColorPicker>

								<ColorPicker
									color={controlsColor}
									onColorChange={setControlsColor}
									isGradientEnable={false}
									label='Controls Color'
								></ColorPicker>
							</>
						</CustomCollapse>
					</>
				}
			>
				<div className='flex flex-auto flex-col overflow-hidden rounded'>
					{/* Title */}
					<div className='flex flex-auto max-h-8 p-2'>
						<div className='my-auto flex flex-row flex-auto'>
							<div className='flex flex-auto flex-row text-gray-600'>
								{windowStyle === 'window' && (
									<p style={{ color: controlsColor }} className='text-left'>
										{title}
									</p>
								)}
							</div>

							<div
								spellCheck={false}
								className='text-gray-600 select-none flex flex-auto flex-row'
							>
								{windowStyle === 'mac' && (
									<p
										style={{ color: controlsColor }}
										className='text-center mx-auto'
									>
										{title}
									</p>
								)}
							</div>

							{windowStyle === 'mac' ? (
								<div className='flex flex-row flex-auto'>
									<div
										style={{ backgroundColor: controlsColor }}
										className='p-1 w-4  h-4 rounded-full m-1 ml-auto'
									></div>
									<div
										style={{ backgroundColor: controlsColor }}
										className='p-1 w-4  h-4 rounded-full m-1'
									></div>
									<div
										style={{ backgroundColor: controlsColor }}
										className='p-1 w-4  h-4 rounded-full m-1'
									></div>
								</div>
							) : (
								<div className='flex flex-row flex-auto'>
									<MiniminizeSvg
										style={{ fill: controlsColor }}
										className='h-4 w-4 ml-auto'
									></MiniminizeSvg>
									<CloseSvg
										style={{ fill: controlsColor }}
										className='h-4 w-4  ml-2'
									></CloseSvg>
								</div>
							)}
						</div>
					</div>

					{/* Content */}
					<div className='flex flex-auto'>
						<img
							className='flex flex-auto h-full w-full aspect-auto'
							src={src}
						></img>
					</div>
				</div>
			</ControlTemplate>
		</>
	);
};
