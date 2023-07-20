import React, { RefObject, Suspense, useEffect } from 'react';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { ControlHandler } from './Blocks/ControlHandler';
import './Workspace.css';
import Moveable, {
	OnDrag,
	OnResize,
	OnScale,
	OnRotate,
	OnScaleGroup,
	OnDragGroup,
	OnResizeGroup,
	OnRotateGroup,
} from 'react-moveable';
import WorkspaceTexture from './WorkspaceTexture';
import { Canvas } from './Canvas';

interface Props {
	reference: RefObject<HTMLDivElement>;
}
export const Workspace: React.FC<Props> = ({ reference }) => {
	// App Store
	const controlPos = useStoreState((state) => state.controlPosition);

	const controls = useStoreState((state) => state.ControlsTree);
	const controlID = useStoreState((state) => state.currentControlID);
	const controlsClass = useStoreState((state) => state.controlsClass);

	const editing = useStoreState((state) => state.editing);
	const isDrawing = useStoreState((state) => state.isDrawing);
	const lockAspect = useStoreState((state) => state.lockAspect);

	const workspaceColor = useStoreState((state) => state.workspaceColor);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceType = useStoreState((state) => state.workspaceType);
	const workspaceTexture = useStoreState((state) => state.textureName);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	/* Workspace Colors */
	const workspaceColorMode = useStoreState((state) => state.workspaceColorMode);
	const workspaceGradient = useStoreState(
		(state) => state.workspaceGradientSettings
	);

	const setControlSize = useStoreActions((state) => state.setControlSize);
	const setControlPos = useStoreActions((state) => state.setControlPosition);

	const setControlState = useStoreActions((state) => state.setControlState);
	const pastHistory = useStoreState((state) => state.pastHistory);
	const setPastHistory = useStoreActions((state) => state.setPast);
	const setFutureHistory = useStoreActions((state) => state.setFuture);

	return (
		<>
			<div
				ref={reference}
				id='workspace'
				className='shadow-2xl'
				style={{
					background:
						workspaceColorMode === 'Single'
							? workspaceColor
							: `linear-gradient(${workspaceGradient.deg}deg, ${workspaceGradient.color1},${workspaceGradient.color2})`,
					height: workspaceHeight + 'px',
					width: workspaceWidth + 'px',
				}}
			>
				{workspaceType === 'texture' && (
					<Suspense fallback={<></>}>
						<WorkspaceTexture texture={workspaceTexture}></WorkspaceTexture>
					</Suspense>
				)}

				{controls.map((el, i) => (
					<ControlHandler id={el.id} key={i} type={el.type}></ControlHandler>
				))}

				<Canvas></Canvas>
			</div>

			{editing && (
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
						parseFloat(workspaceWidth) * 0.2,
						parseFloat(workspaceWidth) / 2,
						parseFloat(workspaceWidth) * 0.8,
						workspaceWidth,
					]}
					horizontalGuidelines={[
						0,
						parseFloat(workspaceHeight) * 0.2,
						parseFloat(workspaceHeight) / 2,
						parseFloat(workspaceHeight) * 0.8,
						workspaceHeight,
					]}
					elementSnapDirections
					elementGuidelines={controlsClass}
					useAccuratePosition // TODO Not Available For Groups
					isDisplaySnapDigit
					zoom={1.2}
					snapGap
					snapRotationDegrees={[0, 90, 180, 270]}
					/* draggable */
					draggable={true}
					throttleDrag={0}
					onDragStart={({ target }) => {
						//console.log('onDragStart', target);
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
						//console.log('onDrag left, top', left, top);
						// target!.style.left = `${left}px`;
						// target!.style.top = `${top}px`;
						//console.log('onDrag translate', dist);
						//currentTarget.controlGesto.move(delta, MouseEvent);
						targets!.map((el) => {
							el!.style.left = `${left}px`;
							el!.style.top = `${top}px`;
						});
						//console.log('group drag');
						//setPosition({ x: left, y: top });
					}}
					onDrag={({ target, left, top }: OnDrag) => {
						//console.log('onDrag left, top', left, top);
						target!.style.left = `${left}px`;
						target!.style.top = `${top}px`;
						//console.log('onDrag translate', dist);
						// target!.style.transform = transform;
						setControlPos({ x: left, y: top });
					}}
					onDragEnd={({ target }) => {
						//console.log('onDragEnd', target, isDrag);
						//console.log('end drag');

						setControlState({
							id: `${controlID}-pos`,
							value: {
								x: parseFloat(target.style.left.replace('px', '')),
								y: parseFloat(target.style.top.replace('px', '')),
							},
						});
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
						/*console.log({
							x: parseFloat(target.style.left.replace('px', '')),
							y: parseFloat(target.style.top.replace('px', '')),
						});*/

						setFutureHistory([]);
					}}
					/* When resize or scale, keeps a ratio of the width, height. */
					keepRatio={lockAspect}
					/* resizable*/
					/* Only one of resizable, scalable, warpable can be used. */
					resizable={true}
					throttleResize={0}
					onResizeStart={({ target }) => {
						//console.log('onResizeStart', target);
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
						//console.log('onResize', target);
						delta[0] && (target!.style.width = `${width}px`);
						delta[1] && (target!.style.height = `${height}px`);
						//console.log('height' + target!.style.height);
						setControlSize({
							w: target!.style.width.replace('px', '') as unknown as number,
							h: target!.style.height.replace('px', '') as unknown as number,
						});
					}}
					onResizeGroup={({ targets, width, height, delta }: OnResizeGroup) => {
						targets.map((el) => {
							delta[0] && (el!.style.width = `${width}px`);
							delta[1] && (el!.style.height = `${height}px`);
						});

						//console.log('height' + target!.style.height);
						/*setSize({
							w: target!.style.width.replace('px', '') as unknown as number,
							h: target!.style.height.replace('px', '') as unknown as number,
						});*/
					}}
					onResizeEnd={({ target }) => {
						//console.log('onResizeEnd', target, isDrag);
						setControlState({
							id: `${controlID}-control_size`,
							value: {
								w: parseFloat(target.style.width.replace('px', '')),
								h: parseFloat(target.style.height.replace('px', '')),
							},
						});
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
						console.log({
							x: parseFloat(target.style.left.replace('px', '')),
							y: parseFloat(target.style.top.replace('px', '')),
						});

						setFutureHistory([]);
					}}
					/* scalable */
					/* Only one of resizable, scalable, warpable can be used. */
					scalable={true}
					throttleScale={0}
					onScaleStart={() => {
						//console.log('onScaleStart', target);
					}}
					onScale={({ target, transform }: OnScale) => {
						//console.log('onScale scale', scale);
						target!.style.transform = transform;
					}}
					onScaleGroup={({ targets, transform }: OnScaleGroup) => {
						targets.map((el) => {
							el!.style.transform = transform;
						});
						//console.log('onScale scale', scale);
						//target!.style.transform = transform;
					}}
					onScaleEnd={() => {
						//console.log('onScaleEnd', target, isDrag);
					}}
					/* rotatable */
					rotatable={true}
					throttleRotate={0}
					onRotateStart={({ target }) => {
						console.log('onRotateStart', target);
					}}
					onRotate={({ target, transform }: OnRotate) => {
						//console.log('onRotate', dist);
						target!.style.transform = transform;
					}}
					onRotateGroup={({ target, targets, transform }: OnRotateGroup) => {
						// events.forEach(this.handleRotate);
						targets.map((el) => {
							//const frame = this.getFrame(target as HTMLElement | SVGAElement);
							//const beforeTranslate = drag.beforeTranslate;

							//el.style.rotate = `${beforeRotation}deg`;
							el.style.transform = transform; //.set('transform', 'translateX', `${beforeTranslate[0]}px`);
							//frame.set('transform', 'translateY', `${beforeTranslate[1]}px`);
							//target.style.cssText += frame.toCSS();
						});

						//console.log('onRotate', dist);
						target!.style.transform = transform;
					}}
					onRotateEnd={() => {
						//console.log('onRotateEnd', target, isDrag);
					}}
					// Enabling pinchable lets you use events that
					// can be used in draggable, resizable, scalable, and rotateable.
					pinchable={true}
					onPinchStart={() => {
						// pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
						//console.log('onPinchStart');
					}}
					onPinch={() => {
						// pinch event occur before drag, rotate, scale, resize
						//console.log('onPinch');
					}}
					onPinchGroup={() => {
						// pinch event occur before drag, rotate, scale, resize
						//console.log('onPinch');
					}}
					onPinchEnd={() => {
						// pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
						//console.log('onPinchEnd');
					}}
					defaultGroupOrigin=''
				/>
			)}
		</>
	);
};
