/* eslint-disable array-callback-return */
import React, { type RefObject, Suspense } from 'react';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { ControlHandler } from './Blocks/ControlHandler';
import { DynamicBackground } from './Misc/DynamicBackground';
import Moveable, {
	type OnDrag,
	type OnResize,
	type OnScale,
	type OnRotate,
	type OnScaleGroup,
	type OnDragGroup,
	type OnResizeGroup,
	type OnRotateGroup,
	type OnRotateStart,
	type OnWarpStart,
	type OnWarp,
} from 'react-moveable';
import WorkspaceTexture from './WorkspaceTexture';
import { Canvas } from './Canvas';
import { Wallpapers } from '../utils/wallpapers';
import noiseTexture from '../assets/noisy.png';

interface Props {
	reference: RefObject<HTMLDivElement>;
}
export const Workspace: React.FC<Props> = ({ reference }) => {
	/* App Store */
	const controlID = useStoreState((state) => state.currentControlID);
	const controlsClass = useStoreState((state) => state.controlsClass);

	const editing = useStoreState((state) => state.editing);
	const crop = useStoreState((state) => state.crop);
	const warp = useStoreState((state) => state.warp);
	const lockAspect = useStoreState((state) => state.lockAspect);
	const isExporting = useStoreState((state) => state.isExporting);

	const workspaces = useStoreState((state) => state.workspaces);
	const currentWorkspaceID = useStoreState((state) => state.currentWorkspaceID);

	const setControlTransform = useStoreActions(
		(state) => state.setControlTransform,
	);
	const setControlSize = useStoreActions((state) => state.setControlSize);
	const setControlPos = useStoreActions((state) => state.setControlPosition);

	const setControlState = useStoreActions((state) => state.setControlState);
	const pastHistory = useStoreState((state) => state.pastHistory);
	const setPastHistory = useStoreActions((state) => state.setPast);
	const setFutureHistory = useStoreActions((state) => state.setFuture);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);
	const blurAmount = currentWorkspace?.workspaceBlur ?? 0;
	const noiseAmount = currentWorkspace?.workspaceNoise ?? 0;
	const blurSpread = Math.max(blurAmount * 2, 0);
	const dynamicColors = currentWorkspace?.workspaceDynamicSettings.colors ?? [];

	const workspaceBaseBackground =
		currentWorkspace?.workspaceType === 'dynamic' && dynamicColors.length > 0
			? `linear-gradient(135deg, ${dynamicColors[0]}, ${
					dynamicColors[1] ?? dynamicColors[0]
				}, ${dynamicColors[2] ?? dynamicColors[1] ?? dynamicColors[0]})`
			: currentWorkspace?.workspaceColorMode === 'Single'
				? currentWorkspace?.workspaceColor
				: `linear-gradient(${currentWorkspace?.workspaceGradientSettings.deg}deg, ${currentWorkspace?.workspaceGradientSettings.color1},${currentWorkspace?.workspaceGradientSettings.color2})`;

	const renderWorkspaceBackground = (useBlurCompensation = false) => {
		const sizeStyle = useBlurCompensation
			? {
					height: `calc(100% + ${blurSpread * 2}px)`,
					width: `calc(100% + ${blurSpread * 2}px)`,
					left: `-${blurSpread}px`,
					top: `-${blurSpread}px`,
				}
			: {
					height: currentWorkspace?.workspaceHeight + 'px',
					width: currentWorkspace?.workspaceWidth + 'px',
				};

		return (
			<>
				<div
					className='absolute inset-0'
					style={{
						background: workspaceBaseBackground,
					}}
				/>

				{currentWorkspace?.workspaceType === 'texture' && (
					<div className='absolute overflow-hidden' style={sizeStyle}>
						<Suspense fallback={<></>}>
							<WorkspaceTexture
								texture={currentWorkspace?.textureName}
							></WorkspaceTexture>
						</Suspense>
					</div>
				)}

				{currentWorkspace?.workspaceType === 'image' && (
					<div
						className='absolute overflow-hidden transition-all'
						style={sizeStyle}
					>
						<img
							className='flex h-full w-full select-none object-cover'
							src={
								Wallpapers.find(
									(item) => item.id === currentWorkspace?.textureName,
								)?.img
							}
						></img>
					</div>
				)}

				{currentWorkspace?.workspaceType === 'dynamic' && (
					<div className='absolute overflow-hidden' style={sizeStyle}>
						<DynamicBackground
							colors={currentWorkspace?.workspaceDynamicSettings.colors}
							blur={currentWorkspace?.workspaceBlur}
							seed={currentWorkspace?.workspaceDynamicSettings.seed}
							width={
								parseInt(currentWorkspace?.workspaceWidth || '512') +
								blurSpread * 2
							}
							height={
								parseInt(currentWorkspace?.workspaceHeight || '512') +
								blurSpread * 2
							}
						/>
					</div>
				)}
			</>
		);
	};

	return (
		<div ref={reference} id='workspace'>
			<div
				className='relative overflow-hidden shadow-2xl transition-all'
				style={{
					height: currentWorkspace?.workspaceHeight + 'px',
					width: currentWorkspace?.workspaceWidth + 'px',
				}}
			>
				<div className='absolute inset-0 overflow-hidden'>
					{renderWorkspaceBackground()}
				</div>

				{blurAmount > 0 && (
					<div className='absolute inset-0 overflow-hidden pointer-events-none'>
						<div
							className='absolute inset-0'
							style={{
								filter: `blur(${blurAmount}px)`,
							}}
						>
							{renderWorkspaceBackground(true)}
						</div>
					</div>
				)}

				{noiseAmount > 0 && (
					<div
						className='absolute inset-0 pointer-events-none'
						style={{
							opacity: noiseAmount / 100,
							backgroundImage: `url("${noiseTexture}")`,
							backgroundRepeat: 'repeat',
							backgroundSize: '160px 160px',
						}}
					></div>
				)}

				<div
					className='relative z-10'
					style={{
						height: currentWorkspace?.workspaceHeight + 'px',
						width: currentWorkspace?.workspaceWidth + 'px',
					}}
				>
					{workspaces.map((workspace: { id: string; controls: any[] }) => (
						<div
							className={`${
								currentWorkspaceID === workspace.id ? 'block' : 'hidden'
							}`}
							id={workspace.id}
							key={workspace.id}
						>
							{workspace.controls.map((item) => (
								<ControlHandler
									id={item.id}
									key={item.id}
									type={item.type}
									isVisible={item.isVisible}
								></ControlHandler>
							))}
						</div>
					))}

					<Canvas></Canvas>
				</div>
			</div>

			{editing && !isExporting && (
				<Moveable
					useResizeObserver
					target={document.getElementById(controlID)}
					origin={true}
					/* Resize event edges */
					edge={false}
					/* Snappable */
					snappable={true}
					snapContainer={reference}
					snapDirections={{
						top: true,
						bottom: true,
						left: true,
						right: true,
						center: true,
						middle: true,
					}}
					snapThreshold={10}
					verticalGuidelines={[
						0,
						parseFloat(currentWorkspace?.workspaceWidth ?? '1080') * 0.2,
						parseFloat(currentWorkspace?.workspaceWidth ?? '1080') / 2,
						parseFloat(currentWorkspace?.workspaceWidth ?? '1080') * 0.8,
						currentWorkspace?.workspaceWidth ?? 1080,
					]}
					horizontalGuidelines={[
						0,
						parseFloat(currentWorkspace?.workspaceHeight ?? '1980') * 0.2,
						parseFloat(currentWorkspace?.workspaceHeight ?? '1980') / 2,
						parseFloat(currentWorkspace?.workspaceHeight ?? '1980') * 0.8,
						currentWorkspace?.workspaceHeight ?? 1980,
					]}
					elementSnapDirections
					elementGuidelines={controlsClass}
					useAccuratePosition // TODO Not Available For Groups
					isDisplaySnapDigit
					snapGap
					snapRotationDegrees={[0, 90, 180, 270]}
					/* draggable */
					draggable={!crop}
					throttleDrag={0}
					onDragStart={({ target }) => {
						// console.log('onDragStart', target);
						setPastHistory([
							...pastHistory,
							{
								id: `${controlID}-pos`,
								value: {
									x: parseFloat(target.style.left.replace('px', '')),
									y: parseFloat(target.style.top.replace('px', '')),
								},
							},
						]);
					}}
					onDragGroup={({ targets, left, top }: OnDragGroup) => {
						// console.log('onDrag left, top', left, top);
						// target!.style.left = `${left}px`;
						// target!.style.top = `${top}px`;
						// console.log('onDrag translate', dist);
						// currentTarget.controlGesto.move(delta, MouseEvent);
						targets.map((el) => {
							el.style.left = `${left}px`;
							el.style.top = `${top}px`;
						});
						// console.log('group drag');
						// setPosition({ x: left, y: top });
					}}
					onDrag={({ target, left, top }: OnDrag) => {
						// console.log('onDrag left, top', left, top);
						target.style.left = `${left}px`;
						target.style.top = `${top}px`;
						// console.log('onDrag translate', dist);
						// target!.style.transform = transform;
						setControlPos({ x: left, y: top });
					}}
					onDragEnd={({ target }) => {
						setControlState({
							id: `${controlID}-pos`,
							value: {
								x: parseFloat(target.style.left.replace('px', '')),
								y: parseFloat(target.style.top.replace('px', '')),
							},
						});

						setFutureHistory([]);
					}}
					/* When resize or scale, keeps a ratio of the width, height. */
					keepRatio={lockAspect}
					/* resizable */
					/* Only one of resizable, scalable, warpable can be used. */
					resizable={!warp}
					throttleResize={0}
					onResizeStart={({ target }) => {
						setPastHistory([
							...pastHistory,
							{
								id: `${controlID}-control_size`,
								value: {
									w: parseFloat(target.style.width.replace('px', '')),
									h: parseFloat(target.style.height.replace('px', '')),
								},
							},
						]);
					}}
					onResize={({ target, width, height, delta }: OnResize) => {
						// console.log('onResize', target);
						delta[0] !== 0 && (target.style.width = `${width}px`);
						delta[1] !== 0 && (target.style.height = `${height}px`);
						// console.log('height' + target!.style.height);
						setControlSize({
							w: target.style.width.replace('px', '') as unknown as number,
							h: target.style.height.replace('px', '') as unknown as number,
						});
					}}
					onResizeGroup={({ targets, width, height, delta }: OnResizeGroup) => {
						targets.map((el) => {
							delta[0] !== 0 && (el.style.width = `${width}px`);
							delta[1] !== 0 && (el.style.height = `${height}px`);
						});

						// console.log('height' + target!.style.height);
						/* setSize({
							w: target!.style.width.replace('px', '') as unknown as number,
							h: target!.style.height.replace('px', '') as unknown as number,
						}); */
					}}
					onResizeEnd={({ target }) => {
						// console.log('onResizeEnd', target, isDrag);
						setControlState({
							id: `${controlID}-control_size`,
							value: {
								w: parseFloat(target.style.width.replace('px', '')),
								h: parseFloat(target.style.height.replace('px', '')),
							},
						});

						setFutureHistory([]);
					}}
					/* scalable */
					/* Only one of resizable, scalable, warpable can be used. */
					scalable={false}
					throttleScale={0}
					onScaleStart={() => {
						// console.log('onScaleStart', target);
					}}
					onScale={({ target, transform }: OnScale) => {
						// console.log('onScale scale', scale);
						target.style.transform = transform;
					}}
					onScaleGroup={({ targets, transform }: OnScaleGroup) => {
						targets.map((el) => {
							el.style.transform = transform;
						});
						// console.log('onScale scale', scale);
						// target!.style.transform = transform;
					}}
					onScaleEnd={({ target }) => {
						// console.log('onScaleEnd', target, isDrag);
					}}
					/* rotatable */
					rotatable={true}
					throttleRotate={0}
					onRotateStart={({ target }: OnRotateStart) => {
						setPastHistory([
							...pastHistory,
							{
								id: `${controlID}-transform`,
								value: target.style.transform,
							},
						]);
					}}
					onRotate={({ target, transform }: OnRotate) => {
						// console.log('onRotate', dist);
						target.style.transform = transform;
						setControlTransform(transform);
					}}
					onRotateGroup={({ target, targets, transform }: OnRotateGroup) => {
						// events.forEach(this.handleRotate);
						targets.map((el) => {
							// const frame = this.getFrame(target as HTMLElement | SVGAElement);
							// const beforeTranslate = drag.beforeTranslate;

							// el.style.rotate = `${beforeRotation}deg`;
							el.style.transform = transform; // .set('transform', 'translateX', `${beforeTranslate[0]}px`);
							// frame.set('transform', 'translateY', `${beforeTranslate[1]}px`);
							// target.style.cssText += frame.toCSS();
						});

						// console.log('onRotate', dist);
						target.style.transform = transform;
					}}
					onRotateEnd={({ target }) => {
						setControlState({
							id: `${controlID}-transform`,
							value: target.style.transform,
						});

						setFutureHistory([]);
						// console.log('onRotateEnd', target, isDrag);
					}}
					// Enabling pinchable lets you use events that
					// can be used in draggable, resizable, scalable, and rotateable.
					pinchable={false}
					onPinchStart={() => {
						// pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
						// console.log('onPinchStart');
					}}
					onPinch={() => {
						// pinch event occur before drag, rotate, scale, resize
						// console.log('onPinch');
					}}
					onPinchGroup={() => {
						// pinch event occur before drag, rotate, scale, resize
						// console.log('onPinch');
					}}
					onPinchEnd={() => {
						// pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
						// console.log('onPinchEnd');
					}}
					defaultGroupOrigin=''
					useMutationObserver
					clippable={crop}
					dragWithClip={false}
					clipTargetBounds
					onClip={(e) => {
						setControlState({
							id: `${controlID}-clip`,
							value: e.clipStyle,
							workspace: currentWorkspaceID,
						});

						e.target.style.clipPath = e.clipStyle;
					}}
					onClipStart={({ target }) => {
						setPastHistory([
							...pastHistory,
							{
								id: `${controlID}-clip`,
								value: target.style.clipPath,
							},
						]);
					}}
					onClipEnd={({ target }) => {
						// console.log('onResizeEnd', target, isDrag);
						setControlState({
							id: `${controlID}-clip`,
							value: target.style.clipPath,
						});

						setFutureHistory([]);
					}}
					warpable={warp}
					onWarpStart={({ target }: OnWarpStart) => {
						setPastHistory([
							...pastHistory,
							{
								id: `${controlID}-transform`,
								value: target.style.transform,
							},
						]);
					}}
					onWarp={({ target, transform }: OnWarp) => {
						// console.log('onRotate', dist);
						target.style.transform = transform;
						setControlTransform(transform);
					}}
					onWarpEnd={({ target }) => {
						setControlState({
							id: `${controlID}-transform`,
							value: target.style.transform,
						});

						setFutureHistory([]);
						// console.log('onRotateEnd', target, isDrag);
					}}
					renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
				/>
			)}
		</div>
	);
};

export default Workspace;
