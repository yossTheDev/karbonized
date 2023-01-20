import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import React, { useState } from 'react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { Portal } from 'react-portal';

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
	const [showColor, setShowColor] = useState(false);
	const [ccolor, setColor] = useState(color);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), flip(), shift()],
		placement: 'top',
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
				<div className='flex flex-auto flex-row p-2 hover:bg-base-100'>
					<p className='my-auto ml-2 select-none mr-2 text-xs'>{label}</p>

					<div className='flex flex-row ml-auto mr-2'>
						<div
							className='p-4 rounded my-auto'
							style={{ backgroundColor: ccolor }}
						></div>
						<p className='my-auto ml-2 select-none'>{ccolor}</p>
					</div>
				</div>
			</div>

			{/* Tooltip */}
			{showColor && (
				<Portal>
					<div
						className='z-40'
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
					>
						<div className='flex flex-auto flex-col w-60 p-4 bg-base-100 shadow-xl rounded-xl'>
							<p className='dark:text-white font-bold mb-2 text-center md:text-left'>
								Color Picker
							</p>
							{type === 'Hex' ? (
								<HexColorPicker
									color={ccolor}
									onChange={(color) => {
										setColor(color);
										onColorChange(color);
									}}
									className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
								></HexColorPicker>
							) : (
								<HexAlphaColorPicker
									color={ccolor}
									onChange={(color) => {
										setColor(color);
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
