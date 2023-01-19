import React, { RefObject, useEffect } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
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
import Ruler from '@scena/react-ruler';

interface Props {
	reference: RefObject<HTMLDivElement>;
}
export const Workspace: React.FC<Props> = ({ reference }) => {
	// App Store

	const controls = useStoreState((state) => state.ControlsTree);
	const controlID = useStoreState((state) => state.currentControlID);
	const editing = useStoreState((state) => state.editing);
	const lockAspect = useStoreState((state) => state.lockAspect);

	const workspaceColor = useStoreState((state) => state.workspaceColor);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	const setControlSize = useStoreActions((state) => state.setControlSize);
	const setControlPos = useStoreActions((state) => state.setControlPosition);

	useEffect(() => {}, []);

	return (
		<>
			<div className=''>
				<div
					ref={reference}
					id='workspace'
					style={{
						backgroundColor: workspaceColor,
						height: workspaceHeight + 'px',
						width: workspaceWidth + 'px',
					}}
				>
					{controls.map((el, i) => (
						<ControlHandler
							id={i.toString()}
							key={i}
							type={el.type}
						></ControlHandler>
					))}
				</div>
			</div>

			{editing && (
				<Moveable
					target={document.getElementById(controlID)}
					origin={true}
					/* Resize event edges */
					edge={false}
					/* draggable */
					draggable={true}
					throttleDrag={0}
					onDragStart={({ target, clientX, clientY }) => {
						//console.log('onDragStart', target);
					}}
					onDragGroup={({
						currentTarget,
						target,
						targets,
						beforeDelta,
						beforeDist,
						left,
						top,
						events,
						right,
						bottom,
						delta,
						dist,
						transform,
						clientX,
						clientY,
					}: OnDragGroup) => {
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
					onDrag={({
						target,
						beforeDelta,
						beforeDist,
						left,
						top,
						right,
						bottom,
						delta,
						dist,
						transform,
						clientX,
						clientY,
					}: OnDrag) => {
						//console.log('onDrag left, top', left, top);
						// target!.style.left = `${left}px`;
						// target!.style.top = `${top}px`;
						//console.log('onDrag translate', dist);
						target!.style.transform = transform;
						setControlPos({ x: left, y: top });
					}}
					onDragEnd={({ target, isDrag, clientX, clientY }) => {
						//console.log('onDragEnd', target, isDrag);
					}}
					/* When resize or scale, keeps a ratio of the width, height. */
					keepRatio={lockAspect}
					/* resizable*/
					/* Only one of resizable, scalable, warpable can be used. */
					resizable={true}
					throttleResize={0}
					onResizeStart={({ target, clientX, clientY }) => {
						//console.log('onResizeStart', target);
					}}
					onResize={({
						target,
						width,
						height,
						dist,
						delta,
						direction,
						clientX,
						clientY,
					}: OnResize) => {
						//console.log('onResize', target);
						delta[0] && (target!.style.width = `${width}px`);
						delta[1] && (target!.style.height = `${height}px`);
						//console.log('height' + target!.style.height);
						setControlSize({
							w: target!.style.width.replace('px', '') as unknown as number,
							h: target!.style.height.replace('px', '') as unknown as number,
						});
					}}
					onResizeGroup={({
						target,
						targets,
						width,
						height,
						dist,
						delta,
						direction,
						clientX,
						clientY,
					}: OnResizeGroup) => {
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
					onResizeEnd={({ target, isDrag, clientX, clientY }) => {
						//console.log('onResizeEnd', target, isDrag);
					}}
					/* scalable */
					/* Only one of resizable, scalable, warpable can be used. */
					scalable={true}
					throttleScale={0}
					onScaleStart={({ target, clientX, clientY }) => {
						//console.log('onScaleStart', target);
					}}
					onScale={({
						target,
						scale,
						dist,
						delta,
						transform,
						clientX,
						clientY,
					}: OnScale) => {
						//console.log('onScale scale', scale);
						target!.style.transform = transform;
					}}
					onScaleGroup={({
						target,
						targets,
						scale,
						dist,
						delta,
						transform,
						clientX,
						clientY,
					}: OnScaleGroup) => {
						targets.map((el) => {
							el!.style.transform = transform;
						});
						//console.log('onScale scale', scale);
						//target!.style.transform = transform;
					}}
					onScaleEnd={({ target, isDrag, clientX, clientY }) => {
						//console.log('onScaleEnd', target, isDrag);
					}}
					/* rotatable */
					rotatable={true}
					throttleRotate={0}
					onRotateStart={({ target, clientX, clientY }) => {
						console.log('onRotateStart', target);
					}}
					onRotate={({
						target,
						delta,
						dist,
						transform,
						clientX,
						clientY,
					}: OnRotate) => {
						//console.log('onRotate', dist);
						target!.style.transform = transform;
					}}
					onRotateGroup={({
						target,
						targets,
						events,
						delta,
						currentTarget,
						dist,
						transform,
						beforeRotation,
						clientX,
						clientY,
					}: OnRotateGroup) => {
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
					onRotateEnd={({ target, isDrag, clientX, clientY }) => {
						//console.log('onRotateEnd', target, isDrag);
					}}
					// Enabling pinchable lets you use events that
					// can be used in draggable, resizable, scalable, and rotateable.
					pinchable={true}
					onPinchStart={({ target, clientX, clientY, datas }) => {
						// pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
						//console.log('onPinchStart');
					}}
					onPinch={({ target, clientX, clientY, datas }) => {
						// pinch event occur before drag, rotate, scale, resize
						//console.log('onPinch');
					}}
					onPinchGroup={({ target, clientX, clientY, datas }) => {
						// pinch event occur before drag, rotate, scale, resize
						//console.log('onPinch');
					}}
					onPinchEnd={({ isDrag, target, clientX, clientY, datas }) => {
						// pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
						//console.log('onPinchEnd');
					}}
					defaultGroupOrigin=''
				/>
			)}
		</>
	);
};
