/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from '@/components/ui/menubar';
import CryptoJS from 'crypto-js';
import FileSaver from 'file-saver';
import { toBlob, toPng } from 'html-to-image';
import React, {
	Suspense,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { AppContext } from '../../AppContext';
import { useScreenDirection } from '../../hooks/useScreenDirection';
import { type Project } from '../../stores/AppStore';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ExportImage, export_format } from '../../utils/Exporter';
import { getRandomNumber } from '../../utils/getRandom';
import { PROJECT_KEY } from '../../utils/secrets';
import { Edit, File, Info, Plus, Square, View } from 'lucide-react';
import TabBar from './TabBar';
import { Button } from '@/components/ui/button';

const AboutModal = React.lazy(async () => await import('../Modals/AboutModal'));
const ChangelogModal = React.lazy(
	async () => await import('../Modals/ChangelogModal'),
);
const DonationsModal = React.lazy(
	async () => await import('../Modals/DonationsModal'),
);
const PreviewModal = React.lazy(
	async () => await import('../Modals/PreviewModal'),
);
const ProjectWizard = React.lazy(
	async () => await import('../../pages/ProjectWizard'),
);

export const MenuBar: React.FC = () => {
	/* App Context */
	const { showWizard, setShowWizard } = useContext(AppContext);

	/* Panels */
	const about = useRef<HTMLDialogElement>(null);
	const { viewerRef } = useContext(AppContext);
	const isHorizontal = useScreenDirection();

	const [showAbout, setShowAbout] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	const [showChangelog, setShowChangelog] = useState(false);
	const [showDonations, setShowDonations] = useState(false);

	/* Actions */
	const redo = useStoreActions((state) => state.redo);
	const undo = useStoreActions((state) => state.undo);

	/* App Store */
	const currentControlProperties = useStoreState(
		(state) => state.currentControlProperties,
	);
	const saveProject = useStoreState((state) => state.saveProject);
	const loadProject = useStoreActions((state) => state.loadProject);

	const addControl = useStoreActions((state) => state.addControl);

	const addControlProperty = useStoreActions(
		(state) => state.addControlProperty,
	);
	const addInitialProperty = useStoreActions(
		(state) => state.addInitialProperty,
	);
	const addWorkspace = useStoreActions((state) => state.addWorkspace);
	const cleanWorkspace = useStoreActions((state) => state.cleanWorkspace);

	const currentWorkspace = useStoreState((state) => state.currentWorkspace);
	const controlID = useStoreState((state) => state.currentControlID);
	const workspaces = useStoreState((state) => state.workspaces);

	/* Handle Key Shortcuts */
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'n') {
			event.preventDefault();
			setShowWizard(true);
		} else if (event.ctrlKey && event.key === 'p') {
			event.preventDefault();
			setShowPreview(true);
		} else if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
			void handleSaveProject();
		} else if (event.key === 'Escape') {
			event.preventDefault();

			if (workspaces.length > 0) {
				setShowWizard(false);
			}

			setShowAbout(false);
			setShowPreview(false);
			setShowChangelog(false);
			setShowDonations(false);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [workspaces]);

	const exportImage = (type: export_format) => {
		ExportImage(
			currentWorkspace.workspaceName,
			document.getElementById('workspace'),
			type,
		);
	};

	const getElementsByType = (type: string) => {
		return (
			currentWorkspace.controls.filter((item) => item.type === type).length + 1
		);
	};

	const duplicate = (): void => {
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
				currentWorkspace.controls.find((item) => item.id === controlID)?.type ??
				newControlID.split('-')[0],
			id: newControlID,
			isSelectable: true,
			isDeleted: false,
			name: `${newControlID.split('-')[0]} ${getElementsByType(
				newControlID.split('-')[0],
			)}`,
			isVisible: true,
		});
	};

	const handleShare = async () => {
		const element = document.getElementById('workspace');
		if (element) {
			const newFile = await toBlob(element);
			if (newFile) {
				const data = {
					files: [
						new File([newFile], 'image.png', {
							type: newFile.type,
						}),
					],
					title: 'Image',
					text: 'image',
				};

				try {
					await navigator.share(data);
				} catch (err) {
					console.log(err);
				}
			}
		}
	};

	const handleLoadProject = (event: any) => {
		event.preventDefault();

		if (event.target.files && event.target.files.length > 0) {
			if ((event.target.files[0].name as string).endsWith('.kproject')) {
				const reader = new FileReader();
				reader.addEventListener('load', () => {
					try {
						const text = CryptoJS.AES.decrypt(
							reader.result as string,
							PROJECT_KEY,
						).toString(CryptoJS.enc.Utf8);
						const project = JSON.parse(text) as Project;

						if (project.properties && project.workspace) {
							loadProject(project);
						} else {
							alert('Please provide a valid Karbonized Project');
						}
					} catch (err) {
						alert('Invalid Project File');
					}
				});
				reader.readAsText(event.target?.files[0]);
			} else {
				alert('Only Karbonized Projects are allowed');
			}
		}
	};

	const handleSaveProject = async () => {
		const element = document.getElementById('workspace');

		if (element != null) {
			const data = await toPng(element);

			const project = { ...saveProject, thumb: data };

			const blob = new Blob(
				[CryptoJS.AES.encrypt(JSON.stringify(project), PROJECT_KEY).toString()],
				{
					type: 'text/plain;charset=utf-8',
				},
			);

			FileSaver.saveAs(blob, currentWorkspace.workspaceName + '.kproject');
		}
	};

	const handleSaveAsJson = async () => {
		const element = document.getElementById('workspace');

		if (element) {
			const data = await toPng(element);

			const project = { ...saveProject, thumb: data };

			project.workspace.id = getRandomNumber().toString();

			const blob = new Blob([JSON.stringify(project)], {
				type: 'text/plain;charset=utf-8',
			});

			FileSaver.saveAs(blob, currentWorkspace.workspaceName + '.json');
		}
	};

	const handleNewWorkspace = () => {
		addWorkspace('');
	};

	const handleCleanWorkspace = () => {
		cleanWorkspace();
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

	return (
		<>
			<div className='z-10 flex items-center gap-1 overflow-hidden dark:text-gray-200'>
				<Menubar>
					{/* File */}
					<MenubarMenu>
						<MenubarTrigger>
							<File size={16}></File>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem onClick={() => setShowWizard(true)}>
								New Project <MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>

							<MenubarItem
								onClick={() => {
									loadProject();
								}}
							>
								Load Project
							</MenubarItem>

							<MenubarItem
								onClick={async () => {
									await handleSaveProject();
								}}
							>
								Save Project
							</MenubarItem>

							<MenubarItem
								onClick={async () => {
									await handleSaveAsJson();
								}}
							>
								Save Project as Template
							</MenubarItem>

							<MenubarItem
								onClick={async () => {
									setShowPreview(true);
								}}
							>
								Render
								<MenubarShortcut>⌘P</MenubarShortcut>
							</MenubarItem>

							<MenubarSub>
								<MenubarSubTrigger>Export as</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem
										onClick={() => {
											exportImage(export_format.png);
										}}
									>
										Export as PNG
									</MenubarItem>

									<MenubarItem
										onClick={() => {
											exportImage(export_format.jpeg);
										}}
									>
										Export as JPEG
									</MenubarItem>

									<MenubarItem
										onClick={() => {
											exportImage(export_format.svg);
										}}
									>
										Export as SVG
									</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>

							<MenubarSeparator />
							<MenubarItem>Share</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>Print</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					{/* Edit */}
					<MenubarMenu>
						<MenubarTrigger>
							<Edit size={16}></Edit>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem
								onClick={() => {
									undo();
								}}
							>
								Undo
								<MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem
								onClick={() => {
									redo();
								}}
							>
								Redo
								<MenubarShortcut>⌘Y</MenubarShortcut>
							</MenubarItem>

							<MenubarItem
								onClick={() => {
									duplicate();
								}}
							>
								Duplicate
								<MenubarShortcut>⌘D</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					{/* Workspace */}
					<MenubarMenu>
						<MenubarTrigger>
							<Square size={16}></Square>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem
								onClick={() => {
									handleNewWorkspace();
								}}
							>
								New Workspace
								<MenubarShortcut>⌘M</MenubarShortcut>
							</MenubarItem>
							<MenubarItem
								onClick={() => {
									handleCleanWorkspace();
								}}
							>
								Clean Workspace
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					{/* View */}
					<MenubarMenu>
						<MenubarTrigger>
							<View size={16}></View>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem
								onClick={() =>
									viewerRef.current?.setZoom(viewerRef.current?.getZoom() + 0.2)
								}
							>
								Zoom In
							</MenubarItem>

							<MenubarItem
								onClick={() =>
									viewerRef.current?.setZoom(viewerRef.current?.getZoom() - 0.2)
								}
							>
								Zoom In
							</MenubarItem>

							<MenubarItem onClick={() => viewerRef.current?.setZoom(0.7)}>
								Zoom Reset
							</MenubarItem>

							<MenubarSeparator></MenubarSeparator>

							<MenubarItem
								onClick={() => {
									centerView();
								}}
							>
								Center View
								<MenubarShortcut>⌘Space</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					{/* About */}
					<MenubarMenu>
						<MenubarTrigger>
							<Info size={16}></Info>
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Donations</MenubarItem>

							<MenubarItem>Changelog</MenubarItem>

							<MenubarItem>About</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>

				<TabBar></TabBar>

				<Button onClick={handleNewWorkspace} size={'icon'} variant={'ghost'}>
					<Plus size={16}></Plus>
				</Button>
			</div>

			{showWizard && (
				<Suspense>
					<ProjectWizard
						onClose={() => setShowWizard(false)}
						open={showWizard}
					></ProjectWizard>
				</Suspense>
			)}

			{showAbout && (
				<Suspense>
					<AboutModal
						ref={about}
						open
						onClose={() => {
							setShowAbout(false);
						}}
					></AboutModal>
				</Suspense>
			)}

			{showPreview && (
				<Suspense>
					<PreviewModal
						onClose={() => {
							setShowPreview(false);
						}}
						open={showPreview}
					></PreviewModal>
				</Suspense>
			)}

			{showChangelog && (
				<Suspense>
					<ChangelogModal
						onClose={() => {
							setShowChangelog(false);
						}}
						open={showChangelog}
					></ChangelogModal>
				</Suspense>
			)}

			{showDonations && (
				<Suspense>
					<DonationsModal
						onClose={() => {
							setShowDonations(false);
						}}
						open={showDonations}
					></DonationsModal>
				</Suspense>
			)}
		</>
	);
};

export default MenuBar;
