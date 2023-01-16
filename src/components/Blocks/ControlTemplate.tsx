import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import {
	IconAxisX,
	IconAxisY,
	IconBorderStyle,
	IconCamera,
	IconTrash,
} from '@tabler/icons';
import React, { ReactNode, useRef, useState } from 'react';
import { Button, Collapse, Input, Range } from 'react-daisyui';
import { Portal } from 'react-portal';
import { Rnd } from 'react-rnd';
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
	const currentControlID = useStoreState((state) => state.currentControlID);
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
				<Rnd
					onMouseDown={() => {
						onClick && onClick();
						setID(id);
					}}
					onResizeStart={() => {
						setContextMenu(false);
						setOndrag(true);
					}}
					onResizeStop={(e, d, r) => {
						setOndrag(false);
						setSize({
							w: r.style.width.replace('px', '') as unknown as number,
							h: r.style.height.replace('px', '') as unknown as number,
						});
					}}
					onDragStart={() => {
						setOndrag(true);
						setContextMenu(false);
					}}
					onDragStop={(e, d) => {
						setOndrag(false);
						setPosition({ x: d.x, y: d.y });
					}}
					default={{ height: defaultHeight, width: defaultWidth, x: 0, y: 0 }}
					position={{ x: position.x, y: position.y }}
					disableDragging={disable}
					maxHeight={maxHeight}
					maxWidth={maxWidth}
					minHeight={minHeight}
					minWidth={minWidth}
					lockAspectRatio={lockAspectRatio}
					size={{ height: size.h + 'px', width: size.w + 'px' }}
					style={{
						zIndex: zIndex,
					}}
					bounds='parent'
				>
					<div
						className={`flex flex-auto flex-col h-full rounded ${
							ondrag && 'border-2 border-blue-500 rounded'
						}`}
						style={{}}
						ref={ref}
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
				</Rnd>
			)}

			{/* Menu */}
			{currentControlID === id && (
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
										className='bg-base-100 p-2 rounded-xl  w-full'
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
										className='bg-base-100 p-2 rounded-xl  w-full'
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
									className='bg-base-100 p-2 rounded-xl  w-full'
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
										className='bg-base-100 p-2 rounded-xl  w-full'
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
										className='bg-base-100 p-2 rounded-xl  w-full'
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
			{contextMenu && currentControlID === id && (
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
		</>
	);
};
