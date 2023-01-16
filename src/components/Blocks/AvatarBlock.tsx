import { IconLetterT, IconPhoto } from '@tabler/icons';
import React, { useState } from 'react';
import { FileInput } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import example from '../../assets/example-user.png';

export const AvatarBlock: React.FC<{ id: string }> = ({ id }) => {
	/* Component States */

	const [src, setSrc] = useState(example);

	return (
		<>
			<ControlTemplate
				id={id}
				minHeight={'20px'}
				minWidth={'50px'}
				maxWidth={'500px'}
				maxHeight={'500px'}
				defaultHeight={'100px'}
				defaultWidth={'100px'}
				lockAspectRatio
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
						</CustomCollapse>
					</>
				}
			>
				<img
					className={`flex flex-auto h-full w-full rounded-full `}
					src={src}
				></img>
			</ControlTemplate>
		</>
	);
};
