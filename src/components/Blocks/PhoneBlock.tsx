import {
	IconBattery3,
	IconBorderStyle,
	IconCellSignal1,
	IconDeviceMobile,
	IconPalette,
	IconSignal4g,
	IconWifi,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { Button, Checkbox, FileInput, Modal, Range } from 'react-daisyui';
import karbonized from '../../assets/logo.svg';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { useControlState } from '../../hooks/useControlState';

/* Devices Mockups */
import iphoneX from '../../assets/device_mockups/iphonex.png';
import iphone14pro from '../../assets/device_mockups/iphone14pro.png';
import iphone14 from '../../assets/device_mockups/iphone14.png';
import pixel5 from '../../assets/device_mockups/google_pixel5.png';
import pixel4 from '../../assets/device_mockups/google_pixel4.png';
import galaxyS10 from '../../assets/device_mockups/galaxyS10.png';
import galaxyS20 from '../../assets/device_mockups/galaxyS20.png';
import galaxyNote10 from '../../assets/device_mockups/galaxy_note10.png';

import { Portal } from 'react-portal';

interface Props {
	id: string;
}

interface Device {
	name: models;
	img: string;
}

const devices: Device[] = [
	{ name: 'iPhone X', img: iphoneX },
	{ name: 'iPhone 14', img: iphone14 },
	{ name: 'iPhone 14 Pro', img: iphone14pro },
	{ name: 'Google Pixel 4', img: pixel4 },
	{ name: 'Google Pixel 5', img: pixel5 },
	{ name: 'Samsung Galaxy S10', img: galaxyS10 },
	{ name: 'Samsung Galaxy S20', img: galaxyS20 },
	{ name: 'Samsung Galaxy Note 10', img: galaxyNote10 },
];

type models =
	| 'adaptive'
	| 'iPhone X'
	| 'iPhone 14'
	| 'iPhone 14 Pro'
	| 'Google Pixel 4'
	| 'Google Pixel 5'
	| 'Samsung Galaxy S10'
	| 'Samsung Galaxy S20'
	| 'Samsung Galaxy Note 10';

export const PhoneBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [showModal, setShowModal] = useState(false);

	const [template, setTemplate] = useControlState(
		'iPhone 14',
		`${id}-device_model`,
	);

	const [src, setSrc] = useControlState(karbonized, `${id}-src`);
	const [notchWidth, setNotchWidth] = useControlState(80, `${id}-notchWidth`);
	const [screenRadius, setScreenRadius] = useControlState(
		20,
		`${id}-screenRadius`,
	);
	const [phoneRadius, setPhoneRadius] = useControlState(
		30,
		`${id}-phoneRadius`,
	);
	const [borderColor, setBorderColor] = useControlState(
		'#b4b4b4',
		`${id}-borderColor`,
	);
	const [statusColor, setStatusColor] = useControlState(
		'#FFFFFF',
		`${id}-statusColor`,
	);
	const [statusControlsColor, setStatusControlsColor] = useControlState(
		'#000000',
		`${id}-statusControlsColor`,
	);

	const [drop, setDrop] = useControlState(false, `${id}-drop`);

	return (
		<>
			<ControlTemplate
				id={id}
				border={0}
				borderEditable={false}
				minHeight={'618px'}
				minWidth={'318px'}
				maxWidth={template === 'adaptive' ? '1000px' : '318px'}
				maxHeight={template === 'adaptive' ? '2000px' : '618px'}
				defaultHeight={'620px'}
				defaultWidth={'320px'}
				menu={
					<>
						{/* Border Settings */}
						<CustomCollapse
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconBorderStyle></IconBorderStyle>
									<p className='my-auto'>Borders</p>
								</div>
							}
						>
							{/* Phone Radius */}
							<div className='flex flex-auto p-2 text-xs '>
								<p className='my-auto p-2'>Phone Radius:</p>
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
								<p className='my-auto p-2'>Screen Radius:</p>
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
								<div className='m-2 flex flex-row gap-2'>
									<IconPalette size={22}></IconPalette>
									<p className='my-auto font-bold'>Colors</p>
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

						{/* Device Settings */}
						<CustomCollapse
							isOpen
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconDeviceMobile></IconDeviceMobile>
									<p className='my-auto'>Phone Mockup</p>
								</div>
							}
						>
							{/* Device */}
							<label className='my-auto text-xs'>Device</label>
							<button
								onClick={() => {
									setShowModal(true);
								}}
								className='btn h-20 cursor-pointer rounded-2xl border-none bg-base-300 p-4 hover:bg-neutral'
							>
								<div className='flex gap-2'>
									<img
										className='mx-auto my-auto flex h-10 flex-auto shadow-2xl'
										src={
											devices.find((item) => item.name === template)?.img ??
											iphone14
										}
									></img>

									<p className='my-auto cursor-pointer'>
										{devices.find((item) => item.name === template)?.name}
									</p>
								</div>
							</button>

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

							{template === 'adaptive' && (
								<>
									{/* Notch Witdh */}
									<div className='flex flex-auto p-2 text-xs '>
										<p className='my-auto p-2'>Notch Width:</p>
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
								</>
							)}
						</CustomCollapse>
					</>
				}
			>
				<div className='relative flex flex-auto flex-col'>
					{/* Adaptive Model */}
					{template === 'adaptive' && (
						<>
							<div className='flex flex-auto flex-row'>
								<div
									style={{
										borderRadius: phoneRadius + 'px',
										borderColor: borderColor,
									}}
									className='flex flex-auto select-none flex-col border-4 bg-black p-3'
								>
									{/* Status Bar */}
									<div
										style={{
											borderTopLeftRadius: screenRadius + 'px',
											borderTopRightRadius: screenRadius + 'px',
											backgroundColor: statusColor,
										}}
										className='flex max-h-9 flex-auto overflow-hidden border-0'
									>
										<div
											style={{ color: statusControlsColor }}
											className='my-auto flex flex-auto  p-1'
										>
											<p className='my-auto ml-3 text-xs font-bold'>20:02</p>

											<div className='ml-auto mr-3 flex flex-row '>
												<IconWifi
													className='flex flex-auto'
													size={18}
												></IconWifi>
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
										className='flex h-56 max-h-full max-w-full flex-auto select-none bg-white'
										src={src}
									></img>

									{/* Notch */}
									<div
										style={{ width: 'calc(100% - 2.5rem)' }}
										className='absolute flex flex-auto'
									>
										<div
											style={{
												borderTopLeftRadius: drop ? '0px' : '9999px',
												borderTopRightRadius: drop ? '0px' : '9999px',
												width: notchWidth + 'px',
												marginTop: drop ? '-1px' : '2px',
											}}
											className='mx-auto flex rounded-full bg-black p-4'
										></div>
									</div>
								</div>

								{/* Buttons */}
								<div
									style={{ marginLeft: '-12px', maxWidth: '12px' }}
									className='mt-32 flex h-16  flex-auto rounded bg-black p-1'
								></div>
							</div>

							{/* Buttons */}
							<div
								style={{ marginTop: '-7px' }}
								className='ml-20 flex h-1 max-h-1 w-6 flex-auto   rounded bg-black p-1'
							></div>
						</>
					)}

					{/* iPhone X */}
					{template === 'iPhone X' && (
						<>
							<div className='absolute flex h-full w-full px-7 pb-6 pt-10'>
								<div className='mx-auto flex h-full w-full overflow-hidden rounded-[2rem]'>
									<img
										className='mx-auto my-auto h-full w-full bg-white'
										src={src}
									></img>
								</div>
							</div>

							<img className='absolute' src={iphoneX}></img>
						</>
					)}

					{/* iPhone 14 Pro */}
					{template === 'iPhone 14 Pro' && (
						<>
							<div className='absolute flex h-full w-full px-6 pb-11 pt-8'>
								<div className='mx-auto flex h-full w-full overflow-hidden rounded-[2rem]'>
									<img
										className='mask mx-auto my-auto h-full w-full bg-white'
										src={src}
									></img>
								</div>
							</div>

							<img className='mask absolute' src={iphone14pro}></img>
						</>
					)}

					{/* iPhone 14  */}
					{template === 'iPhone 14' && (
						<>
							<div className='h-full w-full px-6 pb-11 pt-8'>
								<div className='mx-auto flex h-full w-full overflow-hidden rounded-[2rem]'>
									<img
										className='mx-auto my-auto h-[34rem] max-h-full w-full bg-white'
										src={src}
									></img>
								</div>
							</div>

							<img
								id='masked-iphone'
								className='absolute flex flex-auto'
								src={iphone14}
							></img>
						</>
					)}

					{/* Google Pixel 5  */}
					{template === 'Google Pixel 5' && (
						<>
							<div className='h-full w-full px-10 pb-16 pt-8'>
								<div className='mx-auto flex h-full w-full overflow-hidden rounded-[2rem]'>
									<img
										className='mask mx-auto my-auto flex h-[31.5rem] w-full bg-white'
										src={src}
									></img>
								</div>
							</div>

							<img className='mask absolute flex flex-auto' src={pixel5}></img>
						</>
					)}

					{/* Google Pixel 4 */}
					{template === 'Google Pixel 4' && (
						<>
							<div className='h-full w-full px-4 pb-0 pt-12'>
								<div className='mx-auto flex h-full w-full overflow-hidden rounded-[2rem]'>
									<img
										className='mask mx-auto my-auto flex h-[36rem] w-full bg-white'
										src={src}
									></img>
								</div>
							</div>

							<img className='mask absolute flex flex-auto' src={pixel4}></img>
						</>
					)}

					{/* Samsung Galaxy S10 */}
					{template === 'Samsung Galaxy S10' && (
						<>
							<div className='h-full w-full px-4 pb-0 pt-7'>
								<div className='mx-auto flex h-full w-full overflow-hidden rounded-[1rem]'>
									<img
										className='mask mx-auto my-auto flex h-[37rem] w-full bg-white'
										src={src}
									></img>
								</div>
							</div>

							<img className=' absolute flex flex-auto' src={galaxyS10}></img>
						</>
					)}

					{/* Samsung Galaxy S20 */}
					{template === 'Samsung Galaxy S20' && (
						<>
							<div className='h-full w-full px-9 pb-7 pt-8'>
								<div className='mx-auto flex h-full w-full overflow-hidden rounded-[1rem]'>
									<img
										className='mask mx-auto my-auto h-full w-full bg-white'
										src={src}
									></img>
								</div>
							</div>

							<img className='absolute flex flex-auto' src={galaxyS20}></img>
						</>
					)}

					{/* Samsung Galaxy Note 10 */}
					{template === 'Samsung Galaxy Note 10' && (
						<>
							<div className='h-full w-full px-5 pb-6 pt-6'>
								<div className='mx-auto flex h-full w-full overflow-hidden rounded-[1rem]'>
									<img
										className='mask mx-auto my-auto flex h-[35.5rem] w-full bg-white'
										src={src}
									></img>
								</div>
							</div>

							<img className='absolute flex flex-auto' src={galaxyNote10}></img>
						</>
					)}
				</div>
			</ControlTemplate>

			{showModal && (
				<Portal>
					<Modal.Legacy
						open
						onClickBackdrop={() => setShowModal(false)}
						className='overflow-hidden bg-base-200'
					>
						<Modal.Header className='font-bold dark:text-white'>
							<label className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
								Devices
							</label>
						</Modal.Header>

						<Modal.Body className='flex flex-auto select-none flex-col overflow-hidden'>
							{/* Devices List */}
							<div className='mx-auto flex max-h-80 flex-auto flex-wrap gap-3 overflow-auto '>
								{devices.map((item) => (
									<div className='flex w-32 flex-auto flex-col'>
										<button
											onClick={() => setTemplate(item.name)}
											className='btn h-28 rounded-2xl bg-base-300 p-3'
										>
											<img
												className='mx-auto flex h-full '
												src={item.img}
											></img>
										</button>
										<p className='mx-auto'>{item.name}</p>
									</div>
								))}
							</div>
						</Modal.Body>

						<Modal.Actions>
							<Button onClick={() => setShowModal(false)}>Cancel</Button>
						</Modal.Actions>
					</Modal.Legacy>
				</Portal>
			)}
		</>
	);
};
export default PhoneBlock;
