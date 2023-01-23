import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { IconColorPicker, IconColorSwatch } from '@tabler/icons';
import React, { useState } from 'react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { Button, Input, Range } from 'react-daisyui';
import { Portal } from 'react-portal';
import { useScreenDirection } from '../../hooks/useScreenDirection';

interface Props {
	type?: 'HexAlpha' | 'Hex';
	label?: string;
	color?: string;
	isGradientEnable?: boolean;
	colorGradient1?: string;
	colorGradient2?: string;
	gradientDeg?: number;
	mode?: string;
	onModeChange?: (mode: string) => void;
	onColorChange: (color: string) => void;
	onGradientChange?: (color: string, color2: string) => void;
	onGradientDegChange?: (deg: number) => void;
}

export const ColorPicker: React.FC<Props> = ({
	type = 'Hex',
	label = 'color',
	color = '#5895c8',
	mode = 'Single',
	isGradientEnable = true,
	colorGradient1 = '#0da2e7',
	colorGradient2 = '#5895c8',
	gradientDeg = 23,
	onModeChange,
	onColorChange,
	onGradientChange,
	onGradientDegChange,
}) => {
	/* Component Store */
	const [gradientMode, setGradientMode] = useState<'Color1' | 'Color2'>(
		'Color1'
	);

	const [showColor, setShowColor] = useState(false);
	const isHorizontal = useScreenDirection();
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(isHorizontal ? 12 : 2), flip(), shift()],
		placement: isHorizontal ? 'left-start' : 'top',
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

					{mode === 'Single' ? (
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
					) : (
						<div className='flex flex-row ml-auto mr-2'>
							<div
								className='p-4 rounded my-auto border-2 border-base-100'
								style={{ backgroundColor: colorGradient1 }}
							></div>

							<div
								className='p-4 rounded my-auto border-2 border-base-100'
								style={{ backgroundColor: colorGradient2 }}
							></div>
						</div>
					)}
				</div>
			</div>

			{/* Tooltip */}
			{showColor && (
				<Portal>
					<div
						onMouseEnter={() => setShowColor(true)}
						onMouseLeave={() => setShowColor(false)}
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
						className='flex flex-auto flex-col w-60 p-4 bg-base-100 shadow-2xl rounded-xl z-40 gap-2'
					>
						{/* Header */}
						<p className='dark:text-white font-bold mb-2 text-center md:text-left'>
							Color Picker
						</p>

						{/* Tabs */}
						{isGradientEnable && (
							<div className='flex flex-auto flex-row gap-2'>
								<Button
									className='flex flex-auto'
									onClick={() => {
										mode = 'Single';
										onModeChange && onModeChange('Single');
									}}
								>
									<IconColorPicker></IconColorPicker>
								</Button>
								<Button
									className='flex flex-auto'
									onClick={() => {
										mode = 'Gradient';
										onModeChange && onModeChange('Gradient');
									}}
								>
									<IconColorSwatch></IconColorSwatch>
								</Button>
							</div>
						)}

						{/* Simgle Color */}
						{mode === 'Single' && (
							<>
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
							</>
						)}

						{/* Gradient */}
						{mode === 'Gradient' && (
							<>
								{gradientMode === 'Color1' ? (
									<HexAlphaColorPicker
										color={colorGradient1}
										className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
										onChange={(color) => {
											onGradientChange &&
												onGradientChange(color, colorGradient2);
										}}
									></HexAlphaColorPicker>
								) : (
									<HexAlphaColorPicker
										color={colorGradient2}
										className='flex flex-auto max-w-xs w-36 mx-auto max-h-44'
										onChange={(color) => {
											onGradientChange &&
												onGradientChange(colorGradient1, color);
										}}
									></HexAlphaColorPicker>
								)}

								{/* Preview Colors */}
								<div className=' flex flex-auto flex-row gap-2 mt-2'>
									<div
										className={`flex flex-auto p-4 rounded-xl border-2 border-base-200 h-4 ${
											gradientMode === 'Color1' && 'border-gray-400'
										}`}
										onMouseDown={() => {
											setGradientMode('Color1');
										}}
										style={{ background: colorGradient1 }}
									></div>
									<div
										className={`flex flex-auto p-4 rounded-xl border-2 border-base-200 h-4 ${
											gradientMode === 'Color2' && 'border-gray-400'
										}`}
										onMouseDown={() => {
											setGradientMode('Color2');
										}}
										style={{ background: colorGradient2 }}
									></div>
								</div>

								<div className='flex flex-auto flex-row'>
									<Range
										min={0}
										max={180}
										onChange={(ev) =>
											onGradientDegChange &&
											onGradientDegChange(parseInt(ev.currentTarget.value))
										}
										color='primary'
										value={gradientDeg}
										className='my-auto'
									></Range>
									<p className='my-auto text-gray-400'>deg</p>
								</div>
							</>
						)}
					</div>
				</Portal>
			)}
		</>
	);
};
