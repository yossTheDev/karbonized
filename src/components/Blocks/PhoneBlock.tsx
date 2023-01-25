import {
	IconBorderStyle,
	IconDeviceMobile,
	IconPhoto,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { FileInput, Range } from 'react-daisyui';
import karbonized from '../../assets/karbonized.svg';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';

export const PhoneBlock: React.FC = () => {
	/* Component States */
	const [src, setSrc] = useState(karbonized);
	const [notchWidth, setNotchWidth] = useState(100);
	const [screenRadius, setScreenRadius] = useState(20);
	const [phoneRadius, setPhoneRadius] = useState(30);

	return (
		<>
			<ControlTemplate
				border={0}
				borderEditable={false}
				minHeight={'470px'}
				minWidth={'280px'}
				maxWidth={'1000px'}
				maxHeight={'2000px'}
				defaultHeight={'538px'}
				defaultWidth={'280px'}
				menu={
					<>
						{/* Border Settings */}
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconBorderStyle></IconBorderStyle>
									<p className='my-auto'>Borders</p>
								</div>
							}
						>
							{/* Phone Radius */}
							<div className='flex flex-auto p-2 text-xs '>
								<p className='p-2 my-auto'>Phone Radius:</p>
								<Range
									className='my-auto'
									color='primary'
									onChange={(ev) =>
										setPhoneRadius(ev.target.value as unknown as number)
									}
									value={phoneRadius}
									max={'130'}
								></Range>
							</div>

							{/* Screen Radius*/}
							<div className='flex flex-auto p-2 text-xs '>
								<p className='p-2 my-auto'>Screen Radius:</p>
								<Range
									className='my-auto'
									color='primary'
									onChange={(ev) =>
										setScreenRadius(ev.target.value as unknown as number)
									}
									value={screenRadius}
									max={'130'}
								></Range>
							</div>
						</CustomCollapse>

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
				<div
					style={{ borderRadius: phoneRadius + 'px' }}
					className='flex flex-auto flex-col bg-black p-3 select-none'
				>
					<img
						style={{ borderRadius: screenRadius + 'px' }}
						className='flex flex-auto h-56 bg-slate-700 max-w-full max-h-full select-none'
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
