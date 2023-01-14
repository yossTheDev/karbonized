import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { IconAxisX, IconAxisY, IconTrash } from '@tabler/icons';
import React, { ReactNode, useState } from 'react';
import { Collapse, Input } from 'react-daisyui';
import { Portal } from 'react-portal';
import { Rnd } from 'react-rnd';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { CustomCollapse } from '../CustomCollapse';

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

	const [ondrag, setOndrag] = useState(false);

	// Component States
	const [disable, setDisable] = useState(false);
	const [zIndex, setzIndex] = useState('0');
	const [visibility, setVisibility] = useState(true);
	const [tooltipVisibility, settooltipVisibility] = useState(false);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), flip(), shift()],
		placement: 'top',
	});
	const [position, setPosition] = useState({ x: 0, y: 0 });

	return (
		<>
			{visibility && (
				<Rnd
					onMouseDown={() => {
						onClick && onClick();
						setID(id);
					}}
					onResizeStart={() => {
						setOndrag(true);
					}}
					onResizeStop={() => {
						setOndrag(false);
					}}
					onDragStart={() => setOndrag(true)}
					default={{ height: '50px', width: '80px', x: 0, y: 0 }}
					position={{ x: position.x, y: position.y }}
					onDragStop={(e, d) => {
						setOndrag(false);
						setPosition({ x: d.x, y: d.y });
					}}
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
						style={{
							backgroundColor: color,
						}}
						ref={reference}
						onContextMenu={(e) => {
							settooltipVisibility(true);
							//setDisable(true);
							e.preventDefault();
						}}
						className={`flex flex-auto flex-col h-full rounded ${
							ondrag && 'border-2 border-blue-500 rounded'
						}`}
					>
						{children}
					</div>
				</Rnd>
			)}

			{/* Menu */}
			{currentControlID === id && (
				<Portal node={document.getElementById('menu')}>
					<div className='select-none flex flex-auto flex-col'>
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
							className='mt-auto p-4 bg-gray-800/20 hover:bg-red-600 rounded flex flex-auto flex-row gap-2 max-h-14 cursor-pointer'
						>
							<IconTrash></IconTrash>
							<p>Delete Component</p>
						</div>
					</div>
				</Portal>
			)}

			{/* Tooltip */}
			{tooltipVisibility && tooltip && (
				<div
					onMouseLeave={() => settooltipVisibility(false)}
					className='transition absolute  ease-in-out delay-150  hover:scale-110 duration-300  bg-white shadow   text-black h  p-3 rounded flex flex-auto  flex-row'
					ref={floating}
					style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
				>
					<div className='flex flex-row flex-auto gap-10'>{tooltip}</div>
				</div>
			)}
		</>
	);
};
