import { IconLetterT } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Button, ButtonGroup, Input } from 'react-daisyui';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { NumberInput } from '../CustomControls/NumberInput';
import { ControlTemplate } from './ControlTemplate';

export const TextControl: React.FC = () => {
	/* Component States */
	const [text, setText] = useState('lorem');
	const [color, setColor] = useState('#f3f4f6');
	const [textSize, setTextSize] = useState('24');
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);

	return (
		<>
			<withControlTemplate
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
								<div className='m-2 flex flex-row gap-2'>
									<IconLetterT></IconLetterT>
									<p className='my-auto'>Text</p>
								</div>
							}
						>
							<p>Text Style</p>
							{/* Text */}
							<ButtonGroup className='mx-auto flex w-full flex-auto'>
								<Button
									active={isBold}
									onClick={() => setIsBold(!isBold)}
									className='flex flex-auto font-bold'
								>
									B
								</Button>
								<Button
									active={isItalic}
									onClick={() => setIsItalic(!isItalic)}
									className='flex flex-auto italic'
								>
									I
								</Button>
								<Button
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
									className='ml-2 flex flex-auto'
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
						isBold && 'font-bold'
					} ${isItalic && 'italic'} ${isUnderline && 'underline'}`}
				>
					{text}
				</p>
			</withControlTemplate>
		</>
	);
};

export default TextControl;
