import { IconLetterT, IconPhoto } from '@tabler/icons';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button, ButtonGroup, Checkbox, FileInput, Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/karbonized.svg';

export const ImageBlock: React.FC<{ id: string }> = ({ id }) => {
	/* Component States */
	const [src, setSrc] = useState(karbonized);
	const [rounded, setRounded] = useState(false);

	return (
		<>
			<ControlTemplate
				id={id}
				minHeight={'20px'}
				minWidth={'50px'}
				maxWidth={'700px'}
				maxHeight={'500px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconPhoto></IconPhoto>
									<p className='my-auto'>Image</p>
								</div>
							}
						>
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

							{/* Rounded */}
							<div className='flex flex-row m-2 gap-2'>
								<p>Rounded</p>
								<Checkbox
									color='primary'
									onChange={(ev) => setRounded(ev.currentTarget.checked)}
									checked={rounded}
								></Checkbox>
							</div>
						</CustomCollapse>
					</>
				}
			>
				<img
					className={`flex flex-auto h-full ${rounded && 'rounded-full'}`}
					src={src}
				></img>
			</ControlTemplate>
		</>
	);
};
