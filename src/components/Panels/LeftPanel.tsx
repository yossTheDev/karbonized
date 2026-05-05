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
	AppWindow,
	Badge,
	Circle,
	CodeSquare,
	Crop,
	Ellipsis,
	Hand,
	Image,
	MousePointer2,
	QrCode,
	Smartphone,
	Sticker,
	Type,
	ChevronLeft,
	ChevronRight,
	Square,
	PenTool,
	Puzzle,
	Moon,
	Sun,
	LayoutTemplate,
	BoxSelect,
	X,
	Globe,
} from 'lucide-react';
import React, { useEffect, useState, useContext, useRef, useMemo } from 'react';
import { AppContext } from '../../AppContext';
import { useScreenDirection } from '../../hooks/useScreenDirection';
import { useWorkspaceStore, useControlsStore, useUIStore } from '../../stores';
import { isElectron } from '../../utils/isElectron';
import { Tooltip } from '../CustomControls/Tooltip';
import { Separator } from '../ui/separator';
import { IconBrandHtml5, IconBrandX, IconHtml } from '@tabler/icons-react';
import { ComponentsGalleryDialog } from '../Modals/ComponentsGalleryDialog';
import { useKComponentStore } from '../../stores/kcomponent-store';
import { KComponent } from '../../models/KComponent';
import { Package } from 'lucide-react';

export const LeftPanel: React.FC = () => {
	/* App Store */
	const addControl = useControlsStore((state) => state.addControl);
	const addInitialProperty = useControlsStore(
		(state) => state.addInitialProperty,
	);
	const workspaceMode = useUIStore((state) => state.workspaceMode);
	const setWorkspaceMode = useUIStore((state) => state.setWorkspaceMode);
	const setWorkspaceTab = useUIStore((state) => state.setSelectedTab);
	const setEditing = useUIStore((state) => state.setEditing);
	const editing = useUIStore((state) => state.editing);
	const drag = useUIStore((state) => state.drag);
	const setDrag = useUIStore((state) => state.setDrag);
	const crop = useUIStore((state) => state.crop);
	const setCrop = useUIStore((state) => state.setCrop);
	const warp = useUIStore((state) => state.warp);
	const setWarp = useUIStore((state) => state.setWarp);
	const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
	const currentWorkspaceID = useWorkspaceStore(
		(state) => state.currentWorkspaceID,
	);

	/* KComponent Store */
	const { importedComponents } = useKComponentStore();

	/* Component Gallery Dialog State */
	const [showComponentsDialog, setShowComponentsDialog] = useState(false);

	/* Component State */
	const isHorizontal = useScreenDirection();
	const { theme, toggleTheme } = useContext(AppContext);

	const [showMenu, setShowMenu] = useState(!isHorizontal);
	const [tab, setTab] = useState('hierarchy');
	const [visibleCount, setVisibleCount] = useState(10);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const containerRef = useRef<HTMLDivElement>(null);

	// Handler to add imported component to canvas
	const handleAddKComponentToCanvas = (component: KComponent) => {
		const getElementsByType = (type: string) => {
			if (currentWorkspace !== undefined)
				return (
					currentWorkspace?.controls.filter((item) => item.type === type)
						?.length + 1
				);
		};

		// Create an HTML block with the imported component's content
		const controlId = `html-${getRandomNumber()}`;
		addControl(
			{
				type: 'html',
				id: controlId,
				isSelectable: true,
				isDeleted: false,
				name: component.manifest.name || `html ${getElementsByType('html')}`,
				isVisible: true,
			},
			currentWorkspaceID,
		);

		// Set the HTML, CSS, and JS content from the imported component
		// using the store's initialProperties mechanism
		addInitialProperty(
			{ id: `${controlId}-html`, value: component.html },
			currentWorkspaceID,
		);
		addInitialProperty(
			{ id: `${controlId}-css`, value: component.css },
			currentWorkspaceID,
		);
		addInitialProperty(
			{ id: `${controlId}-js`, value: component.js },
			currentWorkspaceID,
		);
	};

	// Tool configuration
	const tools = useMemo(() => {
		const getElementsByType = (type: string) => {
			if (currentWorkspace !== undefined)
				return (
					currentWorkspace?.controls.filter((item) => item.type === type)
						?.length + 1
				);
		};

		return [
			{
				id: 'select',
				icon: MousePointer2,
				label: 'Select',
				shortcut: 'Ctrl+W',
				action: () => {
					setEditing(true);
					setDrag(false);
					setCrop(false);
					setWarp(false);
				},
				isActive: editing && !crop && !warp,
			},
			{
				id: 'pan',
				icon: Hand,
				label: 'Pan',
				shortcut: 'Ctrl+E',
				action: () => {
					setEditing(false);
					setCrop(false);
					setWarp(false);
					setDrag(true);
				},
				isActive: drag,
			},
			{
				id: 'crop',
				icon: Crop,
				label: 'Crop',
				shortcut: 'Ctrl+Y',
				action: () => {
					setDrag(false);
					setWarp(false);
					setCrop(true);
				},
				isActive: crop,
			},
			{
				id: 'warp',
				icon: BoxSelect,
				label: 'Warp',
				shortcut: 'Ctrl+G',
				action: () => {
					setDrag(false);
					setCrop(false);
					setWarp(!warp);
				},
				isActive: warp,
			},
			{
				id: 'code',
				icon: CodeSquare,
				label: 'Code',
				action: () => {
					addControl(
						{
							type: 'code',
							id: `code-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `code ${getElementsByType('code')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'image',
				icon: Image,
				label: 'Image',
				action: () => {
					addControl(
						{
							type: 'image',
							id: `image-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `image ${getElementsByType('image')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'icon',
				icon: Sticker,
				label: 'Icon',
				action: () => {
					addControl(
						{
							type: 'icon',
							id: `icon-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `icon ${getElementsByType('icon')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'text',
				icon: Type,
				label: 'Text',
				action: () => {
					addControl(
						{
							type: 'text',
							id: `text-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `text ${getElementsByType('text')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'shape',
				icon: Circle,
				label: 'Shape',
				action: () => {
					addControl(
						{
							type: 'shape',
							id: `shape-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `shape ${getElementsByType('shape')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'phone',
				icon: Smartphone,
				label: 'Phone',
				action: () => {
					addControl(
						{
							type: 'phone_mockup',
							id: `phone_mockup-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `phone mockup ${getElementsByType('phone_mockup')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'qr',
				icon: QrCode,
				label: 'QR Code',
				action: () => {
					addControl(
						{
							type: 'qr',
							id: `qr-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `qr ${getElementsByType('qr')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'badge',
				icon: Badge,
				label: 'Badge',
				action: () => {
					addControl(
						{
							type: 'badge',
							id: `badge-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `badge ${getElementsByType('badge')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'tweet',
				icon: IconBrandX,
				label: 'Tweet',
				action: () => {
					addControl(
						{
							type: 'tweet',
							id: `tweet-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `tweet ${getElementsByType('tweet')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'window',
				icon: AppWindow,
				label: 'Window',
				action: () => {
					addControl(
						{
							type: 'window',
							id: `window-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `window ${getElementsByType('window')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'html',
				icon: IconBrandHtml5,
				label: 'HTML',
				action: () => {
					addControl(
						{
							type: 'html',
							id: `html-${getRandomNumber()}`,
							isSelectable: true,
							isDeleted: false,
							name: `html ${getElementsByType('html')}`,
							isVisible: true,
						},
						currentWorkspaceID,
					);
				},
				isActive: false,
			},
			{
				id: 'components',
				icon: Package,
				label: 'Components',
				action: () => {
					setShowComponentsDialog(true);
				},
				isActive: false,
			},
		];
	}, [
		editing,
		crop,
		warp,
		drag,
		setEditing,
		setDrag,
		setCrop,
		setWarp,
		addControl,
		currentWorkspace,
	]);

	// Calculate visible tools based on screen height
	useEffect(() => {
		const updateVisibleCount = () => {
			if (containerRef.current) {
				const containerHeight = containerRef.current.clientHeight;
				const itemHeight = 44; // Button height + gap
				const separatorHeight = 20;
				const availableHeight = containerHeight - separatorHeight;
				const maxVisible = Math.floor(availableHeight / itemHeight);
				setVisibleCount(Math.max(3, maxVisible)); // Minimum 3 visible items
			}
		};

		updateVisibleCount();
		window.addEventListener('resize', updateVisibleCount);
		return () => window.removeEventListener('resize', updateVisibleCount);
	}, []);

	const visibleTools = tools.slice(0, visibleCount);
	const overflowTools = tools.slice(visibleCount);

	/* Show/Close Menu KeyShortcut */
	const onKeyDown = (event: KeyboardEvent): void => {
		if (event.ctrlKey && event.key === 'b') {
			event.preventDefault();
			setShowMenu(!showMenu);
		} else if (event.ctrlKey && event.key === 'w') {
			event.preventDefault();
			setEditing(true);
			setDrag(false);
			setWarp(false);
			setCrop(false);
		} else if (event.ctrlKey && event.key === 'e') {
			event.preventDefault();
			setEditing(false);
			setCrop(false);
			setWarp(false);
			setDrag(true);
		} else if (event.ctrlKey && event.key === 'y') {
			event.preventDefault();
			setDrag(false);
			setWarp(false);
			setCrop(true);
		} else if (event.ctrlKey && event.key === 'g') {
			event.preventDefault();
			setEditing(true);
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

	return (
		<div
			className='pointer-events-auto z-30 mr-auto flex h-full w-5/6 grow-0 flex-col justify-center gap-1 overflow-hidden p-2 py-4 text-foreground md:w-fit md:max-w-40'
			ref={containerRef}
		>
			{/* Controls */}
			<div className='bg-white dark:bg-dark-base-200 border border-neutral-200 dark:border-dark-base-100 flex w-10 flex-col items-center gap-2 text-foreground rounded-2xl px-6 py-3'>
				{visibleTools.map((tool, index) => (
					<React.Fragment key={tool.id}>
						<Tooltip
							message={`${tool.label}${tool.shortcut ? ` (${tool.shortcut})` : ''}`}
						>
							<Button
								onClick={tool.action}
								variant={tool.isActive ? 'default' : 'ghost'}
								size={'icon'}
								className='liquid-motion relative'
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
							>
								<tool.icon
									size={16}
									className={`liquid-motion ${
										hoveredIndex === index ? 'scale-110' : 'scale-100'
									}`}
								/>
								{tool.shortcut && (
									<span className='absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-xl dark:bg-white dark:text-black bg-neutral-950 text-[8px] font-sans font-bold text-primary-foreground'>
										{tool.shortcut.split('+')[1]}
									</span>
								)}
							</Button>
						</Tooltip>
						{index === 3 && (
							<Separator
								orientation='horizontal'
								className='-mx-1.5 my-1.5 h-px bg-border/50'
							/>
						)}
					</React.Fragment>
				))}

				{overflowTools.length > 0 && (
					<>
						<Separator
							orientation='horizontal'
							className='-mx-1.5 my-1.5 h-px bg-border/50'
						/>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size={'icon'} variant={'ghost'} className='rounded-xl'>
									<Ellipsis size={16}></Ellipsis>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent side='right'>
								<DropdownMenuLabel>More Controls</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{overflowTools.map((tool) => (
									<DropdownMenuItem key={tool.id} onClick={tool.action}>
										<tool.icon className='mr-2 size-4 shrink-0' />
										{tool.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				)}
			</div>

			{/* Tabs */}
			<div className='hidden flex-auto overflow-y-auto'>
				{/* Selectors */}
				<div className='flex flex-auto flex-col gap-2 text-foreground'>
					{/* Theme Button */}
					{!isHorizontal && (
						<Button
							className='mx-auto mb-2 rounded-xl'
							size='icon'
							variant='ghost'
							onClick={() => {
								toggleTheme();
							}}
						>
							{theme === 'light' ? (
								<Moon className='size-4 text-foreground'></Moon>
							) : (
								<Sun className='size-4 text-foreground'></Sun>
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
							className='rounded-xl'
						>
							<Square className='mx-auto size-4'></Square>
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
								className='rounded-xl'
							>
								<Puzzle className='mx-auto size-4'></Puzzle>
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
								className='rounded-xl'
							>
								{showMenu ? (
									<ChevronLeft className='size-4'></ChevronLeft>
								) : (
									<ChevronRight className='mx-auto size-4'></ChevronRight>
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
								className='rounded-xl'
							>
								<PenTool className='mx-auto size-4'></PenTool>
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
								className='rounded-xl'
							>
								<LayoutTemplate className='mx-auto size-4'></LayoutTemplate>
							</Button>
						</Tooltip>
					)}
				</div>
			</div>

			{/* Components Gallery Dialog */}
			<ComponentsGalleryDialog
				open={showComponentsDialog}
				onOpenChange={setShowComponentsDialog}
				onAddToCanvas={handleAddKComponentToCanvas}
			/>
		</div>
	);
};

export default LeftPanel;
