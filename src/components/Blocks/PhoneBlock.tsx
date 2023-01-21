import { IconDeviceMobile, IconPhoto } from '@tabler/icons';
import React, { useState } from 'react';
import { FileInput, Range, PhoneMockup } from 'react-daisyui';
import karbonized from '../../assets/karbonized.svg';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';

export const PhoneBlock: React.FC = () => {
	/* Component States */
	const [src, setSrc] = useState(karbonized);
	const [notchWidth, setNotchWidth] = useState(100);

	return (
		<>
			<ControlTemplate
				border={0}
				borderEditable={false}
				minHeight={'470px'}
				minWidth={'280px'}
				maxWidth={'500px'}
				maxHeight={'1300px'}
				defaultHeight={'100px'}
				defaultWidth={'100px'}
				menu={
					<>
						{/* Image Settings */}
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconDeviceMobile></IconDeviceMobile>
									<p className='my-auto'>Phone Mockup</p>
								</div>
							}
						>
							{/* Source */}
							<>
								<p>Image</p>
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

							{/* Notch Witdh */}
							<div className='flex flex-auto p-2 text-xs '>
								<p className='p-2 my-auto'>Notch Width:</p>
								<Range
									className='my-auto'
									color='primary'
									onChange={(ev) =>
										setNotchWidth(ev.target.value as unknown as number)
									}
									value={notchWidth}
									min={'20'}
									max={'130'}
								></Range>
							</div>
						</CustomCollapse>
					</>
				}
			>
				<div className='flex flex-auto flex-col bg-black p-3 rounded-3xl select-none'>
					<img
						className='flex flex-auto rounded-2xl h-56 bg-slate-700 max-w-full max-h-full select-none'
						src={src}
					></img>

					<div
						style={{ width: 'calc(100% - 1.65rem)' }}
						className='flex flex-auto p-2 absolute'
					>
						<div
							style={{ width: notchWidth + 'px' }}
							className='bg-black mx-auto p-4 w-28 rounded-full flex'
						></div>
					</div>
				</div>
			</ControlTemplate>
		</>
	);
};
