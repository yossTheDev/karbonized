import { IconLetterT } from '@tabler/icons-react';
import React from 'react';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { NumberInput } from '../CustomControls/NumberInput';
import { ControlTemplate } from './ControlTemplate';
import { useControlState } from '../../hooks/useControlState';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Type } from 'lucide-react';

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
								<div className='flex items-center gap-2 text-foreground'>
									<Type size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Text</Label>
								</div>
							}
						>
							<Label className='text-xs text-muted-foreground'>
								Text Style
							</Label>
							{/* Text */}
							<div className='mx-auto flex w-full gap-2'>
								<Button
									variant={isBold ? 'default' : 'outline'}
									size='icon'
									className='flex-1 transition-all duration-200 hover:scale-105'
									onClick={() => {
										setIsBold(!isBold);
									}}
								>
									B
								</Button>
								<Button
									variant={isItalic ? 'default' : 'outline'}
									size='icon'
									className='flex-1 transition-all duration-200 hover:scale-105'
									onClick={() => {
										setIsItalic(!isItalic);
									}}
								>
									I
								</Button>
								<Button
									variant={isUnderline ? 'default' : 'outline'}
									size='icon'
									className='flex-1 transition-all duration-200 hover:scale-105'
									onClick={() => {
										setIsUnderline(!isUnderline);
									}}
								>
									U
								</Button>
							</div>

							<div className='flex flex-auto flex-row text-xs'>
								<Label className='my-auto text-xs text-muted-foreground'>
									Text
								</Label>
								<Input
									className='ml-2 h-8 flex w-full flex-auto text-sm'
									onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
										setText(ev.target.value);
									}}
									value={text}
								></Input>
							</div>

							<div className='flex flex-auto flex-row text-xs'>
								<Label className='my-auto text-xs text-muted-foreground'>
									Font Size
								</Label>
								<NumberInput
									onChange={(number) => {
										setTextSize(number.toString());
									}}
									number={parseInt(textSize)}
								></NumberInput>
								<Label className='my-auto ml-2 text-xs text-muted-foreground'>
									px
								</Label>
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
					style={{ color, fontSize: textSize + 'px' }}
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
