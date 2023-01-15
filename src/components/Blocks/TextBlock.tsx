import { IconLetterT } from '@tabler/icons';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button, ButtonGroup, Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';

export const TextControl: React.FC<{ id: string }> = ({ id }) => {
	/* Component States */
	const [text, setText] = useState('hello');
	const [color, setColor] = useState('#f3f4f6');
	const [textSize, setTextSize] = useState('24');
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);

	return (
		<>
			<ControlTemplate
				id={id}
				minHeight={'20px'}
				minWidth={'50px'}
				maxWidth={'500px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconLetterT></IconLetterT>
									<p className='my-auto'>Text</p>
								</div>
							}
						>
							<p>Text Style</p>
							{/* Text */}
							<ButtonGroup className='flex flex-auto mx-auto'>
								<Button
									active={isBold}
									onClick={() => setIsBold(!isBold)}
									className='font-bold'
								>
									B
								</Button>
								<Button
									active={isItalic}
									onClick={() => setIsItalic(!isItalic)}
									className='italic'
								>
									I
								</Button>
								<Button
									active={isUnderline}
									onClick={() => setIsUnderline(!isUnderline)}
									className='underline'
								>
									U
								</Button>
							</ButtonGroup>

							<p>Value</p>
							<Input
								onChange={(ev) => setText(ev.target.value)}
								value={text}
							></Input>

							<p>Font Size</p>
							<div className='flex flex-row flex-auto'>
								<Input
									onChange={(ev) => setTextSize(ev.target.value)}
									value={textSize}
									className=' w-24'
								></Input>
								<p className='my-auto ml-2'>px</p>
							</div>

							<p>Text Color</p>
							<HexColorPicker
								color={color}
								onChange={setColor}
								className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
							></HexColorPicker>
						</CustomCollapse>
					</>
				}
			>
				<p
					style={{ color: color, fontSize: textSize + 'px' }}
					className={`my-auto flex flex-auto whitespace-pre-wrap overflow-hidden hover:border-blue-500 hover:border ${
						isBold && 'font-bold'
					} ${isItalic && 'italic'} ${isUnderline && 'underline'}`}
				>
					{text}
				</p>
			</ControlTemplate>
		</>
	);
};
