import { IconPalette, IconQrcode } from '@tabler/icons';
import React, { useState } from 'react';
import { Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { QRCodeSVG } from 'qrcode.react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';

export const QrControl: React.FC<{ id: string }> = ({ id }) => {
	/* Component States */
	const [text, setText] = useState('karbonized');
	const [backgroundColor, setBackgroundColor] = useState('#1e408400');
	const [foregroundColor, setforegroundColor] = useState('#090c12');

	return (
		<>
			<ControlTemplate
				id={id}
				defaultHeight='50px'
				defaultWidth='50px'
				minHeight={'50px'}
				minWidth={'100px'}
				maxWidth={'100px'}
				maxHeight={'100px'}
				menu={
					<>
						{/* QR Settings */}

						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconQrcode></IconQrcode>
									<p className='my-auto'>QR Settings</p>
								</div>
							}
						>
							<p>Value</p>
							<Input
								onChange={(ev) => setText(ev.target.value)}
								value={text}
							></Input>
						</CustomCollapse>

						{/* Colors Settings */}
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconPalette size={22}></IconPalette>
									<p className='font-bold my-auto'>Colors</p>
								</div>
							}
						>
							<p>Background Color</p>
							<HexAlphaColorPicker
								color={backgroundColor}
								onChange={setBackgroundColor}
								className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
							></HexAlphaColorPicker>

							<p>Foreground Color</p>
							<HexColorPicker
								color={foregroundColor}
								onChange={setforegroundColor}
								className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
							></HexColorPicker>
						</CustomCollapse>
					</>
				}
			>
				<QRCodeSVG
					bgColor={backgroundColor}
					fgColor={foregroundColor}
					size={100}
					className='flex flex-auto'
					value={text}
				></QRCodeSVG>
			</ControlTemplate>
		</>
	);
};
