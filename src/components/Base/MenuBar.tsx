import React, { useCallback, useEffect, useState } from 'react';
import { DropMenu, MenuItem, MenuSeparator } from '../CustomControls/DropMenu';
import {
	IconArrowBack,
	IconArrowForward,
	IconFileTypeJpg,
	IconFileTypePng,
	IconFileTypeSvg,
	IconFlask,
	IconInfoCircle,
	IconPlus,
	IconShare,
	IconX,
} from '@tabler/icons-react';
import { ProjectWizard } from '../Modals/ProjectWizard';
import { useStoreActions, useStoreState } from '../../stores/Hooks';
import { ExportImage, export_format } from '../../utils/Exporter';
import { AboutModal } from '../Modals/AboutModal';
import { Button, Modal } from 'react-daisyui';

import karbonized from '../../assets/karbonized.svg';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { toBlob, toJpeg } from 'html-to-image';
import { PreviewModal } from '../Modals/PreviewModal';

export const MenuBar: React.FC = () => {
	/* Panels */
	const [showWizard, setShowWizard] = useState(true);
	const [showAbout, setShowAbout] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [showPreview, setShowPreview] = useState(false);
	/* Actions */
	const redo = useStoreActions((state) => state.redo);
	const undo = useStoreActions((state) => state.undo);

	/* App Store */
	const controls = useStoreState((state) => state.ControlsTree);
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

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
						</>
					}
				></DropMenu>

				<div id='menubar'></div>

				<DropMenu
					label='About'
					menu={
						<>
							<MenuItem
								click={() => setShowAbout(true)}
								icon={
									<IconInfoCircle
										size={16}
										className='-scale-y-[1]'
									></IconInfoCircle>
								}
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
		</>
	);
};
