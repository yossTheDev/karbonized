import { IconLetterT } from '@tabler/icons-react';
import React from 'react';
import { Button, ButtonGroup, Input } from 'react-daisyui';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { NumberInput } from '../CustomControls/NumberInput';
import { ControlTemplate } from './ControlTemplate';
import { useControlState } from '../../hooks/useControlState';

interface Props {
	id: string;
}

export const TextControl: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [text, setText] = useControlState('lorem', `${id}-text`);
	const [color, setColor] = useControlState('#f3f4f6', `${id}-color`);
	const [textSize, setTextSize] = useControlState('24', `${id}-textSize`);
	const [isBold, setIsBold] = useControlState(false, `${id}-isBold`);
	const [isItalic, setIsItalic] = useControlState(false, `${id}-isItalic`);
	const [isUnderline, setIsUnderline] = useControlState(
		false,
		`${id}-isUnderline`,
	);

	return (
		<>
			<ControlTemplate
				id={id}
				borderEditable={false}
				defaultHeight='45px'
				defaultWidth='85px'
				minHeight={'20px'}
				minWidth={'50px'}
				maxWidth={'2000px'}
				maxHeight={'2000px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row gap-2'>
									<IconLetterT></IconLetterT>
									<p className='my-auto'>Text</p>
								</div>
							}
						>
							<p>Text Style</p>
							{/* Text */}
							<ButtonGroup className='mx-auto flex w-full flex-auto'>
								<Button
									color='neutral'
									active={isBold}
									onClick={() => setIsBold(!isBold)}
									className='flex flex-auto font-bold'
								>
									B
								</Button>
								<Button
									color='neutral'
									active={isItalic}
									onClick={() => setIsItalic(!isItalic)}
									className='flex flex-auto italic'
								>
									I
								</Button>
								<Button
									color='neutral'
									active={isUnderline}
									onClick={() => setIsUnderline(!isUnderline)}
									className='flex flex-auto underline'
								>
									U
								</Button>
							</ButtonGroup>

							<div className='flex flex-auto flex-row text-xs'>
								<p className='my-auto'>Text</p>

								<Input
									className='ml-2 flex w-full  flex-auto '
									onChange={(ev) => setText(ev.target.value)}
									value={text}
								></Input>
							</div>

							<div className='flex flex-auto flex-row text-xs'>
								<p className='my-auto'>Font Size</p>

								<NumberInput
									onChange={(number) => {
										setTextSize(number.toString());
									}}
									number={parseInt(textSize)}
								></NumberInput>

								<p className='my-auto ml-2'>px</p>
							</div>

							<ColorPicker
								isGradientEnable={false}
								color={color}
								onColorChange={setColor}
								label='Text Color'
							></ColorPicker>
						</CustomCollapse>
					</>
				}
			>
				<p
					style={{ color: color, fontSize: textSize + 'px' }}
					className={`my-auto flex flex-auto select-none overflow-hidden whitespace-pre-wrap hover:border hover:border-blue-500 ${
						isBold && 'poppins-font-family font-bold'
					} ${isItalic && 'italic'} ${isUnderline && 'underline'}`}
				>
					{text}
				</p>
			</ControlTemplate>
		</>
	);
};

export default TextControl;
