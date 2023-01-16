import { IconBorderStyle, IconPhoto } from '@tabler/icons';
import React, { useState } from 'react';
import { FileInput, Range } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/karbonized.svg';

export const ImageBlock: React.FC<{ id: string }> = ({ id }) => {
	/* Component States */
	const [src, setSrc] = useState(karbonized);
	const [borderRadious, setBorderRadious] = useState(3);

	return (
		<>
			<ControlTemplate
				id={id}
				border={0}
				borderEditable={false}
				minHeight={'20px'}
				minWidth={'50px'}
				maxWidth={'700px'}
				maxHeight={'500px'}
				defaultHeight={'100px'}
				defaultWidth={'100px'}
				menu={
					<>
						{/* Border Settings */}
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconBorderStyle size={22}></IconBorderStyle>
									<p className='font-bold my-auto'>Borders</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto  p-2 '>
									<p className='p-2 my-auto'>Radius:</p>
									<Range
										className='my-auto'
										color='primary'
										onChange={(ev) =>
											setBorderRadious(ev.target.value as unknown as number)
										}
										value={borderRadious}
										max={'22'}
									></Range>
								</div>
							</div>
						</CustomCollapse>

						{/* Image Settings */}
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
						</CustomCollapse>
					</>
				}
			>
				<img
					style={{ borderRadius: borderRadious + 'px' }}
					className={`flex flex-auto h-full w-full rounded-3xl `}
					src={src}
				></img>
			</ControlTemplate>
		</>
	);
};
