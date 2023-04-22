import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import {
	IconBorderStyle,
	IconCamera,
	IconColorFilter,
	IconEye,
	IconFlipHorizontal,
	IconFlipVertical,
	IconHierarchy,
	IconJpg,
	IconMask,
	IconPng,
	IconReload,
	IconShadow,
	IconSvg,
	IconTrash,
} from '@tabler/icons-react';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import React, {
	ReactNode,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { Button, Checkbox, Input, Range, Select } from 'react-daisyui';
import { Portal } from 'react-portal';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { NumberInput } from '../CustomControls/NumberInput';
import { AnimatePresence, motion } from 'framer-motion';
import { ContextMenu } from '../CustomControls/ContextMenu';

interface ControlProps {
	color?: string;
	children?: ReactNode;
	menu?: ReactNode;
	lockAspectRatio?: boolean;
	border?: number;
	borderEditable?: boolean;
	shadowEditable?: boolean;
	maskEditable?: boolean;
	defaultHeight?: string;
	defaultWidth?: string;
	maxHeight?: string;
	maxWidth?: string;
	minHeight?: string;
	minWidth?: string;

	onClick?: Function;
}

export const ControlTemplate: React.FC<ControlProps> = ({
	color,
	children,
	menu,
	shadowEditable = true,
	maskEditable = true,
	border = 2,
	borderEditable = true,
	maxHeight = '400px',
	maxWidth = '400px',
	minHeight = '150px',
	minWidth = '300px',
	defaultHeight = '50px',
	defaultWidth = '80px',
}) => {
	// App Store
	const ID = useId();
	const controlID = useStoreState((state) => state.currentControlID);
	const workspaceName = useStoreState((state) => state.workspaceName);

	const controlSize = useStoreState((state) => state.controlSize);
	const setControlSize = useStoreActions((state) => state.setControlSize);
	const constrlPos = useStoreState((state) => state.controlPosition);
	const setControlPos = useStoreActions((state) => state.setControlPosition);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	const setID = useStoreActions((state) => state.setcurrentControlID);

	// Component States
	const [zIndex, setzIndex] = useState('0');
	const [visibility, setVisibility] = useState(true);
	const [contextMenu, setContextMenu] = useState(false);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), shift(), flip()],
		placement: 'right',
	});

	/* Position and Size */
	const [position, setPosition] = useState({ x: 33, y: 190 });
	const [size, setSize] = useState({
		w: defaultWidth.replace('px', '') as unknown as number,
		h: defaultHeight.replace('px', '') as unknown as number,
	});
	const [borderRadious, setBorderRadious] = useState(border);

	/* Flip */
	const [flipX, setFlipX] = useState(false);
	const [flipY, setFlipY] = useState(false);

	/* Rotation */
	const [rotateX, setRotateX] = useState(0);
	const [rotateY, setRotateY] = useState(0);

	/* Filters */
	const [blur, setBlur] = useState(0);
	const [brightness, setBrightness] = useState(100);
	const [contrast, setContrast] = useState(100);
	const [grayscale, setGrayscale] = useState(0);
	const [huerotate, setHueRotate] = useState(0);
	const [invert, setInvert] = useState(0);
	const [saturate, setSaturate] = useState(100);
	const [opacity, setOpacity] = useState(100);
	const [sepia, setSepia] = useState(0);

	/* Shadow */
	const [shadowX, setShadowX] = useState(0);
	const [shadowY, setShadowY] = useState(0);
	const [shadowBlur, setShadowBlur] = useState(0);
	const [shadowColor, setShadowColor] = useState('#090b11');

	const [mask, setMask] = useState('');
	const [maskRepeat, setMaskRepeat] = useState(false);

	/* Delete Element when Delete Key is pressed */
	const isPressed = useKeyPress('Delete');
	useEffect(() => {
		if (controlID === ID) {
			setVisibility(false);
			setID('');
		}
	}, [isPressed]);

	const Masks = [
		'default',
		'mask-squircle',
		'mask-decagon',
		'mask-diamond',
		'mask-heart',
		'mask-hexagon',
		'mask-circle',
		'mask-parallelogram',
		'mask-parallelogram-2',
		'mask-parallelogram-3',
		'mask-parallelogram-4',
		'mask-pentagon',
		'mask-square',
		'mask-star',
		'mask-star-2',
		'mask-triangle',
		'mask-triangle-2',
		'mask-triangle-3',
		'mask-triangle-4',
	];

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setControlPos({ x: 98, y: 190 });
		setControlSize({ w: parseInt(defaultWidth), h: parseInt(defaultHeight) });
	}, []);

	// Save Image as PNG
	const exportAsPng = useCallback(async () => {
		if (ref.current === null) {
			console.log('NULL');

			return;
		}

		toPng(ref.current, {
			cacheBust: true,
		})
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = workspaceName + '.png';
				link.href = dataUrl;
				link.click();
				console.log('SAVED');
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ref, workspaceName]);

	// Save Image as SVG
	const exportAsSvg = useCallback(async () => {
		if (ref.current === null) {
			console.log('NULL');

			return;
		}

		toSvg(ref.current, {
			cacheBust: true,
		})
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = workspaceName + '.svg';
				link.href = dataUrl;
				link.click();
				console.log('SAVED');
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ref, workspaceName]);

	const exportAsJpeg = useCallback(async () => {
		if (ref.current === null) {
			console.log('NULL');

			return;
		}

		toJpeg(ref.current, {
			cacheBust: true,
		})
			.then((dataUrl) => {
				const link = document.createElement('a');
				link.download = workspaceName + '.jpeg';
				link.href = dataUrl;
				link.click();
				console.log('SAVED');
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ref, workspaceName]);

	return (
		<AnimatePresence>
			{visibility && (
				<motion.div
					id={ID}
					key={ID}
					onMouseEnter={() => setContextMenu(false)}
					onContextMenu={(e) => {
						setContextMenu(!contextMenu);
						//setDisable(true);
						e.preventDefault();
					}}
					className={`absolute flex flex-auto select-none ${
						!maskRepeat && 'mask'
					}  ${mask}`}
					style={{
						zIndex: zIndex,
						height: defaultHeight,
						width: defaultWidth,
						maxHeight: maxHeight,
						maxWidth: maxWidth,
						minHeight: minHeight,
						minWidth: minWidth,
						left: position.x,
						top: position.y,
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, marginTop: '100px' }}
					transition={{ duration: 0.1 }}
				>
					<div
						className='flex flex-auto'
						onTouchStart={() => {
							//setDisable(true);
							//console.log('touch');
							setID(ID);
							setWorkspaceTab('control');
						}}
						onClick={() => {
							//setDisable(true);
							//console.log(ID);
							setID(ID);
							setWorkspaceTab('control');
						}}
						ref={reference}
						style={{}}
					>
						<div
							ref={ref}
							style={{
								borderRadius: borderRadious + 'px',
								backgroundColor: color,
								transform: `${flipX ? 'scaleX(-1)' : ''} ${
									flipY ? 'scaleY(-1)' : ''
								} rotateY(${rotateY + 'deg'}) rotateX(${rotateX + 'deg'})`,

								filter: `blur(${blur + 'px'}) brightness(${
									brightness + '%'
								}) contrast(${contrast + '%'})  grayscale(${
									grayscale + '%'
								}) hue-rotate(${huerotate + 'deg'}) invert(${
									invert + '%'
								}) opacity(${opacity + '%'}) saturate(${
									saturate + '%'
								}) sepia(${sepia + '%'}) drop-shadow(${
									shadowX +
									'px ' +
									shadowY +
									'px ' +
									shadowBlur +
									'px ' +
									shadowColor
								})`,
							}}
							className='flex h-full flex-auto flex-col'
						>
							{children}
						</div>
					</div>
				</motion.div>
			)}

			{/* Menu */}
			{controlID === ID && (
				<Portal
					key={ID + '_control_menu'}
					node={document.getElementById('menu')}
				>
					<motion.div
						initial={{ marginTop: '25px' }}
						animate={{ marginTop: '0px' }}
						className='text-xs font-bold'
					>
						{/* Position */}
						<CustomCollapse
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconHierarchy size={22}></IconHierarchy>
									<p className='my-auto font-bold'>Position</p>
								</div>
							}
						>
							<div className='flex flex-col flex-wrap text-xs'>
								{/* Flip Options */}
								<div className='flex flex-auto gap-2'>
									<Button
										className='flex flex-auto'
										onClick={() => setFlipX(!flipX)}
									>
										<IconFlipVertical></IconFlipVertical>
									</Button>
									<Button
										className='flex flex-auto'
										onClick={() => setFlipY(!flipY)}
									>
										<IconFlipHorizontal></IconFlipHorizontal>
									</Button>
								</div>

								{/* Position */}
								<div className='flex flex-auto flex-row'>
									{/* Position X */}
									<div className='flex flex-auto  p-2 '>
										<p className='my-auto p-2'>X:</p>
										<Input
											disabled
											type={'number'}
											className='w-full rounded-xl bg-base-100 p-2  text-xs'
											onChange={(ev) => {
												setControlPos({
													x: ev.target.value as unknown as number,
													y: position.y,
												});
											}}
											value={constrlPos?.x}
										></Input>
									</div>
									{/* Position Y */}
									<div className='flex flex-auto  p-2 text-xs'>
										<p className='my-auto p-2'>Y:</p>
										<Input
											type={'number'}
											disabled
											className='w-full rounded-xl bg-base-100  p-2 text-xs'
											onChange={(ev) =>
												setControlPos({
													y: ev.target.value as unknown as number,
													x: position.x,
												})
											}
											value={constrlPos?.y}
										></Input>
									</div>
								</div>

								{/* Position Z */}
								<div className='flex flex-auto p-2 text-xs '>
									<p className='my-auto p-2'>Z:</p>
									<NumberInput
										onChange={(number) => {
											setzIndex(number.toString());
										}}
										number={parseInt(zIndex)}
									></NumberInput>
								</div>

								{/* Size */}
								<div className='flex flex-row'>
									<div className='flex flex-auto  p-2 '>
										<p className='my-auto p-2'>W:</p>
										<Input
											disabled
											type={'number'}
											className='w-full rounded-xl bg-base-100 p-2 text-xs'
											onChange={(ev) =>
												setControlSize({
													w: ev.target.value as unknown as number,
													h: size.h,
												})
											}
											value={controlSize?.w}
										></Input>
									</div>

									<div className='flex flex-auto  p-2 '>
										<p className='my-auto p-2'>H:</p>
										<Input
											disabled
											type={'number'}
											className='w-full rounded-xl bg-base-100  p-2 text-xs'
											onChange={(ev) =>
												setControlSize({
													w: size.w,
													h: ev.target.value as unknown as number,
												})
											}
											value={controlSize?.h}
										></Input>
									</div>
								</div>

								{/* Rotation */}
								<p>Rotation</p>

								<div className='flex flex-auto flex-row'>
									{/* Rotation X */}
									<div className='my-auto flex  flex-auto p-2 text-xs'>
										<p className='my-auto p-2'>X:</p>
										<Range
											color='primary'
											min={-180}
											max={180}
											className='my-auto'
											onChange={(ev) => {
												setRotateX(ev.currentTarget.value as unknown as number);
											}}
											value={rotateX}
										></Range>
									</div>
									{/* Rotation Y */}
									<div className='my-auto flex  flex-auto p-2 text-xs'>
										<p className='my-auto p-2'>Y:</p>
										<Range
											color='primary'
											className='my-auto'
											min={-180}
											max={180}
											onChange={(ev) => {
												setRotateY(ev.currentTarget.value as unknown as number);
											}}
											value={rotateY}
										></Range>
									</div>

									<Button
										onMouseDown={() => {
											setRotateX(0);
											setRotateY(0);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>
							</div>
						</CustomCollapse>

						{/* Shadow Config */}
						{shadowEditable && (
							<CustomCollapse
								menu={
									<div className='m-2 flex flex-row gap-2'>
										<IconShadow size={22}></IconShadow>
										<p className='my-auto font-bold'>Shadow</p>
									</div>
								}
							>
								<div className='flex flex-row flex-wrap text-xs'>
									{/* Position */}
									<div className='flex flex-auto flex-row'>
										{/* Shadow X */}
										<div className='flex flex-auto  p-2 '>
											<p className='my-auto p-2'>X:</p>
											<NumberInput
												onChange={(number) => {
													setShadowX(number);
												}}
												number={shadowX}
											></NumberInput>
										</div>
										{/* Shadow Y */}
										<div className='flex flex-auto p-2 text-xs'>
											<p className='my-auto p-2'>Y:</p>
											<NumberInput
												onChange={(number) => {
													setShadowY(number);
												}}
												number={shadowY}
											></NumberInput>
										</div>
									</div>

									{/* Shadow Blur */}
									<div className='flex flex-auto  text-xs '>
										<p className='my-auto p-2'>Blur:</p>
										<Range
											className='my-auto'
											color='primary'
											onChange={(ev) =>
												setShadowBlur(ev.target.value as unknown as number)
											}
											value={shadowBlur}
											max={'100'}
										></Range>
									</div>

									{/* Shadow Color */}
									<div className='flex flex-auto flex-col'>
										<ColorPicker
											type='HexAlpha'
											label='Shadow Color'
											color={shadowColor}
											onColorChange={(color) => setShadowColor(color)}
										></ColorPicker>
									</div>
								</div>
							</CustomCollapse>
						)}

						{/* Border  */}
						{borderEditable && (
							<CustomCollapse
								menu={
									<div className='m-2 flex flex-row gap-2'>
										<IconBorderStyle size={22}></IconBorderStyle>
										<p className='my-auto font-bold'>Borders</p>
									</div>
								}
							>
								<div className='flex flex-row flex-wrap text-xs'>
									<div className='flex flex-auto p-2'>
										<p className='my-auto p-2'>Radius:</p>
										<Range
											className='my-auto'
											color='primary'
											onChange={(ev) =>
												setBorderRadious(ev.target.value as unknown as number)
											}
											value={borderRadious}
											max={'22'}
										></Range>
									</div>
								</div>
							</CustomCollapse>
						)}

						{/* Mask */}
						{maskEditable && (
							<CustomCollapse
								menu={
									<div className='m-2 flex flex-row gap-2'>
										<IconMask size={22}></IconMask>
										<p className='my-auto font-bold'>Mask</p>
									</div>
								}
							>
								<div className='flex flex-row flex-wrap text-xs'>
									{/* Select Mask */}
									<div className='flex flex-auto p-2 '>
										<Select
											tabIndex={0}
											className='flex flex-auto'
											value={mask}
											onChange={(e) => setMask(e)}
										>
											{Masks.map((i) => {
												return (
													<option key={i} value={i}>
														{i.replace('mask-', '').replace('-', ' ')}
													</option>
												);
											})}
										</Select>
									</div>

									<div className='m-2 flex flex-row gap-2'>
										<p className='my-auto text-xs'>Mask Repeat</p>
										<Checkbox
											color='primary'
											onChange={(ev) => setMaskRepeat(ev.currentTarget.checked)}
											checked={maskRepeat}
										></Checkbox>
									</div>
								</div>
							</CustomCollapse>
						)}

						{/* Filters */}
						<CustomCollapse
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconColorFilter size={22}></IconColorFilter>
									<p className='my-auto font-bold'>Filters</p>
								</div>
							}
						>
							<div className='flex flex-col flex-wrap gap-2 text-xs'>
								{/* Blur Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Blur:</p>
									<Range
										color='primary'
										className='my-auto'
										min={-1}
										max={100}
										onChange={(ev) => {
											setBlur(ev.currentTarget.value as unknown as number);
										}}
										value={blur}
									></Range>
									<Button
										onMouseDown={() => {
											setBlur(-1 * 1);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>

								{/* Brightness Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Brightness:</p>
									<Range
										color='primary'
										className='my-auto'
										min={1}
										max={200}
										onChange={(ev) => {
											setBrightness(
												ev.currentTarget.value as unknown as number
											);
										}}
										value={brightness}
									></Range>
									<Button
										onMouseDown={() => {
											setBrightness(100);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>

								{/* Contrast Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Contrast:</p>
									<Range
										color='primary'
										className='my-auto'
										min={100}
										max={300}
										onChange={(ev) => {
											setContrast(ev.currentTarget.value as unknown as number);
										}}
										value={contrast}
									></Range>
									<Button
										onMouseDown={() => {
											setContrast(100);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>

								{/* Grayscale Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Grayscale:</p>
									<Range
										color='primary'
										className='my-auto'
										min={0}
										max={100}
										onChange={(ev) => {
											setGrayscale(ev.currentTarget.value as unknown as number);
										}}
										value={grayscale}
									></Range>
									<Button
										onMouseDown={() => {
											setGrayscale(0);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>

								{/* Hue Rotate Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Hue Rotate:</p>
									<Range
										color='primary'
										className='my-auto'
										min={0}
										max={359}
										onChange={(ev) => {
											setHueRotate(ev.currentTarget.value as unknown as number);
										}}
										value={huerotate}
									></Range>
									<Button
										onMouseDown={() => {
											setHueRotate(0);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>

								{/* Invert Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Invert:</p>
									<Range
										color='primary'
										className='my-auto'
										min={0}
										max={100}
										onChange={(ev) => {
											setInvert(ev.currentTarget.value as unknown as number);
										}}
										value={invert}
									></Range>
									<Button
										onMouseDown={() => {
											setInvert(0);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>

								{/* Saturate Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Saturate:</p>
									<Range
										color='primary'
										className='my-auto'
										min={0}
										max={200}
										onChange={(ev) => {
											setSaturate(ev.currentTarget.value as unknown as number);
										}}
										value={saturate}
									></Range>
									<Button
										onMouseDown={() => {
											setSaturate(100);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>

								{/* Sepia Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Sepia:</p>
									<Range
										color='primary'
										className='my-auto'
										min={0}
										max={100}
										onChange={(ev) => {
											setSepia(ev.currentTarget.value as unknown as number);
										}}
										value={sepia}
									></Range>
									<Button
										onMouseDown={() => {
											setSepia(0);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>

								{/* Opacity Options */}
								<div className='flex flex-auto flex-row gap-2'>
									<p className='my-auto p-2'>Opacity:</p>
									<Range
										color='primary'
										className='my-auto'
										min={0}
										max={100}
										onChange={(ev) => {
											setOpacity(ev.currentTarget.value as unknown as number);
										}}
										value={opacity}
									></Range>
									<Button
										onMouseDown={() => {
											setOpacity(100);
										}}
										className='my-auto flex flex-auto p-1'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>
							</div>
						</CustomCollapse>

						{menu}

						{/* Delete */}
						<div
							onClick={() => {
								setID('');
								setVisibility(false);
							}}
							className='mt-auto flex max-h-12  flex-auto cursor-pointer flex-row gap-2 rounded-2xl bg-gray-800/20 p-2 transition-all hover:bg-red-600 hover:text-white active:scale-90'
						>
							<div className='mx-auto my-auto flex flex-row gap-2'>
								<IconTrash></IconTrash>
								<p className='my-auto text-xs'>Delete Component</p>
							</div>
						</div>
					</motion.div>
				</Portal>
			)}

			{/* Context Menu */}
			<AnimatePresence>
				{contextMenu && controlID === ID && (
					<Portal key={ID + '_menu'} node={document.getElementById('body')}>
						<motion.div
							key={ID + '_menu'}
							className='absolute z-50'
							ref={floating}
							style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
							onMouseLeave={() => setContextMenu(false)}
							initial={{ scale: 0.5, opacity: 0.94 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
						>
							<div className='flex w-64 flex-auto flex-col gap-2 rounded-2xl bg-base-100 p-2 shadow-2xl dark:text-gray-400'>
								{/* Opacity Control */}
								<div className='flex flex-auto flex-row gap-2'>
									<IconEye className='my-auto ml-2' size={22}></IconEye>
									<Range
										color='primary'
										className='my-auto'
										min={0}
										max={100}
										onChange={(ev) => {
											setOpacity(ev.currentTarget.value as unknown as number);
										}}
										value={opacity}
									></Range>
								</div>

								<ContextMenu
									position='right-end'
									showOnEnter
									show
									menu={
										<>
											<div
												className='flex flex-auto cursor-pointer select-none rounded p-2 hover:bg-neutral'
												onMouseDown={exportAsPng}
											>
												<div className='my-auto flex flex-auto flex-row gap-2'>
													<IconPng></IconPng>
													<p>Export as PNG</p>
												</div>
											</div>
											<div
												className='flex flex-auto cursor-pointer select-none rounded p-2 hover:bg-neutral'
												onMouseDown={exportAsJpeg}
											>
												<div className='my-auto flex flex-auto flex-row gap-2'>
													<IconJpg></IconJpg>
													<p>Export as JPG</p>
												</div>
											</div>
											<div
												className='flex flex-auto cursor-pointer select-none rounded p-2 hover:bg-neutral'
												onMouseDown={exportAsSvg}
											>
												<div className='my-auto flex flex-auto flex-row gap-2'>
													<IconSvg></IconSvg>
													<p>Export as SVG</p>
												</div>
											</div>
										</>
									}
								>
									<div className='flex flex-auto cursor-pointer select-none rounded p-2 hover:bg-neutral'>
										<div className='my-auto flex flex-auto flex-row gap-2'>
											<IconCamera className='my-auto' size={22}></IconCamera>
											<p className='my-auto'>Save Component</p>
										</div>
									</div>
								</ContextMenu>

								{/* Delete Block */}
								<div
									onClick={() => {
										setID('');
										setVisibility(false);
									}}
									className='flex flex-auto cursor-pointer select-none rounded p-2 hover:bg-neutral'
								>
									<div className='my-auto flex flex-auto flex-row gap-2'>
										<IconTrash className='my-auto' size={22}></IconTrash>
										<p className='my-auto'>Delete Component</p>
									</div>
								</div>
							</div>
						</motion.div>
					</Portal>
				)}
			</AnimatePresence>
		</AnimatePresence>
	);
};
