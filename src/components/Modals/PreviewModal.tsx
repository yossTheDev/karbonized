import {
	IconCircleDashed,
	IconFileTypeJpg,
	IconFileTypePng,
	IconFileTypeSvg,
	IconShare,
	IconX,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Progress } from 'react-daisyui';
import karbonized from '../../assets/logo.svg';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ExportImage, export_format } from '../../utils/Exporter';
import { toBlob, toJpeg } from 'html-to-image';
import { useStoreState } from '../../stores/Hooks';
interface Props {
	open: boolean;
	onClose?: Function;
}

export const PreviewModal: React.FC<Props> = ({ open, onClose }) => {
	/* Component State */
	const [previewImage, setPreviewImage] = useState('');

	/* App Store */
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	/* Actions */
	const exportImage = (type: export_format) => {
		ExportImage(
			currentWorkspace.workspaceName,
			document.getElementById('workspace'),
			type,
		);
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
			})
			.catch((err) => {
				console.log(err);
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

	useEffect(() => {
		showPreviewImage();
	}, []);

	return (
		<Modal.Legacy
			open={open}
			onClickBackdrop={() => {
				onClose && onClose();
			}}
			className='max-h-fit overflow-hidden bg-base-300'
		>
			<Modal.Header className='flex flex-row font-bold dark:text-white'>
				<div className='flex w-fit flex-row gap-1 rounded-xl bg-base-200/75 p-2'>
					<img className='h-10' src={karbonized}></img>
					<p className='poppins-font-family mx-2 my-auto text-2xl dark:text-white '>
						Export
					</p>
				</div>

				<Button
					shape='circle'
					onClick={() => {
						onClose && onClose();
					}}
					className='ml-auto'
				>
					<IconX></IconX>
				</Button>
			</Modal.Header>

			<Modal.Body className='flex max-h-96 flex-auto select-none flex-col overflow-y-scroll'>
				<div className='mx-auto my-auto w-96  rounded-2xl bg-base-200/70 p-4 shadow-inner'>
					{previewImage !== '' ? (
						<TransformWrapper>
							<TransformComponent>
								<img className='rounded' src={previewImage} alt='preview'></img>
							</TransformComponent>
						</TransformWrapper>
					) : (
						<div className='text-center'>
							<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
						</div>
					)}
				</div>
			</Modal.Body>

			<Modal.Actions>
				<Button className='mr-auto rounded-2xl' onMouseDown={handleShare}>
					<IconShare></IconShare>
					<p className='my-auto cursor-pointer'>Share</p>
				</Button>

				<p className='my-auto ml-auto mr-3 select-none text-xs text-base-content/70'>
					Save as
				</p>

				<Button
					className='rounded-2xl'
					onMouseDown={() => exportImage(export_format.png)}
				>
					<IconFileTypePng className='mx-auto'></IconFileTypePng>
				</Button>
				<Button
					className='rounded-2xl'
					onMouseDown={() => exportImage(export_format.jpeg)}
				>
					<IconFileTypeJpg className='mx-auto'></IconFileTypeJpg>
				</Button>
				<Button
					className='rounded-2xl'
					onMouseDown={() => exportImage(export_format.svg)}
				>
					<IconFileTypeSvg className='mx-auto'></IconFileTypeSvg>
				</Button>
			</Modal.Actions>
		</Modal.Legacy>
	);
};

export default PreviewModal;
