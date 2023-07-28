import React, { useEffect, useState } from 'react';
import { DropMenu, MenuItem, MenuSeparator } from '../CustomControls/DropMenu';
import {
	IconArrowBack,
	IconArrowForward,
	IconClock,
	IconCopy,
	IconFileTypeJpg,
	IconFileTypePng,
	IconFileTypeSvg,
	IconFlask,
	IconInfoHexagon,
	IconMoneybag,
	IconPigMoney,
	IconPlus,
} from '@tabler/icons-react';
import { ProjectWizard } from '../Modals/ProjectWizard';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ExportImage, export_format } from '../../utils/Exporter';
import { AboutModal } from '../Modals/AboutModal';

import { toBlob, toJpeg } from 'html-to-image';
import { PreviewModal } from '../Modals/PreviewModal';
import { getRandomNumber } from '../../utils/getRandom';
import { ChangelogModal } from '../Modals/ChangelogModal';
import { DonationsModal } from '../Modals/DonationsModal';

export const MenuBar: React.FC = () => {
	/* Panels */
	const [showWizard, setShowWizard] = useState(true);
	const [showAbout, setShowAbout] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
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
	const addControl = useStoreActions((state) => state.addControl);
	const addControlProperty = useStoreActions(
		(state) => state.addControlProperty,
	);
	const addInitialProperty = useStoreActions(
		(state) => state.addInitialProperty,
	);

	const currentWorkspace = useStoreState((state) => state.currentWorkspace);
	const controlID = useStoreState((state) => state.currentControlID);

	/* Handle Key Shortcuts */
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'n') {
			event.preventDefault();
			setShowWizard(true);
		}
		if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
			setShowPreview(true);
		} else if (event.key === 'Escape') {
			event.preventDefault();
			setShowWizard(false);
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
	});

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
			type: newControlID.split('-')[0],
			id: newControlID,
			isSelectable: true,
			isDeleted: false,
			name: `${newControlID.split('-')[0]} ${getElementsByType(
				newControlID.split('-')[0],
			)}`,
			isVisible: true,
		});
	};

	// Share Image
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

	const showPreviewImage = async () => {
		const element = document.getElementById('workspace');

		if (element === null) {
			return;
		}

		toJpeg(element, {
			cacheBust: true,
		})
			.then((dataUrl) => {
				setPreviewImage(dataUrl);
				setShowPreview(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className='z-10 mx-2 my-1 flex dark:text-gray-300'>
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

							<MenuSeparator></MenuSeparator>

							<MenuItem
								click={() => showPreviewImage()}
								icon={<IconFlask size={16}></IconFlask>}
								label='Render'
								shortcut='Ctrl+S'
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
								icon={<IconCopy size={16} className='-scale-y-[1]'></IconCopy>}
								label='Duplicate'
								shortcut='Ctrl+D'
							></MenuItem>
						</>
					}
				></DropMenu>

				<div id='menubar'></div>

				<DropMenu
					label='About'
					menu={
						<>
							<MenuItem
								click={() => setShowDonations(true)}
								icon={<IconPigMoney size={16}></IconPigMoney>}
								label='Donations'
							></MenuItem>

							<MenuItem
								click={() => setShowChangelog(true)}
								icon={<IconClock size={16}></IconClock>}
								label='Changelog'
							></MenuItem>

							<MenuItem
								click={() => setShowAbout(true)}
								icon={<IconInfoHexagon size={16}></IconInfoHexagon>}
								label='About'
							></MenuItem>
						</>
					}
				></DropMenu>
			</div>

			{showWizard && (
				<ProjectWizard
					onClose={() => setShowWizard(false)}
					open={showWizard}
				></ProjectWizard>
			)}

			{showAbout && (
				<AboutModal open onClose={() => setShowAbout(false)}></AboutModal>
			)}

			{showPreview && (
				<PreviewModal
					onClose={() => setShowPreview(false)}
					open={showPreview}
				></PreviewModal>
			)}

			{showChangelog && (
				<ChangelogModal
					onClose={() => setShowChangelog(false)}
					open={showChangelog}
				></ChangelogModal>
			)}

			{showDonations && (
				<DonationsModal
					onClose={() => setShowDonations(false)}
					open={showDonations}
				></DonationsModal>
			)}
		</>
	);
};
