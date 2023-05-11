import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import React, { useState } from 'react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { Button, Input, Modal, Range } from 'react-daisyui';
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
	const [visible, setVisible] = useState(false);
	const isHorizontal = useScreenDirection();
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(isHorizontal ? 12 : 2), flip(), shift()],
		placement: isHorizontal ? 'left-end' : 'top',
	});
	return (
		<>
			<div
				onFocus={() => {
					setShowColor(true);
				}}
				onBlur={() => {
					if (isHorizontal) {
						!visible && setShowColor(false);
					}
				}}
				tabIndex={0}
			>
				<div
					onMouseDown={() => {
						setShowColor(!showColor);
					}}
					ref={reference}
					className='flex flex-auto select-none flex-col'
				>
					<div className='flex flex-auto select-none flex-row rounded py-2 hover:bg-base-100'>
						<p className='my-auto ml-2 mr-2 select-none text-left text-xs '>
							{label}
						</p>

						{mode === 'Single' ? (
							<div className='ml-auto mr-2 flex flex-row gap-2'>
								<p className='my-auto'>{color}</p>

								<div
									className='my-auto rounded border-2 border-base-100 p-4'
									style={{ backgroundColor: color }}
								></div>
							</div>
						) : (
							<div className='ml-auto mr-2 flex flex-row'>
								<div
									className='my-auto rounded border-2 border-base-100 p-4'
									style={{ backgroundColor: colorGradient1 }}
								></div>

								<div
									className='my-auto rounded border-2 border-base-100 p-4'
									style={{ backgroundColor: colorGradient2 }}
								></div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Menu */}
			{showColor && isHorizontal && (
				<Portal>
					<div
						tabIndex={0}
						onMouseEnter={() => {
							setVisible(true);
						}}
						onMouseDown={() => {
							setVisible(true);
						}}
						onMouseLeave={() => {
							setShowColor(false);
							setVisible(false);
						}}
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
						className='dropdown-content z-40 flex w-60 flex-auto select-none flex-col gap-2 rounded-xl bg-base-100 p-4 shadow-2xl'
					>
						{/* Header */}
						<p className='mb-2 text-center font-bold dark:text-white md:text-left'>
							Color Picker
						</p>

						{/* Tabs */}
						{isGradientEnable && (
							<div className='flex flex-auto select-none flex-row gap-2 text-black dark:text-gray-400'>
								<button
									onMouseDown={() => {
										mode = 'Single';
										onModeChange && onModeChange('Single');
										setShowColor(true);
									}}
									className={`flex w-8 grow cursor-pointer flex-col rounded-2xl bg-base-200 p-2 ${
										mode === 'Single' && 'border-2 border-primary'
									}`}
								>
									<p className='mx-auto my-auto'>Single</p>
								</button>

								<button
									onClick={() => {
										mode = 'Gradient';
										onModeChange && onModeChange('Gradient');
										setShowColor(true);
									}}
									className={`flex w-8 grow cursor-pointer flex-col rounded-2xl bg-base-200 p-2  ${
										mode === 'Gradient' && 'border-2 border-primary'
									}`}
								>
									<p className='mx-auto my-auto'>Gradient</p>
								</button>
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
										className='mx-auto flex max-h-44 w-36 max-w-xs flex-auto'
									></HexColorPicker>
								) : (
									<HexAlphaColorPicker
										color={color}
										onChange={(color) => {
											onColorChange(color);
										}}
										className='mx-auto flex max-h-44 w-36 max-w-xs flex-auto'
									></HexAlphaColorPicker>
								)}
								{/* Predefined colors */}
								<div className='flex flex-auto flex-row gap-x-0.5'>
									<div
										style={{ background: '#dc4040' }}
										onClick={() => onColorChange('#dc4040')}
										className='cursor-pointer rounded border-2 border-base-100 p-3 hover:border-gray-400'
									></div>

									<div
										style={{ background: '#db8f40' }}
										onClick={() => onColorChange('#db8f40')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: '#6ebb45' }}
										onClick={() => onColorChange('#6ebb45')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: '#45ba97' }}
										onClick={() => onColorChange('#45ba97')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: '#4582ba' }}
										onClick={() => onColorChange('#4582ba')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: '#5545ba' }}
										onClick={() => onColorChange('#5545ba')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>
									<div
										style={{ background: '#cc63b5' }}
										onClick={() => onColorChange('#cc63b5')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>
								</div>
								{/* Input */}
								<div className='flex flex-auto flex-row text-black dark:text-gray-400'>
									<div
										className='my-auto rounded border-2 border-base-100 p-4'
										style={{ backgroundColor: color }}
									></div>
									<Input
										spellCheck={false}
										onInput={(ev) => onColorChange(ev.currentTarget.value)}
										className='my-auto ml-2 flex w-24 flex-auto'
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
										className='mx-auto flex max-h-44 w-36 max-w-xs flex-auto'
										onChange={(color) => {
											onGradientChange &&
												onGradientChange(color, colorGradient2);
										}}
									></HexAlphaColorPicker>
								) : (
									<HexAlphaColorPicker
										color={colorGradient2}
										className='mx-auto flex max-h-44 w-36 max-w-xs flex-auto'
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
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#9796F0,#FBC7D4)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#9796F0', '#FBC7D4')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#06BEB6,#48B1BF)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#06BEB6', '#48B1BF')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#00B4DB,#0083B0)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#00B4DB', '#0083B0')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#FF9A9E,#FECFEF)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#FF9A9E', '#FECFEF')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#5adb00,#0083b0)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#5adb00', '#0083b0')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#ed7b6b,#b07f00)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#ed7b6b', '#b07f00')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>
								</div>

								{/* Preview Colors */}
								<div className=' mt-2 flex flex-auto flex-row gap-2 text-black dark:text-gray-400'>
									<div
										className={`flex h-4 flex-auto rounded-xl border-2 border-base-200 p-4 ${
											gradientMode === 'Color1' && 'border-gray-400'
										}`}
										onMouseDown={() => {
											setGradientMode('Color1');
										}}
										style={{ background: colorGradient1 }}
									></div>
									<div
										className={`flex h-4 flex-auto rounded-xl border-2 border-base-200 p-4 ${
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
									<p className='my-auto  ml-2 text-gray-400'>deg</p>
								</div>
							</>
						)}
					</div>
				</Portal>
			)}

			{/* Modal */}
			{!isHorizontal && (
				<Modal
					open={showColor && !isHorizontal}
					onClickBackdrop={() => {
						setShowColor(false);
					}}
					className='w-[17.5rem] overflow-hidden bg-base-200 dark:text-white'
				>
					<Modal.Header className='font-bold dark:text-white'>
						<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
							Color Picker
						</p>
					</Modal.Header>

					<Modal.Body className='flex flex-auto select-none flex-col gap-2 overflow-auto'>
						{/* Tabs */}
						{isGradientEnable && (
							<div className='flex flex-auto select-none flex-row gap-2 text-black dark:text-gray-400'>
								<button
									onMouseDown={() => {
										mode = 'Single';
										onModeChange && onModeChange('Single');
									}}
									className={`flex w-8 grow cursor-pointer flex-col rounded-2xl bg-base-200 p-2 ${
										mode === 'Single' && 'border-2 border-primary'
									}`}
								>
									<p className='mx-auto my-auto'>Single</p>
								</button>

								<button
									onClick={() => {
										mode = 'Gradient';
										onModeChange && onModeChange('Gradient');
									}}
									className={`flex w-8 grow cursor-pointer flex-col rounded-2xl bg-base-200 p-2  ${
										mode === 'Gradient' && 'border-2 border-primary'
									}`}
								>
									<p className='mx-auto my-auto'>Gradient</p>
								</button>
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
										className='mx-auto flex max-h-44 w-44 max-w-xs flex-auto'
									></HexColorPicker>
								) : (
									<HexAlphaColorPicker
										color={color}
										onChange={(color) => {
											onColorChange(color);
										}}
										className='mx-auto flex max-h-44 w-44 max-w-xs flex-auto'
									></HexAlphaColorPicker>
								)}
								{/* Predefined colors */}
								<div className='mx-auto flex flex-auto flex-row gap-x-0.5'>
									<div
										style={{ background: '#dc4040' }}
										onClick={() => onColorChange('#dc4040')}
										className='cursor-pointer rounded border-2 border-base-100 p-3 hover:border-gray-400'
									></div>

									<div
										style={{ background: '#db8f40' }}
										onClick={() => onColorChange('#db8f40')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: '#6ebb45' }}
										onClick={() => onColorChange('#6ebb45')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: '#45ba97' }}
										onClick={() => onColorChange('#45ba97')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: '#4582ba' }}
										onClick={() => onColorChange('#4582ba')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: '#5545ba' }}
										onClick={() => onColorChange('#5545ba')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>
									<div
										style={{ background: '#cc63b5' }}
										onClick={() => onColorChange('#cc63b5')}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>
								</div>
								{/* Input */}
								<div className='flex flex-auto flex-row text-black dark:text-gray-400'>
									<div
										className='my-auto rounded border-2 border-base-100 p-4'
										style={{ backgroundColor: color }}
									></div>
									<Input
										spellCheck={false}
										onInput={(ev) => onColorChange(ev.currentTarget.value)}
										className='my-auto ml-2 flex w-24 flex-auto'
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
										className='mx-auto flex max-h-44 w-36 max-w-xs flex-auto'
										onChange={(color) => {
											onGradientChange &&
												onGradientChange(color, colorGradient2);
										}}
									></HexAlphaColorPicker>
								) : (
									<HexAlphaColorPicker
										color={colorGradient2}
										className='mx-auto flex max-h-44 w-36 max-w-xs flex-auto'
										onChange={(color) => {
											onGradientChange &&
												onGradientChange(colorGradient1, color);
										}}
									></HexAlphaColorPicker>
								)}

								{/* Predefined Gradients */}
								<div className='mx-auto flex flex-auto flex-row gap-0.5'>
									<div
										style={{ background: 'linear-gradient(#bf86da,#144ab4)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#bf86da', '#144ab4')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#9796F0,#FBC7D4)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#9796F0', '#FBC7D4')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#06BEB6,#48B1BF)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#06BEB6', '#48B1BF')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#00B4DB,#0083B0)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#00B4DB', '#0083B0')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#FF9A9E,#FECFEF)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#FF9A9E', '#FECFEF')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#5adb00,#0083b0)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#5adb00', '#0083b0')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>

									<div
										style={{ background: 'linear-gradient(#ed7b6b,#b07f00)' }}
										onClick={() =>
											onGradientChange && onGradientChange('#ed7b6b', '#b07f00')
										}
										className='cursor-pointer rounded border-2 border-base-100 p-3  hover:border-gray-400'
									></div>
								</div>

								{/* Preview Colors */}
								<div className=' mt-2 flex flex-auto flex-row gap-2 text-black dark:text-gray-400'>
									<div
										className={`flex h-4 flex-auto rounded-xl border-2 border-base-200 p-4 ${
											gradientMode === 'Color1' && 'border-gray-400'
										}`}
										onMouseDown={() => {
											setGradientMode('Color1');
										}}
										style={{ background: colorGradient1 }}
									></div>
									<div
										className={`flex h-4 flex-auto rounded-xl border-2 border-base-200 p-4 ${
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
									<p className='my-auto  ml-2 text-gray-400'>deg</p>
								</div>
							</>
						)}
					</Modal.Body>

					<Modal.Actions>
						<Button
							className='dark:text-white'
							onClick={() => setShowColor(false)}
						>
							OK
						</Button>
					</Modal.Actions>
				</Modal>
			)}
		</>
	);
};
