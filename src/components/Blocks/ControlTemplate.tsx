/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Slider } from '@/components/ui/slider';
import { ContextMenuSub } from '@radix-ui/react-context-menu';
import {
	IconBorderStyle,
	IconColorFilter,
	IconEye,
	IconFlipHorizontal,
	IconFlipVertical,
	IconMask,
	IconReload,
	IconShadow,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import { Move3D, Trash2 } from 'lucide-react';
import React, { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { Checkbox } from 'react-daisyui';
import { Portal } from 'react-portal';
import { useControlState } from '../../hooks/useControlState';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

interface ControlProps {
	id: string;
	color?: string;
	children?: ReactNode;
	contextMenu?: ReactNode;
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

	onClick?: () => void;
}

export const ControlTemplate: React.FC<ControlProps> = ({
	id,
	color,
	children,
	contextMenu,
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
	const [clip] = useControlState('', `${id}-clip`, true);
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

			if (currentWorkspace !== undefined)
				setWorkspaceControls(
					currentWorkspace.controls.map((item) =>
						item.id === id ? { ...item, isDeleted: true } : item,
					),
				);
		}
	}, [isPressed]);

	/* Manage Controls Visibility */
	useEffect(() => {
		if (visibility) {
			if (currentWorkspace !== undefined)
				setWorkspaceControls(
					currentWorkspace.controls.map((item) =>
						item.id === id ? { ...item, isDeleted: false } : item,
					),
				);
		}

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
			if (controlTransform !== undefined) setTransform(controlTransform);
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

	// Save Image as JPEG
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
		<>
			<AnimatePresence>
				{visibility && (
					<ContextMenu>
						<ContextMenuTrigger>
							<motion.div
								id={id}
								key={id}
								onMouseEnter={() => {
									console.log(id);
								}}
								className={`absolute flex flex-auto select-none block-${id} ${
									!maskRepeat && 'mask'
								}  ${mask}`}
								style={{
									zIndex,
									height: size.h + 'px',
									width: size.w + 'px',
									maxHeight,
									maxWidth,
									minHeight,
									minWidth,
									left: position.x,
									top: position.y,
									transform,
									clipPath: clip,
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
								>
									<div
										id={'control-' + id}
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
						</ContextMenuTrigger>
						<ContextMenuContent className='w-48'>
							<div className='flex gap-2 px-1 py-2'>
								<IconEye className='my-auto ml-2' size={22}></IconEye>
								<Slider
									color='primary'
									className='my-auto'
									min={0}
									max={100}
									onValueChange={(value) => {
										setOpacity(value[0]);
									}}
									value={[opacity]}
								></Slider>
							</div>

							<ContextMenuSub>
								<ContextMenuSubTrigger>Export as</ContextMenuSubTrigger>
								<ContextMenuSubContent className='w-48'>
									<ContextMenuItem
										onClick={async () => {
											await exportAsPng();
										}}
									>
										Export as PNG
									</ContextMenuItem>
									<ContextMenuItem
										onClick={async () => {
											await exportAsJpeg();
										}}
									>
										Export as JPEG
									</ContextMenuItem>
									<ContextMenuItem
										onClick={async () => {
											await exportAsSvg();
										}}
									>
										Export as SVG
									</ContextMenuItem>
								</ContextMenuSubContent>
							</ContextMenuSub>

							{contextMenu !== undefined && (
								<>
									<ContextMenuSeparator></ContextMenuSeparator>
									{contextMenu}
								</>
							)}

							<ContextMenuSeparator></ContextMenuSeparator>

							<ContextMenuItem
								onClick={() => {
									setID('');
									setVisibility(false);
								}}
							>
								Remove
							</ContextMenuItem>
						</ContextMenuContent>
					</ContextMenu>
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
							className='flex flex-col gap-2'
						>
							{/* Position */}
							<CustomCollapse
								menu={
									<div className='flex items-center gap-2'>
										<Move3D size={22}></Move3D>
										<Label>Position</Label>
									</div>
								}
							>
								<div className='flex flex-col gap-4'>
									{/* Flip Options */}
									<div className='flex flex-auto gap-2'>
										<Button
											color='neutral'
											className='text-base-content flex flex-auto'
											onClick={() => {
												setFlipX(!flipX);
											}}
										>
											<IconFlipVertical></IconFlipVertical>
										</Button>
										<Button
											color='neutral'
											className='text-base-content flex flex-auto'
											onClick={() => {
												setFlipY(!flipY);
											}}
										>
											<IconFlipHorizontal></IconFlipHorizontal>
										</Button>
									</div>

									{/* Position */}
									<div className='flex gap-2'>
										{/* Position X */}
										<div className='flex items-center gap-2'>
											<p className='my-auto p-2'>X:</p>
											<Input
												type={'number'}
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
										<div className='flex items-center gap-2'>
											<Label>Y:</Label>
											<Input
												type={'number'}
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

										{/* Position Z */}
										<div className='flex items-center gap-2'>
											<Label>Z:</Label>
											<Input
												type={'number'}
												onChange={(ev) => {
													setzIndex(ev.currentTarget.value);
												}}
												value={parseInt(zIndex)}
											></Input>
										</div>
									</div>

									{/* Size */}
									<div className='flex flex-row gap-2'>
										<div className='flex items-center gap-2'>
											<Label>W:</Label>
											<Input
												type={'number'}
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

										<div className='flex items-center gap-2'>
											<Label>H:</Label>
											<Input
												type={'number'}
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
									<Label>Rotation</Label>

									<div className='flex gap-2'>
										{/* Rotation X */}
										<div className='flex w-1/3 gap-2 text-xs'>
											<p className='my-auto p-2'>X:</p>
											<Slider
												color='primary'
												min={-180}
												max={180}
												onValueChange={(ev) => {
													setRotateX(ev[0]);
												}}
												value={[rotateX]}
											></Slider>
										</div>

										{/* Rotation Y */}
										<div className='flex w-1/3 gap-2 text-xs'>
											<p className='my-auto p-2'>Y:</p>
											<Slider
												color='primary'
												min={-180}
												max={180}
												onValueChange={(ev) => {
													setRotateY(ev[0]);
												}}
												value={[rotateY]}
											></Slider>
										</div>

										<Button
											size={'icon'}
											color='neutral'
											onClick={() => {
												setRotateX(0);
												setRotateY(0);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
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
										<div className='flex flex-row items-center gap-2'>
											<IconShadow size={22}></IconShadow>
											<Label>Shadow</Label>
										</div>
									}
								>
									<div className='flex flex-col gap-4'>
										{/* Position */}
										<div className='flex gap-2'>
											{/* Shadow X */}
											<div className='flex items-center gap-2'>
												<Label>X:</Label>
												<Input
													type={'number'}
													onChange={(ev) => {
														setShadowX(parseFloat(ev.currentTarget.value));
													}}
													value={shadowX}
												></Input>
											</div>
											{/* Shadow Y */}
											<div className='flex  items-center gap-2'>
												<Label>Y:</Label>
												<Input
													type={'number'}
													onChange={(ev) => {
														setShadowY(parseFloat(ev.currentTarget.value));
													}}
													value={shadowY}
												></Input>
											</div>
										</div>

										{/* Shadow Blur */}
										<div className='flex items-center gap-2'>
											<Label>Blur</Label>
											<Slider
												className='my-auto'
												color='primary'
												onValueChange={(ev) => {
													setShadowBlur(ev[0]);
												}}
												value={[shadowBlur]}
												max={100}
											></Slider>
										</div>

										{/* Shadow Color */}
										<div className='flex flex-col'>
											<ColorPicker
												type='HexAlpha'
												label='Shadow Color'
												color={shadowColor}
												onColorChange={(color) => {
													setShadowColor(color);
												}}
											></ColorPicker>
										</div>
									</div>
								</CustomCollapse>
							)}

							{/* Border  */}
							{borderEditable && (
								<CustomCollapse
									menu={
										<div className='flex items-center gap-2'>
											<IconBorderStyle size={22}></IconBorderStyle>
											<Label>Border</Label>
										</div>
									}
								>
									<div className='flex gap-2'>
										<Label>Radius:</Label>
										<Slider
											onValueChange={(ev) => {
												setBorderRadius(ev[0]);
											}}
											value={[borderRadius]}
											max={22}
										></Slider>
									</div>
								</CustomCollapse>
							)}

							{/* Mask */}
							{maskEditable && (
								<CustomCollapse
									menu={
										<div className='flex flex-row gap-2'>
											<IconMask size={22}></IconMask>
											<p className='my-auto font-bold'>Mask</p>
										</div>
									}
								>
									<div className='flex'>
										{/* Select Mask */}
										<div className='flex flex-auto p-2 '>
											<Select
												value={mask}
												onValueChange={(e: string) => {
													setMask(e);
													// FIX Mask is not Working
												}}
											>
												<SelectTrigger>
													<SelectValue placeholder='Mask Shape' />
												</SelectTrigger>
												<SelectContent>
													{Masks.map((i) => {
														return (
															<SelectItem key={i} value={i}>
																{i.replace('mask-', '').replace('-', ' ')}
															</SelectItem>
														);
													})}
												</SelectContent>
											</Select>
										</div>

										<div className='m-2 flex flex-row gap-2'>
											<p className='my-auto text-xs'>Mask Repeat</p>
											<Checkbox
												color='primary'
												onChange={(ev) => {
													setMaskRepeat(ev.currentTarget.checked);
												}}
												checked={maskRepeat}
											></Checkbox>
										</div>
									</div>
								</CustomCollapse>
							)}

							{/* Filters */}
							<CustomCollapse
								menu={
									<div className='flex flex-row gap-2'>
										<IconColorFilter size={22}></IconColorFilter>
										<p className='my-auto font-bold'>Filters</p>
									</div>
								}
							>
								<div className='flex flex-col flex-wrap gap-2 text-xs'>
									{/* Blur Options */}
									<div className='flex flex-auto flex-row gap-2 '>
										<p className='my-auto p-2'>Blur:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={-1}
											max={100}
											onValueChange={(ev) => {
												setBlur(ev[0]);
											}}
											value={[blur]}
										></Slider>
										<Button
											color='neutral'
											onMouseDown={() => {
												setBlur(-1 * 1);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
										>
											<IconReload size={18}></IconReload>
										</Button>
									</div>

									{/* Brightness Options */}
									<div className='flex flex-auto flex-row gap-2'>
										<p className='my-auto p-2'>Brightness:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={1}
											max={200}
											onValueChange={(ev) => {
												setBrightness(ev[0]);
											}}
											value={[brightness]}
										></Slider>
										<Button
											color='neutral'
											onClick={() => {
												setBrightness(100);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
										>
											<IconReload size={18}></IconReload>
										</Button>
									</div>

									{/* Contrast Options */}
									<div className='flex flex-auto flex-row gap-2'>
										<p className='my-auto p-2'>Contrast:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={100}
											max={300}
											onValueChange={(ev) => {
												setContrast(ev[0]);
											}}
											value={[contrast]}
										></Slider>
										<Button
											onMouseDown={() => {
												setContrast(100);
											}}
											color='neutral'
											className='text-base-content my-auto flex flex-auto p-1'
										>
											<IconReload size={18}></IconReload>
										</Button>
									</div>

									{/* Grayscale Options */}
									<div className='flex flex-auto flex-row gap-2'>
										<p className='my-auto p-2'>Grayscale:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={0}
											max={100}
											onValueChange={(ev) => {
												setGrayscale(ev[0]);
											}}
											value={[grayscale]}
										></Slider>
										<Button
											color='neutral'
											onMouseDown={() => {
												setGrayscale(0);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
										>
											<IconReload size={18}></IconReload>
										</Button>
									</div>

									{/* Hue Rotate Options */}
									<div className='flex flex-auto flex-row gap-2'>
										<p className='my-auto p-2'>Hue Rotate:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={0}
											max={359}
											onValueChange={(ev) => {
												setHueRotate(ev[0]);
											}}
											value={[huerotate]}
										></Slider>
										<Button
											color='neutral'
											onMouseDown={() => {
												setHueRotate(0);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
										>
											<IconReload size={18}></IconReload>
										</Button>
									</div>

									{/* Invert Options */}
									<div className='flex flex-auto flex-row gap-2'>
										<p className='my-auto p-2'>Invert:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={0}
											max={100}
											onValueChange={(ev) => {
												setInvert(ev[0]);
											}}
											value={[invert]}
										></Slider>
										<Button
											color='neutral'
											onMouseDown={() => {
												setInvert(0);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
										>
											<IconReload size={18}></IconReload>
										</Button>
									</div>

									{/* Saturate Options */}
									<div className='flex flex-auto flex-row gap-2'>
										<p className='my-auto p-2'>Saturate:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={0}
											max={200}
											onValueChange={(ev) => {
												setSaturate(ev[0]);
											}}
											value={[saturate]}
										></Slider>
										<Button
											color='neutral'
											onMouseDown={() => {
												setSaturate(100);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
										>
											<IconReload size={18}></IconReload>
										</Button>
									</div>

									{/* Sepia Options */}
									<div className='flex flex-auto flex-row gap-2'>
										<p className='my-auto p-2'>Sepia:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={0}
											max={100}
											onValueChange={(ev) => {
												setSepia(ev[0]);
											}}
											value={[sepia]}
										></Slider>
										<Button
											color='neutral'
											onMouseDown={() => {
												setSepia(0);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
										>
											<IconReload size={18}></IconReload>
										</Button>
									</div>

									{/* Opacity Options */}
									<div className='flex flex-auto flex-row gap-2'>
										<p className='my-auto p-2'>Opacity:</p>
										<Slider
											color='primary'
											className='my-auto'
											min={0}
											max={100}
											onValueChange={(ev) => {
												setOpacity(ev[0]);
											}}
											value={[opacity]}
										></Slider>
										<Button
											color='neutral'
											onMouseDown={() => {
												setOpacity(100);
											}}
											className='text-base-content my-auto flex flex-auto p-1'
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
							<Button
								variant={'destructive'}
								onClick={() => {
									setID('');
									setVisibility(false);
									if (currentWorkspace !== undefined)
										setWorkspaceControls(
											currentWorkspace.controls.map((item) =>
												item.id === id ? { ...item, isDeleted: true } : item,
											),
										);
								}}
							>
								<Trash2 className='mr-2' size={18}></Trash2>
								Delete Component
							</Button>
						</motion.div>
					</Portal>
				)}
			</AnimatePresence>
		</>
	);
};
