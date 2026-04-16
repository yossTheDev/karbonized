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
	IconBrandTwitter,
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
	Type,
} from 'lucide-react';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../AppContext';
import { useScreenDirection } from '../../hooks/useScreenDirection';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { isElectron } from '../../utils/isElectron';
import { Tooltip } from '../CustomControls/Tooltip';

export const LeftPanel: React.FC = () => {
	/* App Store */
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
	const { theme, toggleTheme } = useContext(AppContext);

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
		if (currentWorkspace !== undefined)
			return (
				currentWorkspace?.controls.filter((item) => item.type === type)
					?.length + 1
			);
	};

	return (
		<div className='pointer-events-auto z-30 mr-auto flex h-full w-5/6 grow-0 flex-col gap-1 overflow-hidden bg-muted p-2 text-foreground md:w-fit md:max-w-40'>
			{/* Controls */}
			<div className='flex h-full w-10 flex-col items-center gap-2 text-foreground'>
				<Button
					onClick={() => {
						setEditing(true);
						setDrag(false);
						setCanDraw(false);
						setIsErasing(false);
						setCrop(false);
						setWarp(false);
					}}
					variant={editing && !crop && !warp ? 'default' : 'ghost'}
					size={'icon'}
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
					variant={drag ? 'default' : 'ghost'}
					size={'icon'}
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
					variant={crop ? 'default' : 'ghost'}
					size={'icon'}
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
					variant={warp ? 'default' : 'ghost'}
					size={'icon'}
				>
					<IconPerspective size={18}></IconPerspective>
				</Button>

				<Button
					className='hidden'
					onClick={() => {
						setCanDraw(!canDraw);
						setEditing(false);
						setDrag(false);
						setIsErasing(false);
					}}
					variant={canDraw ? 'default' : 'ghost'}
					size={'icon'}
				>
					<Brush size={18}></Brush>
				</Button>

				<Button
					className='hidden'
					onClick={() => {
						setIsErasing(!isErasing);
						setEditing(false);
						setDrag(false);
						setCanDraw(false);
					}}
					variant={isErasing ? 'default' : 'ghost'}
					size={'icon'}
				>
					<Eraser size={18}></Eraser>
				</Button>

				<div className='mx-auto my-4 hidden h-1 w-1 rounded bg-border p-1 md:flex '></div>

				{/* Code Control */}
				<Button
					variant={'ghost'}
					size={'icon'}
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
					size={'icon'}
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
					size={'icon'}
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
					<Sticker size={18} className='text-foreground'></Sticker>
				</Button>

				{/* Text Control */}
				<Button
					variant={'ghost'}
					size={'icon'}
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
					className='btn'
				>
					<Type size={18} className='text-base-content'></Type>
				</Button>

				{/* Shape Control */}
				<Button
					variant={'ghost'}
					size={'icon'}
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
					className='btn'
				>
					<Circle size={18}></Circle>
				</Button>

				{/* Phone Mockup Control */}
				<Button
					variant={'ghost'}
					size={'icon'}
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
						<Button size={'icon'} variant={'ghost'} className='btn'>
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
							<IconBrandTwitter className='mr-2' size={18}></IconBrandTwitter>{' '}
							Tweet
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
				<div className='flex flex-auto flex-col gap-2 text-foreground'>
					{/* Theme Button */}
					{!isHorizontal && (
						<Button
							className='mx-auto mb-2'
							size='icon'
							variant='ghost'
							onClick={() => {
								toggleTheme();
							}}
						>
							{theme === 'light' ? (
								<IconMoon size={16} className='text-foreground'></IconMoon>
							) : (
								<IconSun size={16} className='text-foreground'></IconSun>
							)}
						</Button>
					)}

					{/* Hierarchy */}
					<Tooltip message='Hierarchy'>
						<Button
							variant={tab === 'hierarchy' && showMenu ? 'default' : 'ghost'}
							size='icon'
							onClick={() => {
								setWorkspaceMode('custom');
								setTab('hierarchy');
								setShowMenu(true);
							}}
							className='rounded-2xl md:rounded-xl btn'
						>
							<IconCircleSquare
								className='mx-auto'
								size={16}
							></IconCircleSquare>
						</Button>
					</Tooltip>

					{/* Extensions */}
					{isElectron() && (
						<Tooltip message='Extensions'>
							<Button
								variant={tab === 'extensions' && showMenu ? 'default' : 'ghost'}
								size='icon'
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
								className='rounded-xl btn'
							>
								<IconPuzzle className='mx-auto' size={16}></IconPuzzle>
							</Button>
						</Tooltip>
					)}

					{/* Show/Close Menu */}
					{isHorizontal && (
						<Tooltip message='Show/Close Menu (Ctrl+B)'>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => {
									setWorkspaceMode('custom');
									setTab('hierarchy');
									setShowMenu(!showMenu);
								}}
								className='rounded-2xl md:rounded-xl'
							>
								{showMenu ? (
									<IconChevronLeft size={16}></IconChevronLeft>
								) : (
									<IconChevronRight
										className='mx-auto'
										size={16}
									></IconChevronRight>
								)}
							</Button>
						</Tooltip>
					)}

					{/* Edit */}
					{!isHorizontal && (
						<Tooltip message='Edit'>
							<Button
								variant={tab === 'control' && showMenu ? 'default' : 'ghost'}
								size='icon'
								onClick={() => {
									setTab('control');
									setWorkspaceMode('custom');
									setShowMenu(true);
								}}
								className='rounded-2xl'
							>
								<IconEdit className='mx-auto' size={16}></IconEdit>
							</Button>
						</Tooltip>
					)}

					{/* Workspace */}
					{!isHorizontal && (
						<Tooltip message='Workspace'>
							<Button
								variant={tab === 'workspace' && showMenu ? 'default' : 'ghost'}
								size='icon'
								onClick={() => {
									setTab('workspace');
									setWorkspaceMode('custom');
									setWorkspaceTab('workspace');
									setShowMenu(true);
								}}
								className='rounded-2xl'
							>
								<IconWallpaper className='mx-auto' size={16}></IconWallpaper>
							</Button>
						</Tooltip>
					)}
				</div>
			</div>
		</div>
	);
};

export default LeftPanel;
