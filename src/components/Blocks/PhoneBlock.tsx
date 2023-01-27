import {
	IconBattery,
	IconBattery3,
	IconBorderStyle,
	IconCellSignal1,
	IconDeviceMobile,
	IconPalette,
	IconPhoto,
	IconSignal4g,
	IconWifi,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { Checkbox, FileInput, Range } from 'react-daisyui';
import karbonized from '../../assets/karbonized.svg';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';

export const PhoneBlock: React.FC = () => {
	/* Component States */
	const [src, setSrc] = useState(karbonized);
	const [notchWidth, setNotchWidth] = useState(80);
	const [screenRadius, setScreenRadius] = useState(20);
	const [phoneRadius, setPhoneRadius] = useState(30);
	const [borderColor, setBorderColor] = useState('#b4b4b4');
	const [statusColor, setStatusColor] = useState('#FFFFFF');
	const [statusControlsColor, setStatusControlsColor] = useState('#000000');

	const [drop, setDrop] = useState(false);

	return (
		<>
			<ControlTemplate
				border={0}
				borderEditable={false}
				minHeight={'618px'}
				minWidth={'318px'}
				maxWidth={'1000px'}
				maxHeight={'2000px'}
				defaultHeight={'620px'}
				defaultWidth={'320px'}
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
									max={'30'}
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
									max={'30'}
								></Range>
							</div>
						</CustomCollapse>

						{/* Color Options */}
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconPalette size={22}></IconPalette>
									<p className='font-bold my-auto'>Colors</p>
								</div>
							}
						>
							{/* Show Line Numbers */}
							<div className='flex flex-auto flex-col p-2'>
								<ColorPicker
									color={borderColor}
									onColorChange={setBorderColor}
									isGradientEnable={false}
									label='Border Color'
								></ColorPicker>

								<ColorPicker
									color={statusColor}
									onColorChange={setStatusColor}
									isGradientEnable={false}
									label='Status Bar Color'
								></ColorPicker>

								<ColorPicker
									color={statusControlsColor}
									onColorChange={setStatusControlsColor}
									isGradientEnable={false}
									label='Icons Color'
								></ColorPicker>
							</div>
						</CustomCollapse>

						{/* Phone Settings */}
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

							{/* Drop Design */}
							<div className='flex flex-col p-5'>
								<div className='flex flex-row gap-2'>
									<p className='my-auto text-xs'>Drop</p>
									<Checkbox
										color='primary'
										onChange={(ev) => setDrop(ev.currentTarget.checked)}
										checked={drop}
									></Checkbox>
								</div>
							</div>
						</CustomCollapse>
					</>
				}
			>
				<div className='flex flex-auto flex-col'>
					<div className='flex flex-auto flex-row'>
						<div
							style={{
								borderRadius: phoneRadius + 'px',
								borderColor: borderColor,
							}}
							className='flex flex-auto flex-col bg-black p-3 select-none border-4'
						>
							{/* Status Bar */}
							<div
								style={{
									borderTopLeftRadius: screenRadius + 'px',
									borderTopRightRadius: screenRadius + 'px',
									backgroundColor: statusColor,
								}}
								className='flex flex-auto max-h-9 border-0 overflow-hidden'
							>
								<div
									style={{ color: statusControlsColor }}
									className='flex flex-auto my-auto  p-1'
								>
									<p className='ml-3 font-bold text-xs my-auto'>20:02</p>

									<div className='ml-auto mr-3 flex flex-row '>
										<IconWifi className='flex flex-auto' size={18}></IconWifi>
										<IconSignal4g
											className='flex flex-auto'
											size={18}
										></IconSignal4g>
										<IconCellSignal1
											className='flex flex-auto'
											size={18}
										></IconCellSignal1>
										<IconBattery3
											className='flex flex-auto'
											size={18}
										></IconBattery3>
									</div>
								</div>
							</div>

							{/* Image */}
							<img
								style={{
									marginTop: '-8px',
									borderBottomLeftRadius: screenRadius + 'px',
									borderBottomRightRadius: screenRadius + 'px',
								}}
								className='flex flex-auto h-56 bg-white max-w-full max-h-full select-none'
								src={src}
							></img>

							{/* Notch */}
							<div
								style={{ width: 'calc(100% - 2.5rem)' }}
								className='flex flex-auto absolute'
							>
								<div
									style={{
										borderTopLeftRadius: drop ? '0px' : '9999px',
										borderTopRightRadius: drop ? '0px' : '9999px',
										width: notchWidth + 'px',
										marginTop: drop ? '-1px' : '2px',
									}}
									className='bg-black mx-auto p-4 rounded-full flex'
								></div>
							</div>
						</div>

						{/* Buttons */}
						<div
							style={{ marginLeft: '-12px', maxWidth: '12px' }}
							className='p-1 bg-black h-16  rounded mt-32 flex flex-auto'
						></div>
					</div>

					{/* Buttons */}
					<div
						style={{ marginTop: '-7px' }}
						className='p-1 bg-black h-1 max-h-1 w-6 ml-20   rounded flex flex-auto'
					></div>
				</div>
			</ControlTemplate>
		</>
	);
};
