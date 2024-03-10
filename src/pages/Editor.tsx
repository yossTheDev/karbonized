import {
	IconBrush,
	IconFlask,
	IconFocusCentered,
	IconLock,
	IconMoon,
	IconSun,
	IconZoomIn,
	IconZoomOut,
	IconZoomReset,
} from '@tabler/icons-react';
import React, {
	Suspense,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button, Range } from 'react-daisyui';
import { AppContext } from '../AppContext';
import { Tooltip } from '../components/CustomControls/Tooltip';
import { NavBarMobile } from '../components/Mobile/NavBarMobileEditor';
import { useScreenDirection } from '../hooks/useScreenDirection';
import { useTheme } from '../hooks/useTheme';
import { useStoreActions, useStoreState } from '../stores/Hooks';
import { getRandomNumber } from '../utils/getRandom';
import { isElectron } from '../utils/isElectron';

const Workspace = React.lazy(
	async () => await import('../components/Workspace'),
);
const StatusBar = React.lazy(
	async () => await import('../components/Base/StatusBar'),
);
const ColorPicker = React.lazy(
	async () => await import('../components/CustomControls/ColorPicker'),
);
const TabBar = React.lazy(
	async () => await import('../components/Base/TabBar'),
);
const LeftPanel = React.lazy(
	async () => await import('../components/Panels/LeftPanel'),
);
const RightPanel = React.lazy(
	async () => await import('../components/Panels/RightPanel'),
);
const InfiniteViewer = React.lazy(
	async () => await import('react-infinite-viewer'),
);

export const Editor: React.FC = () => {
	const { viewerRef } = useContext(AppContext);
	/* App Store */
	const addControl = useStoreActions((state) => state.addControl);
	const setEditing = useStoreActions((state) => state.setEditing);
	const drag = useStoreState((state) => state.drag);
	const setDrag = useStoreActions((state) => state.setDrag);
	const canDraw = useStoreState((state) => state.isDrawing);
	const setCanDraw = useStoreActions((state) => state.setIsDrawing);
	const isErasing = useStoreState((state) => state.isErasing);
	const setIsErasing = useStoreActions((state) => state.setIsErasing);
	const lineWidth = useStoreState((state) => state.lineWidth);
	const strokeColor = useStoreState((state) => state.strokeColor);
	const setStrokeColor = useStoreActions((state) => state.setStrokeColor);
	const setLineWidth = useStoreActions((state) => state.setLineWidth);
	const aspectRatio = useStoreState((state) => state.lockAspect);
	const setAspectRatio = useStoreActions((state) => state.setLockAspect);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	/* Copy/Paste System */
	const controlID = useStoreState((state) => state.currentControlID);
	const currentControlProperties = useStoreState(
		(state) => state.currentControlProperties,
	);
	const initialProperties = useStoreState((state) => state.initialProperties);
	const ControlProperties = useStoreState((state) => state.ControlProperties);
	const addInitialProperty = useStoreActions(
		(state) => state.addInitialProperty,
	);
	const addControlProperty = useStoreActions(
		(state) => state.addControlProperty,
	);

	const workspaceMode = useStoreState((state) => state.workspaceMode);

	const redo = useStoreActions((state) => state.redo);
	const undo = useStoreActions((state) => state.undo);

	/* Component Store and Actions */
	const isHorizontal = useScreenDirection();
	const [appTheme, toggleTheme] = useTheme();

	const [, setShowAbout] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	const [zoom, setZoom] = useState(isHorizontal ? 0.9 : 0.4);

	const getElementsByType = (type: string) => {
		return (
			currentWorkspace.controls.filter((item) => item.type === type).length + 1
		);
	};

	const centerView = () => {
		const width = parseFloat(currentWorkspace.workspaceWidth);

		if (isHorizontal) {
			if (width < 1280) {
				viewerRef.current?.setZoom(0.9);
			} else if (width >= 1280 && width < 1920) {
				viewerRef.current?.setZoom(0.6);
			} else if (width >= 1920 && width < 2560) {
				viewerRef.current?.setZoom(0.4);
			} else if (width >= 2560 && width < 3840) {
				viewerRef.current?.setZoom(0.3);
			} else if (width >= 3840) {
				viewerRef.current?.setZoom(0.2);
			}
		} else {
			if (width < 1280) {
				viewerRef.current?.setZoom(0.6);
			} else if (width >= 1280 && width < 1920) {
				viewerRef.current?.setZoom(0.25);
			} else if (width >= 1920) {
				viewerRef.current?.setZoom(0.1);
			}
		}

		viewerRef.current?.scrollCenter();
	};

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'w') {
			event.preventDefault();
			setEditing(true);
			setDrag(false);
			setCanDraw(false);
			setIsErasing(false);
		} else if (event.ctrlKey && event.key === 'e') {
			event.preventDefault();
			setEditing(false);
			setCanDraw(false);
			setIsErasing(false);
			setDrag(true);
		} else if (event.ctrlKey && event.key === 'r') {
			event.preventDefault();
			setAspectRatio(!aspectRatio);
		} else if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
		} else if (event.ctrlKey && event.key === 'z') {
			event.preventDefault();
			undo();
		} else if (event.ctrlKey && event.key === 'y') {
			event.preventDefault();
			redo();
		} else if (event.ctrlKey && event.key === ' ') {
			event.preventDefault();
			centerView();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			setShowAbout(false);
		}
	};

	/* Handle Key Shortcuts and Center View on Change Some Workspace Properties */
	useEffect(() => {
		centerView();

		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [currentWorkspace, workspaceMode, aspectRatio]);

	/* Handle Duplicate Elements */
	useEffect(() => {
		const OnKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'd') {
				event.preventDefault();

				/* Copy Control Properties */
				const newControlID =
					controlID.split('-')[0] + '-' + getRandomNumber().toString();

				currentControlProperties.forEach((item) => {
					const id = item.id.split('-');
					const prop = id[id.length - 1];

					addInitialProperty({
						id: newControlID + '-' + prop,
						value: item.value,
					});
					addControlProperty({
						id: newControlID + '-' + prop,
						value: item.value,
					});
				});

				/* Add Control To Workspace */
				addControl({
					type:
						currentWorkspace.controls.find((item) => item.id === controlID)
							?.type ?? newControlID.split('-')[0],
					id: newControlID,
					isSelectable: true,
					isDeleted: false,
					name: `${newControlID.split('-')[0]} ${getElementsByType(
						newControlID.split('-')[0],
					)}`,
					isVisible: true,
				});
			}
		};

		window.addEventListener('keydown', OnKeyDown);

		return () => {
			window.removeEventListener('keydown', OnKeyDown);
		};
	}, [controlID, ControlProperties, initialProperties]);

	return (
		<>
			<div
				onContextMenu={(e) => {
					e.preventDefault();
				}}
				className={`relative flex flex-auto flex-row overflow-hidden`}
			>
				{/* Left Panel */}
				<div className='flex max-w-xs'>
					<Suspense>
						<LeftPanel></LeftPanel>
					</Suspense>
				</div>

				{/* Content */}
				<div className='relative mb-1 flex flex-auto flex-col overflow-hidden  p-0'>
					{/* Nav Bar Mobile */}
					{!isHorizontal && <NavBarMobile></NavBarMobile>}

					{/* Quick Settings */}
					<div className='pointer-events-none absolute z-20  flex h-full  w-full bg-transparent '>
						<TabBar></TabBar>

						<div className='pointer-events-auto relative mb-28 ml-auto mr-2 mt-auto flex h-fit max-w-fit flex-auto  flex-col gap-1 md:mr-4  md:mt-2 md:flex-row md:gap-1 lg:flex'>
							{/* Change Theme */}
							{!isElectron() && (
								<>
									<Tooltip placement='bottom' message='Change Theme'>
										<Button
											size='md'
											shape='circle'
											color='neutral'
											className='my-auto hidden border-none bg-base-200/90 lg:flex'
											onClick={() => {
												toggleTheme();
											}}
										>
											{appTheme === 'light' ? (
												<IconMoon
													size={22}
													className='text-base-content mx-auto my-auto dark:text-white'
												></IconMoon>
											) : (
												<IconSun
													size={22}
													className='text-base-content mx-auto my-auto dark:text-white'
												></IconSun>
											)}
										</Button>
									</Tooltip>

									<p className='mx-1 my-auto hidden h-0.5 rounded  bg-base-200 p-0.5 lg:block'></p>
								</>
							)}

							{/* Lock Aspect Ratio */}
							<Tooltip placement='bottom' message='Lock Aspect Ratio (Ctrl+R)'>
								<Button
									size='md'
									shape='circle'
									className={`my-auto hidden  flex-auto rounded-full border-none bg-base-200/90 p-1 hover:bg-base-100 md:flex ${
										aspectRatio && 'border-none bg-primary text-white'
									}`}
									onClick={() => {
										setAspectRatio(!aspectRatio);
									}}
								>
									<IconLock size={22} className='dark:text-white'></IconLock>
								</Button>
							</Tooltip>

							<p className='mx-1 my-auto hidden h-0.5 rounded bg-base-200/90 p-0.5 md:flex '></p>

							{/* Zoom Out */}
							<Tooltip placement='bottom' message='Zoom Out'>
								<Button
									size='md'
									shape='circle'
									className='my-auto  flex-auto rounded-full border-none bg-base-200/90  hover:bg-base-100 md:flex'
									onClick={() =>
										viewerRef.current?.setZoom(
											viewerRef.current?.getZoom() - 0.2,
										)
									}
								>
									<IconZoomOut
										size={22}
										className='my-auto dark:text-white'
									></IconZoomOut>
								</Button>
							</Tooltip>

							{/* Zoom In */}
							<Tooltip placement='bottom' message='Zoom In'>
								<Button
									size='md'
									shape='circle'
									className='my-auto   flex-auto rounded-full border-none bg-base-200/90 p-2 hover:bg-base-100 md:flex'
									onClick={() =>
										viewerRef.current?.setZoom(
											viewerRef.current?.getZoom() + 0.2,
										)
									}
								>
									<IconZoomIn
										size={22}
										className='my-auto dark:text-white'
									></IconZoomIn>
								</Button>
							</Tooltip>

							{/* Zoom Reset */}
							<Tooltip placement='bottom' message='Zoom Reset'>
								<Button
									size='md'
									shape='circle'
									className='my-auto hidden flex-auto rounded-full border-none bg-base-200/90 hover:bg-base-100  md:flex'
									onClick={() => viewerRef.current?.setZoom(0.7)}
								>
									<IconZoomReset
										size={22}
										className='my-auto dark:text-white'
									></IconZoomReset>
								</Button>
							</Tooltip>

							{/* Center View */}
							<Tooltip placement='bottom' message='Center View'>
								<Button
									size='md'
									shape='circle'
									className='bg-base-200/90 hover:bg-base-100 md:hidden'
									onClick={() => {
										centerView();
									}}
								>
									<IconFocusCentered
										size={22}
										className='my-auto dark:text-white'
									></IconFocusCentered>
								</Button>
							</Tooltip>

							{/* Preview Button */}
							<Tooltip placement='bottom' message='Render (Ctrl+S)'>
								<Button className='to-secondary mr-2 hidden h-12 w-12 rounded-full border-none border-primary bg-gradient-to-br from-violet-500 p-1 hover:border-primary hover:bg-gradient-to-l '>
									<IconFlask size={22} className='text-white'></IconFlask>
								</Button>
							</Tooltip>
						</div>
					</div>

					{/* Content */}
					<div className='relative flex flex-auto flex-col overflow-hidden md:flex-row'>
						{/* Draw Bar */}
						{(canDraw || isErasing) && (
							<div className=' absolute flex h-full w-full'>
								<div className=' z-50 mb-12 ml-auto mr-4 mt-auto flex flex-row gap-1 rounded-2xl bg-base-100/90 px-2 py-0.5'>
									{/* Stroke Range */}
									<IconBrush className='mx-1 my-auto dark:text-white'></IconBrush>
									<Range
										color='primary'
										className='my-auto flex  flex-auto p-1'
										min={0}
										max={100}
										onChange={(ev) => {
											setLineWidth(parseInt(ev.currentTarget.value));
										}}
										value={lineWidth}
									></Range>

									<ColorPicker
										isGradientEnable={false}
										color={strokeColor}
										onColorChange={setStrokeColor}
										showLabel={false}
										placement='right-end'
										label='Color'
									></ColorPicker>

									{/* Zoom In */}
									<Tooltip className='hidden flex-auto ' message='Zoom In'>
										<Button
											className='flex flex-auto p-1'
											color='ghost'
											onClick={() => {
												setZoom(zoom + 0.2);
											}}
										>
											<IconZoomIn
												size={15}
												className='dark:text-white'
											></IconZoomIn>
										</Button>
									</Tooltip>
								</div>
							</div>
						)}

						{/* Workspace */}
						<div className={`flex flex-auto flex-col ${drag && 'cursor-move'}`}>
							{/* Ruler Horizontal */}
							<InfiniteViewer
								ref={viewerRef}
								className='viewer my-2 flex flex-auto'
								useAutoZoom
								useMouseDrag={drag}
								useGesture
								usePinch={!drag}
								threshold={0}
								useResizeObserver
								useWheelScroll
								useWheelPinch
								useTransform
							>
								<div
									style={{
										width: currentWorkspace.workspaceWidth + 'px',
										height: currentWorkspace.workspaceHeight + 'px',
									}}
									className='viewport'
								>
									<Suspense
										fallback={
											<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
										}
									>
										<Workspace reference={ref}></Workspace>
									</Suspense>
								</div>
							</InfiniteViewer>
						</div>
					</div>

					<StatusBar></StatusBar>
				</div>

				{/* Right Panel */}
				<div className='flex max-h-screen max-w-sm overflow-hidden rounded-l-md bg-base-200'>
					<Suspense>
						<RightPanel></RightPanel>
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default Editor;
