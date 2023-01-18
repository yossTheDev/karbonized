import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import {
	IconAxisY,
	IconBorderStyle,
	IconCamera,
	IconTrash,
} from '@tabler/icons';
import React, { ReactNode, useRef, useState } from 'react';
import { Button, Input, Range } from 'react-daisyui';
import Moveable, { OnDrag, OnResize, OnRotate, OnScale } from 'react-moveable';
import { Portal } from 'react-portal';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { CustomCollapse } from '../CustomControls/CustomCollapse';

interface ControlProps {
	id: string;
	color?: string;
	children?: ReactNode;
	menu?: ReactNode;
	lockAspectRatio?: boolean;
	border?: number;
	borderEditable?: boolean;
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
	onClick,
	lockAspectRatio = false,
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
	const readyToSave = useStoreState((state) => state.readyToSave);
	const setID = useStoreActions((state) => state.setcurrentControlID);

	// Component States
	const [disable, setDisable] = useState(false);
	const [zIndex, setzIndex] = useState('0');
	const [visibility, setVisibility] = useState(true);
	const [contextMenu, setContextMenu] = useState(false);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), flip(), shift()],
		placement: 'right',
	});
	const [ondrag, setOndrag] = useState(false);
	const [position, setPosition] = useState({ x: 107, y: 226 });
	const [size, setSize] = useState({
		w: defaultWidth.replace('px', '') as unknown as number,
		h: defaultHeight.replace('px', '') as unknown as number,
	});
	const [borderRadious, setBorderRadious] = useState(border);
	const ref = useRef<HTMLDivElement>(null);

	return (
		<>
			{visibility && (
				<div style={{ zIndex: zIndex }} className='absolute target'>
					<div
						onClick={() => {
							console.log('store id ' + controlID);
							console.log('control id ' + id);
							setDisable(true);
							//setDisable(!disable);
						}}
						onMouseDown={() => {
							setDisable(true);
							setID(id);
						}}
						id={id}
						className={`flex flex-auto flex-col h-full rounded ${
							ondrag && 'border-2 border-blue-500 rounded'
						}`}
						ref={ref}
						style={{
							//height: defaultHeight,
							//width: defaultWidth,
							maxHeight: maxHeight,
							maxWidth: maxWidth,
							minHeight: minHeight,
							minWidth: minWidth,
							zIndex: zIndex,
							left: position.x,
							top: position.y,
						}}
					>
						<div
							style={{
								borderRadius: borderRadious + 'px',
								backgroundColor: color,
							}}
							className='flex flex-auto flex-col h-full'
							ref={reference}
							onContextMenu={(e) => {
								setContextMenu(!contextMenu);
								//setDisable(true);
								e.preventDefault();
							}}
						>
							{children}
						</div>
					</div>
				</div>
			)}

			{/* Menu */}
			{controlID === id && (
				<Portal node={document.getElementById('menu')}>
					{/* Position */}
					<CustomCollapse
						menu={
							<div className='flex flex-row m-2 gap-2'>
								<IconAxisY size={22}></IconAxisY>
								<p className='font-bold my-auto'>Position</p>
							</div>
						}
					>
						<div className='flex flex-row flex-wrap text-xs'>
							{/* Position */}
							<div className='flex flex-auto flex-row'>
								{/* Position X */}
								<div className='flex flex-auto  p-2 '>
									<p className='p-2 my-auto'>X:</p>
									<Input
										type={'number'}
										className='bg-base-100 p-2 text-xs rounded-xl  w-full'
										onChange={(ev) =>
											setPosition({
												x: ev.target.value as unknown as number,
												y: position.y,
											})
										}
										value={position.x}
									></Input>
								</div>
								{/* Position Y */}
								<div className='flex flex-auto  p-2 text-xs'>
									<p className='p-2 my-auto'>Y:</p>
									<Input
										type={'number'}
										className='bg-base-100 p-2 rounded-xl  w-full text-xs'
										onChange={(ev) =>
											setPosition({
												y: ev.target.value as unknown as number,
												x: position.x,
											})
										}
										value={position.y}
									></Input>
								</div>
							</div>

							<div className='flex flex-auto p-2 text-xs'>
								<p className='p-2 my-auto'>Z:</p>
								<Input
									type={'number'}
									className='bg-base-100 p-2 rounded-xl  w-full text-xs'
									onChange={(ev) => setzIndex(ev.target.value)}
									value={zIndex}
								></Input>
							</div>

							{/* Size */}
							<div className='flex flex-row'>
								<div className='flex flex-auto  p-2 '>
									<p className='p-2 my-auto'>W:</p>
									<Input
										type={'number'}
										className='bg-base-100 p-2 rounded-xl text-xs w-full'
										onChange={(ev) =>
											setSize({
												w: ev.target.value as unknown as number,
												h: size.h,
											})
										}
										value={size.w}
									></Input>
								</div>

								<div className='flex flex-auto  p-2 '>
									<p className='p-2 my-auto'>H:</p>
									<Input
										type={'number'}
										className='bg-base-100 p-2 rounded-xl  w-full text-xs'
										onChange={(ev) =>
											setSize({
												w: size.w,
												h: ev.target.value as unknown as number,
											})
										}
										value={size.h}
									></Input>
								</div>
							</div>
						</div>
					</CustomCollapse>

					{/* Border  */}
					{borderEditable && (
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconBorderStyle size={22}></IconBorderStyle>
									<p className='font-bold my-auto'>Borders</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto  p-2 '>
									<p className='p-2 my-auto'>Radius:</p>
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

					{menu}

					{/* Delete */}
					<div
						onClick={() => {
							setID('');
							setVisibility(false);
						}}
						className='mt-auto  bg-gray-800/20 hover:bg-red-600 hover:text-white rounded flex flex-auto flex-row gap-2 max-h-12 p-2 cursor-pointer'
					>
						<div className='flex flex-row gap-2 mx-auto my-auto'>
							<IconTrash></IconTrash>
							<p>Delete Component</p>
						</div>
					</div>
				</Portal>
			)}

			{/* Context Menu */}
			{contextMenu && controlID === id && (
				<Portal>
					<div
						className='z-50'
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
					>
						<div className='flex flex-col flex-auto gap-2'>
							{/* Delete Block */}
							<Button
								onClick={() => {
									setID('');
									setVisibility(false);
								}}
							>
								<IconTrash></IconTrash>
							</Button>

							{/* Capture Block */}
							<Button
								onClick={async () => {
									const { toPng } = await import('html-to-image');
									console.log('capturando');
									if (ref.current === null) {
										return;
									}

									toPng(ref.current, {
										cacheBust: true,
									})
										.then((dataUrl) => {
											const link = document.createElement('a');
											link.download = 'code-karbonized.png';
											link.href = dataUrl;
											link.click();
										})
										.catch((err) => {
											console.log(err);
										});
								}}
							>
								<IconCamera></IconCamera>
							</Button>
						</div>
					</div>
				</Portal>
			)}

			{/* Moveable Control */}
			{disable && readyToSave === false && controlID === id && (
				<Moveable
					groupable
					snappable
					target={document.getElementById(id) as HTMLElement}
					origin={true}
					/* Resize event edges */
					edge={false}
					/* draggable */
					draggable={true}
					translateZ={zIndex}
					throttleDrag={0}
					onDragStart={({ target, clientX, clientY }) => {
						//console.log('onDragStart', target);
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
						setPosition({ x: left, y: top });
					}}
					onDragEnd={({ target, isDrag, clientX, clientY }) => {
						//console.log('onDragEnd', target, isDrag);
					}}
					/* When resize or scale, keeps a ratio of the width, height. */
					keepRatio={false}
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
						console.log('height' + target!.style.height);
						setSize({
							w: target!.style.width.replace('px', '') as unknown as number,
							h: target!.style.height.replace('px', '') as unknown as number,
						});
					}}
					onResizeEnd={({ target, isDrag, clientX, clientY }) => {
						console.log('onResizeEnd', target, isDrag);
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
					onScaleEnd={({ target, isDrag, clientX, clientY }) => {
						//console.log('onScaleEnd', target, isDrag);
					}}
					/* rotatable */
					rotatable={true}
					warpable={true}
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
					onPinchEnd={({ isDrag, target, clientX, clientY, datas }) => {
						// pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
						//console.log('onPinchEnd');
					}}
				/>
			)}
		</>
	);
};
