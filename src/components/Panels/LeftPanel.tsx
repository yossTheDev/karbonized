import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getRandomNumber } from '@/utils/getRandom';
import {
	IconChevronLeft,
	IconChevronRight,
	IconCircleSquare,
	IconEdit,
	IconMoon,
	IconPerspective,
	IconPuzzle,
	IconSun,
	IconWallpaper,
} from '@tabler/icons-react';
import {
	AppWindow,
	Badge,
	Brush,
	Circle,
	CodeSquare,
	Crop,
	Ellipsis,
	Eraser,
	Hand,
	Image,
	MousePointer2,
	QrCode,
	Settings,
	Smartphone,
	Sticker,
	Twitter,
	Type,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useScreenDirection } from '../../hooks/useScreenDirection';
import { useTheme } from '../../hooks/useTheme';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { isElectron } from '../../utils/isElectron';
import { Tooltip } from '../CustomControls/Tooltip';

export const LeftPanel: React.FC = () => {
	/* App Store */
	const currentID = useStoreState((state) => state.currentControlID);
	const addControl = useStoreActions((state) => state.addControl);
	const workspaceMode = useStoreState((state) => state.workspaceMode);
	const setWorkspaceMode = useStoreActions((state) => state.setWorkspaceMode);
	const setWorkspaceTab = useStoreActions((state) => state.setSelectedTab);
	const setEditing = useStoreActions((state) => state.setEditing);
	const editing = useStoreState((state) => state.editing);
	const isErasing = useStoreState((state) => state.isErasing);
	const setIsErasing = useStoreActions((state) => state.setIsErasing);
	const canDraw = useStoreState((state) => state.isDrawing);
	const setCanDraw = useStoreActions((state) => state.setIsDrawing);
	const drag = useStoreState((state) => state.drag);
	const setDrag = useStoreActions((state) => state.setDrag);
	const crop = useStoreState((state) => state.crop);
	const setCrop = useStoreActions((state) => state.setCrop);
	const warp = useStoreState((state) => state.warp);
	const setWarp = useStoreActions((state) => state.setWarp);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	/* Component State */
	const isHorizontal = useScreenDirection();
	const [appTheme, toggleTheme] = useTheme();

	const [showMenu, setShowMenu] = useState(!isHorizontal);
	const [tab, setTab] = useState('hierarchy');

	/* Show/Close Menu KeyShortcut */
	const onKeyDown = (event: KeyboardEvent): void => {
		if (event.ctrlKey && event.key === 'b') {
			event.preventDefault();
			setShowMenu(!showMenu);
		} else if (event.ctrlKey && event.key === 'w') {
			event.preventDefault();
			setEditing(true);
			setDrag(false);
			setCanDraw(false);
			setIsErasing(false);
			setWarp(false);
			setCrop(false);
		} else if (event.ctrlKey && event.key === 'e') {
			event.preventDefault();
			setEditing(false);
			setCanDraw(false);
			setIsErasing(false);
			setCrop(false);
			setWarp(false);
			setDrag(true);
		} else if (event.ctrlKey && event.key === 'f') {
			event.preventDefault();
			setEditing(true);
			setCanDraw(false);
			setIsErasing(false);
			setDrag(false);
			setWarp(false);
			setCrop(true);
		} else if (event.ctrlKey && event.key === 'g') {
			event.preventDefault();
			setEditing(true);
			setCanDraw(false);
			setIsErasing(false);
			setDrag(false);
			setCrop(false);
			setWarp(true);
		} else if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [showMenu]);

	useEffect(() => {
		if (workspaceMode === 'design') {
			setShowMenu(true);
			setTab('hierarchy');
		} else if (workspaceMode !== 'custom') {
			setShowMenu(false);
		}
	}, [workspaceMode]);

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const getElementsByType = (type: string) => {
		return (
			currentWorkspace?.controls.filter((item) => item.type === type)?.length +
			1
		);
	};

	return (
		<div className='pointer-events-auto z-30 mr-auto flex h-full w-5/6 grow-0 flex-col gap-1 overflow-hidden bg-base-300 p-2 text-neutral-950 dark:text-neutral-100 dark:shadow-base-200 md:w-fit md:max-w-[10rem]'>
			{/* Controls */}
			<div className='flex h-full w-10 flex-col items-center gap-2  dark:text-white'>
				<Button
					onClick={() => {
						setEditing(true);
						setDrag(false);
						setCanDraw(false);
						setIsErasing(false);
						setCrop(false);
						setWarp(false);
					}}
					variant={editing && !crop && !warp ? 'primary' : 'ghost'}
					size={'small'}
				>
					<MousePointer2 size={18}></MousePointer2>
				</Button>

				<Button
					onClick={() => {
						setEditing(false);
						setCanDraw(false);
						setIsErasing(false);
						setCrop(false);
						setWarp(false);
						setDrag(true);
					}}
					variant={drag ? 'primary' : 'ghost'}
					size={'small'}
				>
					<Hand size={18}></Hand>
				</Button>

				<Button
					onClick={() => {
						setCanDraw(false);
						setIsErasing(false);
						setDrag(false);
						setWarp(false);
						setCrop(true);
					}}
					variant={crop ? 'primary' : 'ghost'}
					size={'small'}
				>
					<Crop size={18}></Crop>
				</Button>

				<Button
					onClick={() => {
						setCanDraw(false);
						setIsErasing(false);
						setDrag(false);
						setCrop(false);
						setWarp(!warp);
					}}
					variant={warp ? 'primary' : 'ghost'}
					size={'small'}
				>
					<IconPerspective size={18}></IconPerspective>
				</Button>

				<Button
					onClick={() => {
						setCanDraw(!canDraw);
						setEditing(false);
						setDrag(false);
						setIsErasing(false);
					}}
					variant={canDraw ? 'primary' : 'ghost'}
					size={'small'}
				>
					<Brush size={18}></Brush>
				</Button>

				<Button
					onClick={() => {
						setIsErasing(!isErasing);
						setEditing(false);
						setDrag(false);
						setCanDraw(false);
					}}
					variant={isErasing ? 'primary' : 'ghost'}
					size={'small'}
				>
					<Eraser size={18}></Eraser>
				</Button>

				<div className='mx-auto my-4 hidden h-1 w-1 rounded bg-base-200/80 p-1 md:flex '></div>

				{/* Code Control */}
				<Button
					variant={'ghost'}
					size={'small'}
					onClick={() => {
						addControl({
							type: 'code',
							id: `code-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `code ${getElementsByType('code')}`,
							isVisible: true,
						});
					}}
				>
					<CodeSquare size={18}></CodeSquare>
				</Button>

				{/* Image Control */}
				<Button
					variant={'ghost'}
					size={'small'}
					onClick={() => {
						addControl({
							type: 'image',
							id: `image-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `image ${getElementsByType('image')}`,
							isVisible: true,
						});
					}}
				>
					<Image size={18}></Image>
				</Button>

				{/* FaIcon Control */}
				<Button
					variant={'ghost'}
					size={'small'}
					onClick={() => {
						addControl({
							type: 'icon',
							id: `icon-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `icon ${getElementsByType('icon')}`,
							isVisible: true,
						});
					}}
				>
					<Sticker size={18} className='dark:text-white'></Sticker>
				</Button>

				{/* Text Control */}
				<Button
					variant={'ghost'}
					size={'small'}
					onClick={() => {
						addControl({
							type: 'text',
							id: `text-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `text ${getElementsByType('text')}`,
							isVisible: true,
						});
					}}
				>
					<Type size={18} className='dark:text-white'></Type>
				</Button>

				{/* Shape Control */}
				<Button
					variant={'ghost'}
					size={'small'}
					onClick={() => {
						addControl({
							type: 'shape',
							id: `shape-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `shape ${getElementsByType('shape')}`,
							isVisible: true,
						});
					}}
				>
					<Circle size={18}></Circle>
				</Button>

				{/* Phone Mockup Control */}
				<Button
					variant={'ghost'}
					size={'small'}
					onClick={() => {
						addControl({
							type: 'phone_mockup',
							id: `phone_mockup-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `phone mockup ${getElementsByType('phone_mockup')}`,
							isVisible: true,
						});
					}}
				>
					<Smartphone size={18}></Smartphone>
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button size={'icon'} variant={'ghost'}>
							<Ellipsis size={20}></Ellipsis>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side='right'>
						<DropdownMenuLabel>More Controls</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								addControl({
									type: 'qr',
									id: `qr-${getRandomNumber()}`,
									isSelectable: true,
									isDeleted: false,
									name: `qr ${getElementsByType('qr')}`,
									isVisible: true,
								});
							}}
						>
							<QrCode className='mr-2' size={18}></QrCode> Qr Code
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => {
								addControl({
									type: 'badge',
									id: `badge-${getRandomNumber()}`,
									isSelectable: true,
									isDeleted: false,
									name: `badge ${getElementsByType('badge')}`,
									isVisible: true,
								});
							}}
						>
							<Badge className='mr-2' size={18}></Badge> Badge
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => {
								addControl({
									type: 'tweet',
									id: `tweet-${getRandomNumber()}`,
									isSelectable: true,
									isDeleted: false,
									name: `tweet ${getElementsByType('tweet')}`,
									isVisible: true,
								});
							}}
						>
							<Twitter className='mr-2' size={18}></Twitter> Tweet
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => {
								addControl({
									type: 'window',
									id: `window-${getRandomNumber()}`,
									isSelectable: true,
									isDeleted: false,
									name: `window ${getElementsByType('window')}`,
									isVisible: true,
								});
							}}
						>
							<AppWindow className='mr-2' size={18}></AppWindow> Window
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button className='mt-auto' size={'icon'} variant={'ghost'}>
					<Settings size={20}></Settings>
				</Button>
			</div>

			{/* Tabs */}
			<div className='hidden flex-auto overflow-y-auto'>
				{/* Selectors */}
				<div className='text-base-content flex flex-auto flex-col gap-2'>
					{/* Theme Button */}
					{!isHorizontal && (
						<button
							className='btn btn-circle btn-sm  mx-auto mb-2'
							onClick={() => {
								toggleTheme();
							}}
						>
							{appTheme === 'light' ? (
								<IconMoon size={16} className=' dark:text-white'></IconMoon>
							) : (
								<IconSun size={16} className=' dark:text-white'></IconSun>
							)}
						</button>
					)}

					{/* Hierarchy */}
					<Tooltip message='Hierarchy'>
						<button
							onClick={() => {
								setWorkspaceMode('custom');
								setTab('hierarchy');
								setShowMenu(true);
							}}
							className={`btn btn-ghost md:btn-sm rounded-2xl md:rounded-xl ${
								tab === 'hierarchy' && showMenu && 'bg-base-200 md:bg-base-300'
							}`}
						>
							<IconCircleSquare
								className='mx-auto'
								size={16}
							></IconCircleSquare>
						</button>
					</Tooltip>

					{/* Extensions */}
					{isElectron() && (
						<Tooltip message='Extensions'>
							<button
								onClick={() => {
									setWorkspaceMode('custom');
									setTab('extensions');

									/* Load Extension and App Data */
									(window as any).electron.ipcRenderer.sendMessage(
										'getAppData',
										'',
									);

									setShowMenu(true);
								}}
								className={`btn btn-ghost btn-sm rounded-xl ${
									tab === 'extensions' &&
									showMenu &&
									'bg-base-100 md:bg-base-300'
								}`}
							>
								<IconPuzzle className='mx-auto' size={16}></IconPuzzle>
							</button>
						</Tooltip>
					)}

					{/* Show/Close Menu */}
					{isHorizontal && (
						<Tooltip message='Show/Close Menu (Ctrl+B)'>
							<button
								onClick={() => {
									setWorkspaceMode('custom');
									setTab('hierarchy');
									setShowMenu(!showMenu);
								}}
								className={`btn btn-ghost md:btn-sm rounded-2xl md:rounded-xl`}
							>
								{showMenu ? (
									<IconChevronLeft size={16}></IconChevronLeft>
								) : (
									<IconChevronRight
										className='mx-auto'
										size={16}
									></IconChevronRight>
								)}
							</button>
						</Tooltip>
					)}

					{/* Edit */}
					{!isHorizontal && (
						<Tooltip message='Edit'>
							<button
								onClick={() => {
									setTab('control');
									setWorkspaceMode('custom');
									setShowMenu(true);
								}}
								className={`btn btn-ghost rounded-2xl  ${
									tab === 'control' && showMenu && 'bg-base-200'
								}`}
							>
								<IconEdit className='mx-auto' size={16}></IconEdit>
							</button>
						</Tooltip>
					)}

					{/* Workspace */}
					{!isHorizontal && (
						<Tooltip message='Workspace'>
							<button
								onClick={() => {
									setTab('workspace');
									setWorkspaceMode('custom');
									setWorkspaceTab('workspace');
									setShowMenu(true);
								}}
								className={`btn btn-ghost rounded-2xl ${
									tab === 'workspace' && showMenu && 'bg-base-200'
								}`}
							>
								<IconWallpaper className='mx-auto' size={16}></IconWallpaper>
							</button>
						</Tooltip>
					)}
				</div>
			</div>
		</div>
	);
};

export default LeftPanel;
