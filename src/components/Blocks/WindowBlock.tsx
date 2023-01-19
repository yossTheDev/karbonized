import { IconAppWindow } from '@tabler/icons';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { FileInput, Input, Select } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/image-example.png';
import { CloseSvg, MiniminizeSvg } from '../General/Icons';

export const WindowBlock: React.FC = () => {
	/* Component States */
	const [title, setTitle] = useState('lorem');
	const [color, setColor] = useState('#0f172a');
	const [windowStyle, setWindowStyle] = useState('mac');

	const [src, setSrc] = useState(karbonized);

	return (
		<>
			<ControlTemplate
				minHeight='200px'
				maxWidth='620px'
				maxHeight='450px'
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
								<p>Window Style</p>
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
								<p>Title</p>
								<Input
									spellCheck={false}
									onChange={(ev) => setTitle(ev.target.value)}
									value={title}
									className='flex flex-auto'
								></Input>
							</>

							<>
								{/* Source */}
								<p>Source</p>
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

							<>
								<p>Window Color</p>
								<HexColorPicker
									color={color}
									onChange={setColor}
									className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
								></HexColorPicker>
							</>
						</CustomCollapse>
					</>
				}
			>
				<div className='flex flex-auto flex-col overflow-hidden shadow-2xl rounded'>
					{/* Title */}
					<div className='flex flex-auto max-h-8 p-2'>
						<div className='my-auto flex flex-row flex-auto'>
							<div className='flex flex-auto flex-row text-gray-600'>
								{windowStyle === 'window' && (
									<p className='text-center mx-auto'>{title}</p>
								)}
							</div>
							<div
								spellCheck={false}
								className='text-gray-600 select-none flex flex-auto flex-row mx-auto'
							>
								{windowStyle === 'mac' && (
									<p className='text-center mx-auto'>{title}</p>
								)}
							</div>

							{windowStyle === 'mac' ? (
								<div className='flex flex-row flex-auto'>
									<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1 ml-auto'></div>
									<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1'></div>
									<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1'></div>
								</div>
							) : (
								<div className='flex flex-row flex-auto'>
									<MiniminizeSvg className='h-4 w-4 fill-black ml-auto'></MiniminizeSvg>
									<CloseSvg className='h-4 w-4 fill-black ml-2'></CloseSvg>
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
