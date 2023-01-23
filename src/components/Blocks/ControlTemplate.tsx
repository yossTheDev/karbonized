import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import {
	IconBorderStyle,
	IconCamera,
	IconColorFilter,
	IconFlipHorizontal,
	IconFlipVertical,
	IconHierarchy,
	IconLock,
	IconMask,
	IconReload,
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
import { Button, Checkbox, Input, Range, Select, Tooltip } from 'react-daisyui';
import { Portal } from 'react-portal';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ColorPicker } from '../CustomControls/ColorPicker';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { NumberInput } from '../CustomControls/NumberInput';

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
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);

	const setID = useStoreActions((state) => state.setcurrentControlID);

	// Component States
	const [zIndex, setzIndex] = useState('0');
	const [visibility, setVisibility] = useState(true);
	const [contextMenu, setContextMenu] = useState(false);
	const { x, y, reference, floating, strategy } = useFloating({
		middleware: [offset(10), flip(), shift()],
		placement: 'right',
	});

	/* Position and Size */
	const [position, setPosition] = useState({ x: 98, y: 190 });
	const [size, setSize] = useState({
		w: defaultWidth.replace('px', '') as unknown as number,
		h: defaultHeight.replace('px', '') as unknown as number,
	});
	const [borderRadious, setBorderRadious] = useState(border);

	/* Flip */

	const [flipX, setFlipX] = useState(false);
	const [flipY, setFlipY] = useState(false);

	/* Rotation */

	const [rotateX, setRotateX] = useState(0);
	const [rotateY, setRotateY] = useState(0);

	/* Filters */
	const [blur, setBlur] = useState(-1);
	const [brightness, setBrightness] = useState(100);
	const [contrast, setContrast] = useState(100);
	const [grayscale, setGrayscale] = useState(0);
	const [huerotate, setHueRotate] = useState(0);
	const [invert, setInvert] = useState(0);
	const [saturate, setSaturate] = useState(100);
	const [opacity, setOpacity] = useState(100);
	const [sepia, setSepia] = useState(0);

	/* Shadow */
	const [shadowX, setShadowX] = useState(0);
	const [shadowY, setShadowY] = useState(0);
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

	useEffect(() => {
		setControlPos({ x: 98, y: 190 });
		setControlSize({ w: parseInt(defaultWidth), h: parseInt(defaultHeight) });
	}, []);

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
					onMouseEnter={() => setContextMenu(false)}
					onContextMenu={(e) => {
						setContextMenu(!contextMenu);
						//setDisable(true);
						e.preventDefault();
					}}
					className={`absolute flex flex-auto select-none ${
						!maskRepeat && 'mask'
					}  ${mask}`}
					style={{
						zIndex: zIndex,
						height: defaultHeight,
						width: defaultWidth,
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
							//console.log('touch');
							setID(ID);
							setWorkspaceTab('control');
						}}
						onMouseDown={() => {
							//setDisable(true);
							//console.log(ID);
							setID(ID);
							setWorkspaceTab('control');
						}}
						ref={reference}
						style={{}}
					>
						<div
							ref={ref}
							style={{
								borderRadius: borderRadious + 'px',
								backgroundColor: color,
								transform: `${flipX ? 'scaleX(-1)' : ''} ${
									flipY ? 'scaleY(-1)' : ''
								} rotateY(${rotateY + 'deg'}) rotateX(${rotateX + 'deg'})`,

								filter: `blur(${blur + '%'}) brightness(${
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
						<div className='flex flex-col flex-wrap text-xs'>
							{/* Flip Options */}
							<div className='flex flex-auto gap-2'>
								<Button
									className='flex flex-auto'
									onClick={() => setFlipX(!flipX)}
								>
									<IconFlipVertical></IconFlipVertical>
								</Button>
								<Button
									className='flex flex-auto'
									onClick={() => setFlipY(!flipY)}
								>
									<IconFlipHorizontal></IconFlipHorizontal>
								</Button>
							</div>

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
								<NumberInput
									onChange={(number) => {
										setzIndex(number.toString());
									}}
									number={parseInt(zIndex)}
								></NumberInput>
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

							{/* Rotation */}
							<p>Rotation</p>

							<div className='flex flex-auto flex-row'>
								{/* Rotation X */}
								<div className='flex flex-auto  p-2 text-xs my-auto'>
									<p className='p-2 my-auto'>X:</p>
									<Range
										color='primary'
										min={-180}
										max={180}
										className='my-auto'
										onChange={(ev) => {
											setRotateX(ev.currentTarget.value as unknown as number);
										}}
										value={rotateX}
									></Range>
								</div>
								{/* Rotation Y */}
								<div className='flex flex-auto  p-2 text-xs my-auto'>
									<p className='p-2 my-auto'>Y:</p>
									<Range
										color='primary'
										className='my-auto'
										min={-180}
										max={180}
										onChange={(ev) => {
											setRotateY(ev.currentTarget.value as unknown as number);
										}}
										value={rotateY}
									></Range>
								</div>

								<Button
									onMouseDown={() => {
										setRotateX(0);
										setRotateY(0);
									}}
									className='flex flex-auto my-auto p-1'
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
										<NumberInput
											onChange={(number) => {
												setShadowX(number);
											}}
											number={shadowX}
										></NumberInput>
									</div>
									{/* Shadow Y */}
									<div className='flex flex-auto  p-2 text-xs'>
										<p className='p-2 my-auto'>Y:</p>
										<NumberInput
											onChange={(number) => {
												setShadowY(number);
											}}
											number={shadowY}
										></NumberInput>
									</div>
								</div>

								{/* Shadow Blur */}
								<div className='flex flex-auto  text-xs '>
									<p className='p-2 my-auto'>Blur:</p>
									<Range
										className='my-auto'
										color='primary'
										onChange={(ev) =>
											setShadowBlur(ev.target.value as unknown as number)
										}
										value={shadowBlur}
										max={'100'}
									></Range>
								</div>

								{/* Shadow Color */}
								<div className='flex flex-col flex-auto'>
									<ColorPicker
										type='HexAlpha'
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
										tabIndex={0}
										className='flex flex-auto'
										value={mask}
										onChange={(e) => setMask(e)}
									>
										{Masks.map((i) => {
											return (
												<option key={i} value={i}>
													{i.replace('mask-', '').replace('-', ' ')}
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

					{/* Filters */}
					<CustomCollapse
						menu={
							<div className='flex flex-row m-2 gap-2'>
								<IconColorFilter size={22}></IconColorFilter>
								<p className='font-bold my-auto'>Filters</p>
							</div>
						}
					>
						<div className='flex flex-col flex-wrap text-xs gap-2'>
							{/* Blur Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Blur:</p>
								<Range
									color='primary'
									className='my-auto'
									min={-1}
									max={100}
									onChange={(ev) => {
										setBlur(ev.currentTarget.value as unknown as number);
									}}
									value={blur}
								></Range>
								<Button
									onMouseDown={() => {
										setBlur(-1 * 1);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
							</div>

							{/* Brightness Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Brightness:</p>
								<Range
									color='primary'
									className='my-auto'
									min={1}
									max={200}
									onChange={(ev) => {
										setBrightness(ev.currentTarget.value as unknown as number);
									}}
									value={brightness}
								></Range>
								<Button
									onMouseDown={() => {
										setBrightness(100);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
							</div>

							{/* Contrast Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Contrast:</p>
								<Range
									color='primary'
									className='my-auto'
									min={100}
									max={300}
									onChange={(ev) => {
										setContrast(ev.currentTarget.value as unknown as number);
									}}
									value={contrast}
								></Range>
								<Button
									onMouseDown={() => {
										setContrast(100);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
							</div>

							{/* Grayscale Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Grayscale:</p>
								<Range
									color='primary'
									className='my-auto'
									min={0}
									max={100}
									onChange={(ev) => {
										setGrayscale(ev.currentTarget.value as unknown as number);
									}}
									value={grayscale}
								></Range>
								<Button
									onMouseDown={() => {
										setGrayscale(0);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
							</div>

							{/* Hue Rotate Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Hue Rotate:</p>
								<Range
									color='primary'
									className='my-auto'
									min={0}
									max={359}
									onChange={(ev) => {
										setHueRotate(ev.currentTarget.value as unknown as number);
									}}
									value={huerotate}
								></Range>
								<Button
									onMouseDown={() => {
										setHueRotate(0);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
							</div>

							{/* Invert Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Invert:</p>
								<Range
									color='primary'
									className='my-auto'
									min={0}
									max={100}
									onChange={(ev) => {
										setInvert(ev.currentTarget.value as unknown as number);
									}}
									value={invert}
								></Range>
								<Button
									onMouseDown={() => {
										setInvert(0);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
							</div>

							{/* Saturate Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Saturate:</p>
								<Range
									color='primary'
									className='my-auto'
									min={0}
									max={200}
									onChange={(ev) => {
										setSaturate(ev.currentTarget.value as unknown as number);
									}}
									value={saturate}
								></Range>
								<Button
									onMouseDown={() => {
										setSaturate(100);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
							</div>

							{/* Sepia Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Sepia:</p>
								<Range
									color='primary'
									className='my-auto'
									min={0}
									max={100}
									onChange={(ev) => {
										setSepia(ev.currentTarget.value as unknown as number);
									}}
									value={sepia}
								></Range>
								<Button
									onMouseDown={() => {
										setSepia(0);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
							</div>

							{/* Opacity Options */}
							<div className='flex flex-auto flex-row gap-2'>
								<p className='p-2 my-auto'>Opacity:</p>
								<Range
									color='primary'
									className='my-auto'
									min={0}
									max={100}
									onChange={(ev) => {
										setOpacity(ev.currentTarget.value as unknown as number);
									}}
									value={opacity}
								></Range>
								<Button
									onMouseDown={() => {
										setOpacity(100);
									}}
									className='flex flex-auto my-auto p-1'
								>
									<IconReload size={18}></IconReload>
								</Button>
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

			{/* Context Menu */}
			{contextMenu && controlID === ID && (
				<Portal>
					<div
						className='z-50'
						ref={floating}
						style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
						onMouseLeave={() => setContextMenu(false)}
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
