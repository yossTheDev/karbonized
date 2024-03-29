import { IconBorderStyle, IconPhoto } from '@tabler/icons-react';
import React, { useId, useState } from 'react';
import { FileInput, Range } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/logo.svg';
import { useControlState } from '../../hooks/useControlState';

interface Props {
	id: string;
}

export const ImageBlock: React.FC<Props> = ({ id }) => {
	/* Component States */

	const [src, setSrc] = useControlState(karbonized, `${id}-src`);
	const [borderRadius, setBorderRadius] = useControlState(
		3,
		`${id}-borderRadius`,
	);

	return (
		<>
			<ControlTemplate
				id={id}
				border={0}
				borderEditable={false}
				minHeight={'50px'}
				minWidth={'50px'}
				maxWidth={'5000px'}
				maxHeight={'5000px'}
				defaultHeight={'100px'}
				defaultWidth={'100px'}
				menu={
					<>
						{/* Border Settings */}
						<CustomCollapse
							menu={
								<div className='flex flex-row gap-2'>
									<IconBorderStyle size={22}></IconBorderStyle>
									<p className='my-auto font-bold'>Borders</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto  p-2 '>
									<p className='my-auto p-2'>Radius:</p>
									<Range
										className='my-auto'
										color='primary'
										onChange={(ev) =>
											setBorderRadius(ev.target.value as unknown as number)
										}
										value={borderRadius}
										max={'22'}
									></Range>
								</div>
							</div>
						</CustomCollapse>

						{/* Image Settings */}
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row gap-2'>
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
					style={{ borderRadius: borderRadius + 'px' }}
					className={`flex h-full w-full flex-auto select-none rounded-3xl `}
					src={src}
				></img>
			</ControlTemplate>
		</>
	);
};
export default ImageBlock;
