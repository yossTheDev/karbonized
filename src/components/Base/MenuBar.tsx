import {
	IconArrowBack,
	IconArrowForward,
	IconClock,
	IconCopy,
	IconFileDownload,
	IconFileTypeJpg,
	IconFileTypePng,
	IconFileTypeSvg,
	IconFileUpload,
	IconFlask,
	IconFocusCentered,
	IconInfoHexagon,
	IconJson,
	IconPigMoney,
	IconPlus,
	IconSquareRotated,
	IconTrash,
	IconZoomIn,
	IconZoomOut,
	IconZoomReset,
} from '@tabler/icons-react';
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
import { Project } from '../../stores/AppStore';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ExportImage, export_format } from '../../utils/Exporter';
import { getRandomNumber } from '../../utils/getRandom';
import { DropMenu, MenuItem, MenuSeparator } from '../CustomControls/DropMenu';
import { PROJECT_KEY } from '../../utils/secrets';

const AboutModal = React.lazy(() => import('../Modals/AboutModal'));
const ChangelogModal = React.lazy(() => import('../Modals/ChangelogModal'));
const DonationsModal = React.lazy(() => import('../Modals/DonationsModal'));
const PreviewModal = React.lazy(() => import('../Modals/PreviewModal'));
const ProjectWizard = React.lazy(() => import('../../pages/ProjectWizard'));

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
			handleSaveProject();
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

	const duplicate = () => {
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
						let text = CryptoJS.AES.decrypt(
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

		if (element) {
			const data = await toPng(element);

			const project = { ...saveProject, thumb: data };

			var blob = new Blob(
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

			var blob = new Blob([JSON.stringify(project)], {
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
			<div className='z-10 mx-2 my-auto flex h-fit gap-0.5 text-base-content'>
				{!showWizard && (
					<>
						{/* File */}
						<DropMenu
							label='File'
							id='filebar'
							menu={
								<>
									<MenuItem
										click={() => setShowWizard(true)}
										icon={<IconPlus size={16}></IconPlus>}
										label='New Project'
										shortcut='Ctrl+N'
									></MenuItem>

									<label
										htmlFor='file-input'
										className='flex flex-auto cursor-pointer select-none rounded p-2 text-xs hover:cursor-pointer hover:bg-base-300 active:bg-base-300'
									>
										<IconFileUpload size={16}></IconFileUpload>
										<p className='my-auto ml-2 hover:cursor-pointer'>
											Load Project
										</p>
									</label>

									<input
										className='hidden'
										accept='.kproject'
										onInput={handleLoadProject}
										type='file'
										id='file-input'
									></input>

									<MenuItem
										click={() => handleSaveProject()}
										icon={<IconFileDownload size={16}></IconFileDownload>}
										label='Save Project'
										shortcut='Ctrl+S'
									></MenuItem>

									<MenuSeparator></MenuSeparator>

									<MenuItem
										click={() => setShowPreview(true)}
										icon={<IconFlask size={16}></IconFlask>}
										label='Render'
										shortcut='Ctrl+P'
									></MenuItem>

									<MenuItem
										click={() => handleSaveAsJson()}
										icon={<IconJson size={16}></IconJson>}
										label='Save as Template'
									></MenuItem>

									<MenuItem
										click={() => exportImage(export_format.png)}
										icon={<IconFileTypePng size={16}></IconFileTypePng>}
										label='Export as PNG'
									></MenuItem>

									<MenuItem
										click={() => exportImage(export_format.jpeg)}
										icon={<IconFileTypeJpg size={16}></IconFileTypeJpg>}
										label='Export as JPEG'
									></MenuItem>

									<MenuItem
										click={() => exportImage(export_format.svg)}
										icon={<IconFileTypeSvg size={16}></IconFileTypeSvg>}
										label='Export as SVG'
									></MenuItem>
								</>
							}
						></DropMenu>

						{/* Edit */}
						<DropMenu
							label='Edit'
							menu={
								<>
									<MenuItem
										click={() => undo()}
										icon={
											<IconArrowBack
												size={16}
												className='-scale-y-[1]'
											></IconArrowBack>
										}
										label='Undo'
										shortcut='Ctrl+Z'
									></MenuItem>

									<MenuItem
										click={() => redo()}
										icon={
											<IconArrowForward
												size={16}
												className='-scale-y-[1]'
											></IconArrowForward>
										}
										label='Redo'
										shortcut='Ctrl+Y'
									></MenuItem>

									<MenuItem
										click={() => duplicate()}
										icon={
											<IconCopy size={16} className='-scale-y-[1]'></IconCopy>
										}
										label='Duplicate'
										shortcut='Ctrl+D'
									></MenuItem>
								</>
							}
						></DropMenu>

						{/* Workspace */}
						<DropMenu
							label='Workspace'
							menu={
								<>
									<MenuItem
										click={handleNewWorkspace}
										icon={<IconSquareRotated size={16}></IconSquareRotated>}
										label='New Workspace'
										shortcut='Ctrl+M'
									></MenuItem>

									<MenuItem
										click={handleCleanWorkspace}
										icon={<IconTrash size={16}></IconTrash>}
										label='Clean Workspace'
									></MenuItem>
								</>
							}
						></DropMenu>

						{/* View */}
						<DropMenu
							label='View'
							menu={
								<>
									<MenuItem
										click={() =>
											viewerRef.current?.setZoom(
												viewerRef.current?.getZoom() + 0.2,
											)
										}
										icon={<IconZoomIn size={16}></IconZoomIn>}
										label='Zoom In'
									></MenuItem>
									<MenuItem
										click={() =>
											viewerRef.current?.setZoom(
												viewerRef.current?.getZoom() - 0.2,
											)
										}
										icon={<IconZoomOut size={16}></IconZoomOut>}
										label='Zoom Out'
									></MenuItem>

									<MenuItem
										click={() => viewerRef.current?.setZoom(0.7)}
										icon={<IconZoomReset size={16}></IconZoomReset>}
										label='Zoom Reset'
									></MenuItem>

									<MenuSeparator></MenuSeparator>

									<MenuItem
										click={() => centerView()}
										icon={<IconFocusCentered size={16}></IconFocusCentered>}
										label='Center View'
										shortcut='Ctrl+Space'
									></MenuItem>
								</>
							}
						></DropMenu>
						{/* About */}

						<DropMenu
							label='About'
							menu={
								<>
									<MenuItem
										click={() => {
											setShowDonations(true);
										}}
										icon={<IconPigMoney size={16}></IconPigMoney>}
										label='Donations'
									></MenuItem>

									<MenuItem
										click={() => {
											setShowChangelog(true);
										}}
										icon={<IconClock size={16}></IconClock>}
										label='Changelog'
									></MenuItem>

									<MenuItem
										click={() => {
											setShowAbout(true);
											about.current?.showModal();
										}}
										icon={<IconInfoHexagon size={16}></IconInfoHexagon>}
										label='About'
									></MenuItem>
								</>
							}
						></DropMenu>
					</>
				)}
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
						onClose={() => setShowAbout(false)}
					></AboutModal>
				</Suspense>
			)}

			{showPreview && (
				<Suspense>
					<PreviewModal
						onClose={() => setShowPreview(false)}
						open={showPreview}
					></PreviewModal>
				</Suspense>
			)}

			{showChangelog && (
				<Suspense>
					<ChangelogModal
						onClose={() => setShowChangelog(false)}
						open={showChangelog}
					></ChangelogModal>
				</Suspense>
			)}

			{showDonations && (
				<Suspense>
					<DonationsModal
						onClose={() => setShowDonations(false)}
						open={showDonations}
					></DonationsModal>
				</Suspense>
			)}
		</>
	);
};

export default MenuBar;
