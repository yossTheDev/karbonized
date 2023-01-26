import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { IconColorPicker, IconColorSwatch } from '@tabler/icons-react';
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
		placement: isHorizontal ? 'left-end' : 'top',
	});
	return (
		<>
			<div
				onMouseDown={() => {
					setShowColor(!showColor);
				}}
				ref={reference}
				className='flex flex-col flex-auto select-none'
			>
				<div className='flex flex-auto flex-row py-2 rounded hover:bg-base-100 select-none'>
					<p className='my-auto ml-2 select-none mr-2 text-xs text-left '>
						{label}
					</p>

					{mode === 'Single' ? (
						<div className='flex flex-row ml-auto mr-2 gap-2'>
							<p className='my-auto'>{color}</p>

							<div
								className='p-4 rounded my-auto border-2 border-base-100'
								style={{ backgroundColor: color }}
							></div>
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

			{/* Menu */}
			{showColor && (
				<Portal>
					<div
						onMouseEnter={() => setShowColor(true)}
						onMouseLeave={() => setShowColor(false)}
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
						className='flex flex-auto flex-col w-60 p-4 bg-base-100 shadow-2xl rounded-xl z-40 gap-2 select-none'
					>
						{/* Header */}
						<p className='dark:text-white font-bold mb-2 text-center md:text-left'>
							Color Picker
						</p>

						{/* Tabs */}
						{isGradientEnable && (
							<div className='flex flex-auto flex-row gap-2 select-none dark:text-gray-400 text-black'>
								<div
									onClick={() => {
										mode = 'Single';
										onModeChange && onModeChange('Single');
									}}
									className={`flex w-8 grow flex-col bg-base-200 p-2 rounded-xl cursor-pointer ${
										mode === 'Single' && 'border-primary border-2'
									}`}
								>
									<p className='mx-auto my-auto'>Single</p>
								</div>

								<div
									onClick={() => {
										mode = 'Gradient';
										onModeChange && onModeChange('Gradient');
									}}
									className={`flex w-8 grow flex-col bg-base-200 p-2 rounded-xl cursor-pointer  ${
										mode === 'Gradient' && 'border-primary border-2'
									}`}
								>
									<p className='mx-auto my-auto'>Gradient</p>
								</div>
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
								{/* Predefined colors */}
								<div className='flex flex-auto flex-row gap-x-0.5'>
									<div
										style={{ background: '#dc4040' }}
										onClick={() => onColorChange('#dc4040')}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100 cursor-pointer'
									></div>

									<div
										style={{ background: '#db8f40' }}
										onClick={() => onColorChange('#db8f40')}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: '#6ebb45' }}
										onClick={() => onColorChange('#6ebb45')}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: '#45ba97' }}
										onClick={() => onColorChange('#45ba97')}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: '#4582ba' }}
										onClick={() => onColorChange('#4582ba')}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: '#5545ba' }}
										onClick={() => onColorChange('#5545ba')}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>
									<div
										style={{ background: '#cc63b5' }}
										onClick={() => onColorChange('#cc63b5')}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>
								</div>
								{/* Input */}
								<div className='flex flex-auto flex-row dark:text-gray-400 text-black'>
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

								{/* Predefined Gradients */}
								<div className='flex flex-auto flex-row gap-0.5'>
									<div
										style={{ background: 'linear-gradient(#bf86da,#144ab4)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#bf86da', '#144ab4')
										}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: 'linear-gradient(#9796F0,#FBC7D4)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#9796F0', '#FBC7D4')
										}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: 'linear-gradient(#06BEB6,#48B1BF)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#06BEB6', '#48B1BF')
										}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: 'linear-gradient(#00B4DB,#0083B0)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#00B4DB', '#0083B0')
										}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: 'linear-gradient(#FF9A9E,#FECFEF)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#FF9A9E', '#FECFEF')
										}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: 'linear-gradient(#5adb00,#0083b0)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#5adb00', '#0083b0')
										}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>

									<div
										style={{ background: 'linear-gradient(#ed7b6b,#b07f00)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#ed7b6b', '#b07f00')
										}
										className='p-3 rounded hover:border-gray-400 border-2 border-base-100  cursor-pointer'
									></div>
								</div>

								{/* Preview Colors */}
								<div className=' flex flex-auto flex-row gap-2 mt-2 dark:text-gray-400 text-black'>
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
									<p className='my-auto  ml-2'>deg</p>
								</div>
							</>
						)}
					</div>
				</Portal>
			)}
		</>
	);
};
