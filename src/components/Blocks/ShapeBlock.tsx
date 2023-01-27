import { IconHexagon } from '@tabler/icons-react';
import React, { useState } from 'react';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import {
	ArrowSvg,
	LineSvg,
	OvalSvg,
	PoligonSvg,
	RectangleSvg,
	StarSvg,
	Trianglevg,
} from '../General/Icons';
import { ColorPicker } from '../CustomControls/ColorPicker';

import { ShapeHandler } from './ShapeHandler';

export const ShapeBlock: React.FC = () => {
	/* Component States */
	const [color, setColor] = useState('#f3f4f6');
	const [shape, setShape] = useState('oval');

	return (
		<>
			<ControlTemplate
				borderEditable={false}
				maskEditable={false}
				defaultHeight='120px'
				defaultWidth='120px'
				minHeight={'50px'}
				minWidth={'50px'}
				maxWidth={'2000px'}
				maxHeight={'2000px'}
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
							{/* Select Shape */}
							<div className='flex flex-auto flex-row flex-wrap gap-0.5'>
								<div
									onClick={() => setShape('arrow')}
									className='h-12 p-2 bg-base-100 rounded hover:bg-base-200 cursor-pointer flex flex-auto'
								>
									<ArrowSvg className='flex flex-auto h-full w-full dark:fill-white'></ArrowSvg>
								</div>

								<div
									onClick={() => setShape('oval')}
									className='h-12 p-2 bg-base-100 rounded hover:bg-base-200 cursor-pointer flex flex-auto'
								>
									<OvalSvg className='flex flex-auto h-full w-full dark:fill-white'></OvalSvg>
								</div>

								<div
									onClick={() => setShape('star')}
									className='h-12 p-2 bg-base-100 rounded hover:bg-base-200 cursor-pointer flex flex-auto'
								>
									<StarSvg className='flex flex-auto h-full w-full dark:fill-white'></StarSvg>
								</div>

								<div
									onClick={() => setShape('poligon')}
									className='h-12 p-2 bg-base-100 rounded hover:bg-base-200 cursor-pointer flex flex-auto'
								>
									<PoligonSvg className='flex flex-auto h-full w-full dark:fill-white'></PoligonSvg>
								</div>

								<div
									onClick={() => setShape('triangle')}
									className='h-12 p-2 bg-base-100 rounded hover:bg-base-200 cursor-pointer flex flex-auto'
								>
									<Trianglevg className='flex flex-auto h-full w-full dark:fill-white'></Trianglevg>
								</div>

								<div
									onClick={() => setShape('rectangle')}
									className='h-12 p-2 bg-base-100 rounded hover:bg-base-200 cursor-pointer flex flex-auto'
								>
									<RectangleSvg className='flex flex-auto h-full w-full dark:fill-white'></RectangleSvg>
								</div>

								<div
									onClick={() => setShape('line')}
									className='h-12 p-2 bg-base-100 rounded hover:bg-base-200 cursor-pointer w-9 flex flex-auto'
								>
									<LineSvg className='flex flex-auto h-full w-full stroke-black dark:stroke-white'></LineSvg>
								</div>
							</div>

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
				<ShapeHandler color={color} type={shape}></ShapeHandler>
			</ControlTemplate>
		</>
	);
};
