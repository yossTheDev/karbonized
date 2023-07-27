import { IconPalette, IconQrcode } from '@tabler/icons-react';
import React, { useId, useState } from 'react';
import { Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { QRCodeSVG } from 'qrcode.react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { useControlState } from '../../hooks/useControlState';

interface Props {
	id: string;
}

export const QrControl: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [text, setText] = useControlState('karbonized', `${id}-text`);
	const [backgroundColor, setBackgroundColor] = useControlState(
		'#1e408400',
		`${id}-backgroundColor`,
	);
	const [foregroundColor, setforegroundColor] = useControlState(
		'#090c12',
		`${id}-foregroundColor`,
	);

	return (
		<>
			<ControlTemplate
				id={id}
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
						{/* Colors Settings */}
						<CustomCollapse
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconPalette size={22}></IconPalette>
									<p className='my-auto font-bold'>Colors</p>
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

						{/* QR Settings */}
						<CustomCollapse
							isOpen
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconQrcode></IconQrcode>
									<p className='my-auto'>QR Settings</p>
								</div>
							}
						>
							<div className='flex flex-auto flex-col gap-2 p-2'>
								<p className='text-xs'>Value</p>
								<Input
									spellCheck={false}
									onChange={(ev) => setText(ev.target.value)}
									value={text}
								></Input>
							</div>
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

export default QrControl;
