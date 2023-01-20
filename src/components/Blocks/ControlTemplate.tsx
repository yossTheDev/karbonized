import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import {
	IconAxisY,
	IconBorderStyle,
	IconCamera,
	IconHierarchy,
	IconLock,
	IconMask,
	IconShadow,
	IconTrash,
} from '@tabler/icons';
import { toPng } from 'html-to-image';
import React, {
	ReactNode,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import { Button, Checkbox, Input, Range, Select, Tooltip } from 'react-daisyui';
import { Portal } from 'react-portal';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';

interface ControlProps {
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
	color,
	children,
	menu,
	onClick,
	lockAspectRatio = false,
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
	const ID = useId();
	const controlID = useStoreState((state) => state.currentControlID);

	const controlSize = useStoreState((state) => state.controlSize);
	const setControlSize = useStoreActions((state) => state.setControlSize);
	const constrlPos = useStoreState((state) => state.controlPosition);
	const setControlPos = useStoreActions((state) => state.setControlPosition);
	const aspectRatio = useStoreState((state) => state.lockAspect);
	const setAspectRatio = useStoreActions((state) => state.setLockAspect);

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

	/* Position and Size */
	const [position, setPosition] = useState({ x: 98, y: 190 });
	const [size, setSize] = useState({
		w: defaultWidth.replace('px', '') as unknown as number,
		h: defaultHeight.replace('px', '') as unknown as number,
	});
	const [borderRadious, setBorderRadious] = useState(border);

	/* Shadow */
	const [shadowX, setShadowX] = useState(0);
	const [shadowY, setShadowY] = useState(0);
	const [shadowSpread, setShadowSpread] = useState(0);
	const [shadowBlur, setShadowBlur] = useState(0);
	const [shadowColor, setShadowColor] = useState('#090b11');

	const [mask, setMask] = useState('');
	const [maskRepeat, setMaskRepeat] = useState(false);

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

	// Component Actions
	const handleTakeCapture = useCallback(() => {
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
	}, [ref]);

	return (
		<>
			{visibility && (
				<div
					id={ID}
					onContextMenu={(e) => {
						console.log('Context');
						setContextMenu(!contextMenu);
						//setDisable(true);
						e.preventDefault();
					}}
					className={`absolute flex flex-auto select-none ${
						!maskRepeat && 'mask'
					}  ${mask}`}
					style={{
						zIndex: zIndex,
						//height: defaultHeight,
						//width: defaultWidth,
						maxHeight: maxHeight,
						maxWidth: maxWidth,
						minHeight: minHeight,
						minWidth: minWidth,
						left: position.x,
						top: position.y,
					}}
				>
					<div
						className='flex flex-auto'
						onTouchStart={() => {
							//setDisable(true);
							console.log('touch');
							setID(ID);
						}}
						onMouseDown={() => {
							//setDisable(true);
							console.log(ID);
							setID(ID);
						}}
						ref={reference}
					>
						<div
							ref={ref}
							style={{
								boxShadow:
									shadowX +
									'px ' +
									shadowY +
									'px ' +
									shadowBlur +
									'px ' +
									shadowSpread +
									'px ' +
									shadowColor,
								borderRadius: borderRadious + 'px',
								backgroundColor: color,
							}}
							className='flex flex-auto flex-col h-full'
						>
							{children}
						</div>
					</div>
				</div>
			)}

			{/* Menu */}
			{controlID === ID && (
				<Portal node={document.getElementById('menu')}>
					{/* Position */}
					<CustomCollapse
						menu={
							<div className='flex flex-row m-2 gap-2'>
								<IconHierarchy size={22}></IconHierarchy>
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
										disabled
										type={'number'}
										className='bg-base-100 p-2 text-xs rounded-xl  w-full'
										onChange={(ev) => {
											setControlPos({
												x: ev.target.value as unknown as number,
												y: position.y,
											});
										}}
										value={constrlPos?.x}
									></Input>
								</div>
								{/* Position Y */}
								<div className='flex flex-auto  p-2 text-xs'>
									<p className='p-2 my-auto'>Y:</p>
									<Input
										type={'number'}
										disabled
										className='bg-base-100 p-2 rounded-xl  w-full text-xs'
										onChange={(ev) =>
											setControlPos({
												y: ev.target.value as unknown as number,
												x: position.x,
											})
										}
										value={constrlPos?.y}
									></Input>
								</div>
							</div>

							{/* Position Z */}
							<div className='flex flex-auto p-2 text-xs '>
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
										disabled
										type={'number'}
										className='bg-base-100 p-2 rounded-xl text-xs w-full'
										onChange={(ev) =>
											setControlSize({
												w: ev.target.value as unknown as number,
												h: size.h,
											})
										}
										value={controlSize?.w}
									></Input>
								</div>

								<div className='flex flex-auto  p-2 '>
									<p className='p-2 my-auto'>H:</p>
									<Input
										disabled
										type={'number'}
										className='bg-base-100 p-2 rounded-xl  w-full text-xs'
										onChange={(ev) =>
											setControlSize({
												w: size.w,
												h: ev.target.value as unknown as number,
											})
										}
										value={controlSize?.h}
									></Input>
								</div>
							</div>
						</div>
					</CustomCollapse>

					{/* Shadow Config */}
					{shadowEditable && (
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconShadow size={22}></IconShadow>
									<p className='font-bold my-auto'>Shadow</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								{/* Position */}
								<div className='flex flex-auto flex-row'>
									{/* Shadow X */}
									<div className='flex flex-auto  p-2 '>
										<p className='p-2 my-auto'>X:</p>
										<Input
											type={'number'}
											className='bg-base-100 p-2 text-xs rounded-xl  w-full'
											onChange={(ev) =>
												setShadowX(ev.target.value as unknown as number)
											}
											value={shadowX}
										></Input>
									</div>
									{/* Shadow Y */}
									<div className='flex flex-auto  p-2 text-xs'>
										<p className='p-2 my-auto'>Y:</p>
										<Input
											type={'number'}
											className='bg-base-100 p-2 rounded-xl  w-full text-xs'
											onChange={(ev) =>
												setShadowY(ev.target.value as unknown as number)
											}
											value={shadowY}
										></Input>
									</div>
								</div>

								{/* Shadow Spread */}
								<div className='flex flex-auto p-2 text-xs '>
									<p className='p-2 my-auto'>Spread:</p>
									<Input
										type={'number'}
										className='bg-base-100 p-2 rounded-xl  w-full text-xs'
										onChange={(ev) =>
											setShadowSpread(ev.target.value as unknown as number)
										}
										value={shadowSpread}
									></Input>
								</div>

								{/* Shadow Blur */}
								<div className='flex flex-auto p-2 text-xs '>
									<p className='p-2 my-auto'>Blur:</p>
									<Input
										type={'number'}
										className='bg-base-100 p-2 rounded-xl  w-full text-xs'
										onChange={(ev) =>
											setShadowBlur(ev.target.value as unknown as number)
										}
										value={shadowBlur}
									></Input>
								</div>

								{/* Shadow Color */}
								<div className='flex flex-col flex-auto'>
									<ColorPicker
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
								<div className='flex flex-row m-2 gap-2'>
									<IconBorderStyle size={22}></IconBorderStyle>
									<p className='font-bold my-auto'>Borders</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								<div className='flex flex-auto p-2'>
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

					{/* Mask */}
					{maskEditable && (
						<CustomCollapse
							menu={
								<div className='flex flex-row m-2 gap-2'>
									<IconMask size={22}></IconMask>
									<p className='font-bold my-auto'>Mask</p>
								</div>
							}
						>
							<div className='flex flex-row flex-wrap text-xs'>
								{/* Select Mask */}
								<div className='flex flex-auto p-2 '>
									<Select
										defaultValue={'default'}
										tabIndex={0}
										value={mask}
										onChange={(e) => setMask(e)}
									>
										{Masks.map((i) => {
											return (
												<option key={i} value={i}>
													{i}
												</option>
											);
										})}
									</Select>
								</div>

								<div className='flex flex-row m-2 gap-2'>
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
			{contextMenu && controlID === ID && (
				<Portal>
					<div
						className='z-50'
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
					>
						<div className='flex flex-col flex-auto gap-2'>
							{/* Delete Block */}
							<Tooltip message='Delete Block'>
								<Button
									onClick={() => {
										setID('');
										setVisibility(false);
									}}
								>
									<IconTrash></IconTrash>
								</Button>
							</Tooltip>

							{/* Capture Block */}
							<Tooltip message='Take Capture'>
								<Button onClick={handleTakeCapture}>
									<IconCamera></IconCamera>
								</Button>
							</Tooltip>

							{/* Aspect Ratio Block */}
							<Tooltip message='Lock aspect ratio'>
								<Button
									className={`${aspectRatio && 'bg-primary border-primary'}`}
									onClick={() => {
										setAspectRatio(!aspectRatio);
									}}
								>
									<IconLock></IconLock>
								</Button>
							</Tooltip>
						</div>
					</div>
				</Portal>
			)}
		</>
	);
};
