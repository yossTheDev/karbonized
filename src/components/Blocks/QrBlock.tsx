import { IconPalette, IconQrcode } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { QRCodeSVG } from 'qrcode.react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { ColorPicker } from '../CustomControls/ColorPicker';

export const QrControl: React.FC = () => {
	/* Component States */
	const [text, setText] = useState('karbonized');
	const [backgroundColor, setBackgroundColor] = useState('#1e408400');
	const [foregroundColor, setforegroundColor] = useState('#090c12');

	return (
		<>
			<ControlTemplate
				shadowEditable={false}
				borderEditable={false}
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
							<ColorPicker
								isGradientEnable={false}
								type='HexAlpha'
								color={backgroundColor}
								onColorChange={setBackgroundColor}
								label='Background Color'
							></ColorPicker>

							<ColorPicker
								isGradientEnable={false}
								type='HexAlpha'
								color={foregroundColor}
								onColorChange={setforegroundColor}
								label='Foreground Color'
							></ColorPicker>
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
