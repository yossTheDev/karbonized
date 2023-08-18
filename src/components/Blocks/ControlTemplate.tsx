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
import { useControlState } from '../../hooks/useControlState';

interface ControlProps {
	id: string;
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
	id,
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
	const controlID = useStoreState((state) => state.currentControlID);
	const workspaceName = useStoreState((state) => state.workspaceName);

	const controls = useStoreState((state) => state.ControlsTree);
	const controlSize = useStoreState((state) => state.controlSize);
	const controlTransform = useStoreState((state) => state.controlTransform);
	const setControlSize = useStoreActions((state) => state.setControlSize);
	const controlPos = useStoreState((state) => state.controlPosition);
	const setControlPos = useStoreActions((state) => state.setControlPosition);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);
	const setEditing = useStoreActions((state) => state.setEditing);
	const pastHistory = useStoreState((state) => state.pastHistory);
	const setPastHistory = useStoreActions((state) => state.setPast);
	const setFutureHistory = useStoreActions((state) => state.setFuture);
	const setControlState = useStoreActions((state) => state.setControlState);
	const setControls = useStoreActions((state) => state.setControls);
	const setWorkspaceControls = useStoreActions(
		(state) => state.setWorkspaceControls,
	);

	const setID = useStoreActions((state) => state.setcurrentControlID);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);
	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);

	// Component States
	const [zIndex, setzIndex] = useControlState('0', `${id}-zindex`);
	const [visibility, setVisibility] = useControlState(true, `${id}-visibility`);
	const [contextMenu, setContextMenu] = useState(false);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), shift(), flip()],
		placement: 'right',
	});

	/* Position and Size */
	const [transform, setTransform] = useControlState(
		'',
		`${id}-transform`,
		true,
	);
	const [position, setPosition] = useControlState(
		{ x: 33, y: 190 },
		`${id}-pos`,
		true,
	);
	const [size, setSize] = useControlState(
		{
			w: defaultWidth.replace('px', '') as unknown as number,
			h: defaultHeight.replace('px', '') as unknown as number,
		},
		`${id}-control_size`,
		true,
	);
	const [borderRadius, setBorderRadius] = useControlState(
		border,
		`${id}-borderRadius`,
	);

	/* Flip */
	const [flipX, setFlipX] = useControlState(false, `${id}-flipx`);
	const [flipY, setFlipY] = useControlState(false, `${id}-flipy`);

	/* Rotation */
	const [rotateX, setRotateX] = useControlState(0, `${id}-rotatex`);
	const [rotateY, setRotateY] = useControlState(0, `${id}-rotatey`);

	/* Filters */
	const [blur, setBlur] = useControlState(0, `${id}-blur`);
	const [brightness, setBrightness] = useControlState(100, `${id}-brightness`);
	const [contrast, setContrast] = useControlState(100, `${id}-contrast`);
	const [grayscale, setGrayscale] = useControlState(0, `${id}-grayscale`);
	const [huerotate, setHueRotate] = useControlState(0, `${id}-huerotate`);
	const [invert, setInvert] = useControlState(0, `${id}-invert`);
	const [saturate, setSaturate] = useControlState(100, `${id}-saturate`);
	const [opacity, setOpacity] = useControlState(100, `${id}-opacity`);
	const [sepia, setSepia] = useControlState(0, `${id}-sepia`);

	/* Shadow */
	const [shadowX, setShadowX] = useControlState(0, `${id}-shadowX`);
	const [shadowY, setShadowY] = useControlState(0, `${id}-shadowY`);
	const [shadowBlur, setShadowBlur] = useControlState(0, `${id}-shadowBlur`);
	const [shadowColor, setShadowColor] = useControlState(
		'#090b11',
		`${id}-shadowColor`,
	);

	const [mask, setMask] = useControlState('', `${id}-mask`);
	const [maskRepeat, setMaskRepeat] = useControlState(
		false,
		`${id}-maskRepeat`,
	);

	/* Delete Element when Delete Key is pressed */
	const isPressed = useKeyPress('Delete');
	useEffect(() => {
		if (controlID === id) {
			setVisibility(false);
			setID('');

			setWorkspaceControls(
				currentWorkspace.controls.map((item) =>
					item.id === id ? { ...item, isDeleted: true } : item,
				),
			);
		}
	}, [isPressed]);

	useEffect(() => {
		if (visibility) {
			setWorkspaceControls(
				currentWorkspace.controls.map((item) =>
					item.id === id ? { ...item, isDeleted: false } : item,
				),
			);
		}
	}, [visibility]);

	/* Manage Controls Visibility */
	useEffect(() => {
		if (!visibility) {
			setControls(
				controls.map((item) =>
					item.id === id ? { ...item, isDeleted: true } : item,
				),
			);
		} else {
			setControls(
				controls.map((item) =>
					item.id === id ? { ...item, isDeleted: false } : item,
				),
			);
		}
	}, [visibility]);

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
		if (id === controlID) {
			setPosition({
				x: controlPos?.x as unknown as number,
				y: controlPos?.y as unknown as number,
			});
		}
	}, [controlPos]);

	useEffect(() => {
		if (id === controlID) {
			setSize({
				w: controlSize?.w as unknown as number,
				h: controlSize?.h as unknown as number,
			});
		}
	}, [controlSize]);

	useEffect(() => {
		if (id === controlID) {
			setTransform(controlTransform);

			//console.log(controlTransform);
			//console.log(transform);
		}
	}, [controlTransform]);

	useEffect(() => {
		console.log('actualizado');
	}, [transform]);

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
					id={id}
					key={id}
					onMouseEnter={() => {
						setContextMenu(false);
						console.log(id);
					}}
					onContextMenu={(e) => {
						setContextMenu(!contextMenu);
						//setDisable(true);
						e.preventDefault();
					}}
					className={`absolute flex flex-auto select-none block-${id} ${
						!maskRepeat && 'mask'
					}  ${mask}`}
					style={{
						zIndex: zIndex,
						height: size.h + 'px',
						width: size.w + 'px',
						maxHeight: maxHeight,
						maxWidth: maxWidth,
						minHeight: minHeight,
						minWidth: minWidth,
						left: position.x,
						top: position.y,
						transform: transform,
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, marginTop: '100px' }}
					transition={{ duration: 0.1 }}
				>
					<div
						className='flex flex-auto'
						onClick={() => {
							setID(id);
							setControlPos({
								x: position.x,
								y: position.y,
							});
							setControlSize({
								w: size.w,
								h: size.h,
							});
						}}
						onTouchStart={() => {
							setID(id);
							setControlPos({
								x: position.x,
								y: position.y,
							});
							setControlSize({
								w: size.w,
								h: size.h,
							});
						}}
						onDoubleClick={() => {
							setWorkspaceTab('control');

							if (workspaceMode !== 'edit') {
								setWorkspaceMode('edit');
							} else {
								setWorkspaceMode('zen');
							}
						}}
						ref={reference}
					>
						<div
							ref={ref}
							style={{
								borderRadius: borderRadius + 'px',
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
			{controlID === id && (
				<Portal
					key={id + '_control_menu'}
					node={document.getElementById('menu')}
				>
					<motion.div
						initial={{ marginTop: '25px' }}
						animate={{ marginTop: '5px' }}
						className='flex flex-col gap-1 text-xs font-bold text-base-content'
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
							<div className='flex flex-col flex-wrap text-xs text-base-content'>
								{/* Flip Options */}
								<div className='flex flex-auto gap-2'>
									<Button
										color='neutral'
										className='flex flex-auto text-base-content'
										onClick={() => setFlipX(!flipX)}
									>
										<IconFlipVertical></IconFlipVertical>
									</Button>
									<Button
										color='neutral'
										className='flex flex-auto text-base-content'
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
											type={'number'}
											className='w-full rounded-xl bg-base-100 p-2  text-xs'
											onChange={(ev) => {
												setPastHistory([
													...pastHistory,
													{
														id: `${id}-pos`,
														value: {
															x: controlPos?.x as unknown as number,
															y: controlPos?.y as unknown as number,
														},
													},
												]);
												setControlState({
													id: `${id}-pos`,
													value: {
														x: parseFloat(ev.target.value),
														y: controlPos?.y as unknown as number,
													},
												});
												setControlPos({
													x: parseFloat(ev.target.value),
													y: controlPos?.y as unknown as number,
												});

												setFutureHistory([]);
											}}
											value={controlPos?.x}
										></Input>
									</div>
									{/* Position Y */}
									<div className='flex flex-auto  p-2 text-xs'>
										<p className='my-auto p-2'>Y:</p>
										<Input
											type={'number'}
											className='w-full rounded-xl bg-base-100  p-2 text-xs'
											onChange={(ev) => {
												setPastHistory([
													...pastHistory,
													{
														id: `${id}-pos`,
														value: {
															x: controlPos?.x as unknown as number,
															y: controlPos?.y as unknown as number,
														},
													},
												]);
												setControlState({
													id: `${id}-pos`,
													value: {
														y: parseFloat(ev.target.value),
														x: controlPos?.y as unknown as number,
													},
												});

												setControlPos({
													y: parseFloat(ev.target.value),
													x: controlPos?.x as unknown as number,
												});

												setFutureHistory([]);
											}}
											value={controlPos?.y}
										></Input>
									</div>
								</div>

								{/* Position Z */}
								<div className='flex flex-auto p-2 text-xs '>
									<p className='my-auto p-2'>Z:</p>

									<Input
										type={'number'}
										className='w-full rounded-xl bg-base-100 p-2 text-xs'
										onChange={(ev) => {
											setzIndex(ev.currentTarget.value);
										}}
										value={parseInt(zIndex)}
									></Input>
								</div>

								{/* Size */}
								<div className='flex flex-row'>
									<div className='flex flex-auto  p-2 '>
										<p className='my-auto p-2'>W:</p>
										<Input
											type={'number'}
											className='w-full rounded-xl bg-base-100 p-2 text-xs'
											onChange={(ev) => {
												setPastHistory([
													...pastHistory,
													{
														id: `${id}-control_size`,
														value: {
															w: controlSize?.w as unknown as number,
															h: controlSize?.h as unknown as number,
														},
													},
												]);
												setControlState({
													id: `${id}-control_size`,
													value: {
														w: parseFloat(ev.target.value),
														h: controlSize?.h as unknown as number,
													},
												});

												setControlSize({
													w: parseFloat(ev.target.value),
													h: controlSize?.h as unknown as number,
												});

												setFutureHistory([]);
											}}
											value={controlSize?.w}
										></Input>
									</div>

									<div className='flex flex-auto  p-2 '>
										<p className='my-auto p-2'>H:</p>
										<Input
											type={'number'}
											className='w-full rounded-xl bg-base-100  p-2 text-xs'
											onChange={(ev) => {
												setPastHistory([
													...pastHistory,
													{
														id: `${id}-control_size`,
														value: {
															w: controlSize?.w as unknown as number,
															h: controlSize?.h as unknown as number,
														},
													},
												]);
												setControlState({
													id: `${id}-control_size`,
													value: {
														h: parseFloat(ev.target.value),
														w: controlSize?.w as unknown as number,
													},
												});

												setControlSize({
													w: controlSize?.w as unknown as number,
													h: parseFloat(ev.target.value),
												});

												setFutureHistory([]);
											}}
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
										color='neutral'
										onMouseDown={() => {
											setRotateX(0);
											setRotateY(0);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
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
											<Input
												type={'number'}
												className='w-full rounded-xl bg-base-100 p-2 text-xs'
												onChange={(ev) => {
													setShadowX(ev.currentTarget.value);
												}}
												value={shadowX}
											></Input>
										</div>
										{/* Shadow Y */}
										<div className='flex flex-auto p-2 text-xs'>
											<p className='my-auto p-2'>Y:</p>
											<Input
												type={'number'}
												className='w-full rounded-xl bg-base-100 p-2 text-xs'
												onChange={(ev) => {
													setShadowY(ev.currentTarget.value);
												}}
												value={shadowY}
											></Input>
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
												setBorderRadius(ev.target.value as unknown as number)
											}
											value={borderRadius}
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
											onChange={(e) => setMask(e.currentTarget.value)}
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
								<div className='flex flex-auto flex-row gap-2 '>
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
										color='neutral'
										onMouseDown={() => {
											setBlur(-1 * 1);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
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
												ev.currentTarget.value as unknown as number,
											);
										}}
										value={brightness}
									></Range>
									<Button
										color='neutral'
										onMouseDown={() => {
											setBrightness(100);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
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
										color='neutral'
										className='my-auto flex flex-auto p-1 text-base-content'
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
										color='neutral'
										onMouseDown={() => {
											setGrayscale(0);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
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
										color='neutral'
										onMouseDown={() => {
											setHueRotate(0);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
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
										color='neutral'
										onMouseDown={() => {
											setInvert(0);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
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
										color='neutral'
										onMouseDown={() => {
											setSaturate(100);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
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
										color='neutral'
										onMouseDown={() => {
											setSepia(0);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
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
										color='neutral'
										onMouseDown={() => {
											setOpacity(100);
										}}
										className='my-auto flex flex-auto p-1 text-base-content'
									>
										<IconReload size={18}></IconReload>
									</Button>
								</div>
							</div>
						</CustomCollapse>

						{menu}

						{/* Custom Components Menu */}
						<div id='custom_menu'></div>

						{/* Delete */}
						<button
							onClick={() => {
								setID('');
								setVisibility(false);

								setWorkspaceControls(
									currentWorkspace.controls.map((item) =>
										item.id === id ? { ...item, isDeleted: true } : item,
									),
								);
							}}
							className='btn mt-auto flex max-h-12  flex-auto cursor-pointer flex-row gap-2 rounded-2xl p-2 transition-all hover:bg-red-600 hover:text-white active:scale-90'
						>
							<div className='mx-auto my-auto flex flex-row gap-2'>
								<IconTrash size={18}></IconTrash>
								<label className='poppins-font-family my-auto cursor-pointer text-xs'>
									Delete Component
								</label>
							</div>
						</button>
					</motion.div>
				</Portal>
			)}

			{/* Context Menu */}
			<AnimatePresence>
				{contextMenu && controlID === id && (
					<Portal key={id + '_menu'} node={document.getElementById('body')}>
						<motion.div
							key={id + '_menu'}
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
