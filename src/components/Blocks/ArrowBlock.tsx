import { IconHexagon } from '@tabler/icons';
import React, { useState } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { ArrowSvg } from '../General/Icons';
import { ColorPicker } from '../CustomControls/ColorPicker';

export const ArrowBlock: React.FC = () => {
	/* Component States */
	const [color, setColor] = useState('#f3f4f6');

	return (
		<>
			<ControlTemplate
				borderEditable={false}
				maskEditable={false}
				defaultHeight='120px'
				defaultWidth='120px'
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
							<ColorPicker
								label='Color'
								isGradientEnable={false}
								color={color}
								onColorChange={(color) => setColor(color)}
							></ColorPicker>
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
