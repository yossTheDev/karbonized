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
import { IconEye } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import React, { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { useControlState } from '../../hooks/useControlState';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ControlMenu } from './ControlMenu';

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
				<ControlMenu
					id={id}
					controlID={controlID}
					menu={menu}
					shadowEditable={shadowEditable}
					maskEditable={maskEditable}
					borderEditable={borderEditable}
					Masks={Masks}
					controlPos={controlPos}
					controlSize={controlSize}
					pastHistory={pastHistory}
					setPastHistory={setPastHistory}
					setFutureHistory={setFutureHistory}
					setControlState={setControlState}
					setControlPos={setControlPos}
					setControlSize={setControlSize}
					currentWorkspace={currentWorkspace}
					setWorkspaceControls={setWorkspaceControls}
					setID={setID}
					flipX={flipX}
					setFlipX={setFlipX}
					flipY={flipY}
					setFlipY={setFlipY}
					zIndex={zIndex}
					setzIndex={setzIndex}
					rotateX={rotateX}
					setRotateX={setRotateX}
					rotateY={rotateY}
					setRotateY={setRotateY}
					shadowX={shadowX}
					setShadowX={setShadowX}
					shadowY={shadowY}
					setShadowY={setShadowY}
					shadowBlur={shadowBlur}
					setShadowBlur={setShadowBlur}
					shadowColor={shadowColor}
					setShadowColor={setShadowColor}
					borderRadius={borderRadius}
					setBorderRadius={setBorderRadius}
					mask={mask}
					setMask={setMask}
					maskRepeat={maskRepeat}
					setMaskRepeat={setMaskRepeat}
					blur={blur}
					setBlur={setBlur}
					brightness={brightness}
					setBrightness={setBrightness}
					contrast={contrast}
					setContrast={setContrast}
					grayscale={grayscale}
					setGrayscale={setGrayscale}
					huerotate={huerotate}
					setHueRotate={setHueRotate}
					invert={invert}
					setInvert={setInvert}
					saturate={saturate}
					setSaturate={setSaturate}
					opacity={opacity}
					setOpacity={setOpacity}
					sepia={sepia}
					setSepia={setSepia}
				/>
			</AnimatePresence>
		</>
	);
};
