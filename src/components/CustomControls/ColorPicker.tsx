import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import React, { useState } from 'react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { Input } from 'react-daisyui';
import { Portal } from 'react-portal';
import { useScreenDirection } from '../../hooks/useScreenDirection';

interface Props {
	type?: 'HexAlpha' | 'Hex';
	label?: string;
	color?: string;
	onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<Props> = ({
	type = 'Hex',
	label = 'color',
	color = '#5895c8',
	onColorChange,
}) => {
	/* Compomnent Store */
	const [showColor, setShowColor] = useState(false);
	const isHorizontal = useScreenDirection();
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(isHorizontal ? 12 : 2), flip(), shift()],
		placement: isHorizontal ? 'left' : 'top',
	});
	return (
		<>
			<div
				onMouseDown={() => {
					setShowColor(!showColor);
				}}
				ref={reference}
				className='flex flex-col flex-auto'
			>
				<div className='flex flex-auto flex-row py-2 rounded hover:bg-base-100'>
					<p className='my-auto ml-2 select-none mr-2 text-xs text-left'>
						{label}
					</p>

					<div className='flex flex-row ml-auto mr-2'>
						<div
							className='p-4 rounded my-auto border-2 border-base-100'
							style={{ backgroundColor: color }}
						></div>
						<Input
							spellCheck={false}
							onInput={(ev) => onColorChange(ev.currentTarget.value)}
							className='flex flex-auto w-24 my-auto ml-2'
							value={color}
						></Input>
					</div>
				</div>
			</div>

			{/* Tooltip */}
			{showColor && (
				<Portal>
					<div
						onMouseEnter={() => setShowColor(true)}
						onMouseLeave={() => setShowColor(false)}
						className='z-40'
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
					>
						<div className='flex flex-auto flex-col w-60 p-4 bg-base-100 shadow-2xl rounded-xl'>
							<p className='dark:text-white font-bold mb-2 text-center md:text-left'>
								Color Picker
							</p>
							{type === 'Hex' ? (
								<HexColorPicker
									color={color}
									onChange={(color) => {
										onColorChange(color);
									}}
									className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
								></HexColorPicker>
							) : (
								<HexAlphaColorPicker
									color={color}
									onChange={(color) => {
										onColorChange(color);
									}}
									className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
								></HexAlphaColorPicker>
							)}
						</div>
					</div>
				</Portal>
			)}
		</>
	);
};
