import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { IconAxisX, IconAxisY, IconCamera, IconTrash } from '@tabler/icons';
import React, { ReactNode, useRef, useState } from 'react';
import { Button, Collapse, Input } from 'react-daisyui';
import { Portal } from 'react-portal';
import { Rnd } from 'react-rnd';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { CustomCollapse } from '../CustomControls/CustomCollapse';

interface ControlProps {
	id: string;
	color?: string;
	children?: ReactNode;
	tooltip?: ReactNode;
	menu?: ReactNode;
	maxHeight?: string;
	maxWidth?: string;
	minHeight?: string;
	minWidth?: string;

	onClick?: Function;
}

export const ControlTemplate: React.FC<ControlProps> = ({
	id,
	color,
	tooltip,
	children,
	menu,
	onClick,
	maxHeight = '400px',
	maxWidth = '400px',
	minHeight = '150px',
	minWidth = '300px',
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
	const [position, setPosition] = useState({ x: 209, y: 191 });
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
					onResizeStop={() => {
						setOndrag(false);
					}}
					onDragStart={() => {
						setOndrag(true);
						setContextMenu(false);
					}}
					onDragStop={(e, d) => {
						setOndrag(false);
						setPosition({ x: d.x, y: d.y });
					}}
					default={{ height: '50px', width: '80px', x: 0, y: 0 }}
					position={{ x: position.x, y: position.y }}
					disableDragging={disable}
					maxHeight={maxHeight}
					maxWidth={maxWidth}
					minHeight={minHeight}
					minWidth={minWidth}
					className=''
					style={{
						zIndex: zIndex,
					}}
					bounds='parent'
				>
					<div
						className={`flex flex-auto flex-col h-full rounded ${
							ondrag && 'border-2 border-blue-500 rounded'
						}`}
						style={{
							backgroundColor: color,
						}}
						ref={ref}
					>
						<div
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
							<div className='flex flex-auto  p-2 '>
								<p className='p-2 my-auto'>X:</p>
								<div className='bg-base-100 p-2 rounded-xl  w-full'>
									{position.x}
								</div>
							</div>
							<div className='flex flex-auto  p-2 text-xs'>
								<p className='p-2 my-auto'>Y:</p>
								<div className=' bg-base-100 rounded-xl p-2 w-full'>
									{position.y}
								</div>
							</div>

							<div className='flex flex-auto p-2 text-xs'>
								<p className='p-2'>Z:</p>
								<Input
									onChange={(ev) => setzIndex(ev.target.value)}
									value={zIndex}
									className='bg-base-100 h-9 my-auto mx-auto'
								></Input>
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
						className='mt-auto  bg-gray-800/20 hover:bg-red-600 hover:text-white rounded flex flex-auto flex-row gap-2 max-h-12 p-2 cursor-pointer'
					>
						<div className='flex flex-row gap-2 mx-auto my-auto'>
							<IconTrash></IconTrash>
							<p>Delete Component</p>
						</div>
					</div>
				</Portal>
			)}

			{/* Tooltip */}
			{contextMenu && currentControlID === id && (
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
			)}
		</>
	);
};
