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

	/* Component States */
	const scope = {
		id,
		Input,
	};

	return (
		<LiveProvider key={id} noInline scope={scope} code={code}>
			<ControlTemplate
				defaultHeight='50px'
				defaultWidth='50px'
				minHeight={'50px'}
				minWidth={'50px'}
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
								onColorChange={setColor}
								label='Fill Color'
							></ColorPicker>
						</CustomCollapse>
					</>
				}
			>
				<LivePreview
					style={{ color: color }}
					className='flex max-h-full w-full max-w-full flex-auto select-none flex-col '
					id={id}
				></LivePreview>
			</ControlTemplate>
		</LiveProvider>
	);
};

export default CustomBlock;