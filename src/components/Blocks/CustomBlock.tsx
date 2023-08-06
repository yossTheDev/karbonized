import React from 'react';
import { Input } from 'react-daisyui';
import { ControlTemplate } from './ControlTemplate';
import { useControlState } from '../../hooks/useControlState';
import { LivePreview, LiveProvider } from 'react-live';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { IconPalette } from '@tabler/icons-react';
import { ColorPicker } from '../CustomControls/ColorPicker';

interface Props {
	id: string;
}

export const CustomBlock: React.FC<Props> = ({ id }) => {
	const [code, setCode] = useControlState('', `${id}-code`);
	const [color, setColor] = useControlState('#f3f4f6', `${id}-fill_color`);
	const [bgcolor, setBgColor] = useControlState('#111a2600', `${id}-bg_color`);

	/* Component States */
	const scope = {
		id,
		Input,
	};

	return (
		<LiveProvider key={id} noInline scope={scope} code={code}>
			<ControlTemplate
				defaultHeight='80px'
				defaultWidth='80px'
				minHeight={'10px'}
				minWidth={'10px'}
				maxWidth={'2000px'}
				maxHeight={'2000px'}
				id={id}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconPalette></IconPalette>
									<p className='my-auto'>Colors</p>
								</div>
							}
						>
							<ColorPicker
								isGradientEnable={false}
								color={color}
								type='HexAlpha'
								onColorChange={setColor}
								label='Fill Color'
							></ColorPicker>

							<ColorPicker
								isGradientEnable={false}
								type='HexAlpha'
								color={bgcolor}
								onColorChange={setBgColor}
								label='Background Color'
							></ColorPicker>
						</CustomCollapse>
					</>
				}
			>
				<LivePreview
					style={{ color: color, background: bgcolor }}
					className='mx-auto flex h-full w-full flex-auto select-none'
					id={id}
				></LivePreview>
			</ControlTemplate>
		</LiveProvider>
	);
};

export default CustomBlock;
