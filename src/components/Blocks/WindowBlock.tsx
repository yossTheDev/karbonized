import { IconAppWindow, IconLetterT } from '@tabler/icons';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { FileInput, Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/image-example.png';

export const WindowBlock: React.FC = () => {
	/* Component States */
	const [title, setTitle] = useState('lorem');
	const [color, setColor] = useState('#0f172a');
	const [src, setSrc] = useState(karbonized);

	return (
		<>
			<ControlTemplate
				minHeight='100px'
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
							<div
								spellCheck={false}
								className='text-gray-600 text-center mb-auto mt-auto m-2 hover:border-none'
							>
								{title}
							</div>

							<div className='ml-auto flex flex-row'>
								<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1'></div>
								<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1'></div>
								<div className='bg-gray-800 p-1 w-4  h-4 rounded-full m-1'></div>
							</div>
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
