import { IconHexagon } from '@tabler/icons';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { ArrowSvg } from '../General/Icons';

export const ArrowBlock: React.FC = () => {
	/* Component States */
	const [text, setText] = useState('lorem');
	const [color, setColor] = useState('#f3f4f6');
	const [textSize, setTextSize] = useState('24');
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);

	return (
		<>
			<ControlTemplate
				borderEditable={false}
				shadowEditable={false}
				maskEditable={false}
				defaultHeight='45px'
				defaultWidth='85px'
				minHeight={'50px'}
				minWidth={'50px'}
				maxWidth={'500px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconHexagon></IconHexagon>
									<p className='my-auto'>Shape</p>
								</div>
							}
						>
							<p>Color</p>
							<HexColorPicker
								color={color}
								onChange={setColor}
								className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
							></HexColorPicker>
						</CustomCollapse>
					</>
				}
			>
				<ArrowSvg
					style={{ fill: color }}
					className='flex flex-auto w-full h-full'
				></ArrowSvg>
			</ControlTemplate>
		</>
	);
};
