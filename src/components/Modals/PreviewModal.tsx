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
import karbonized from '../../assets/karbonized.svg';
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
		<Modal
			open={open}
			onClickBackdrop={() => {
				onClose && onClose();
			}}
			className='overflow-hidden border border-neutral bg-base-200/95 backdrop-blur-2xl'
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
				<div className='mx-auto my-auto   w-96  rounded-2xl bg-base-200/70 p-4 shadow-inner'>
					{previewImage !== '' ? (
						<TransformWrapper>
							<TransformComponent>
								<img className='rounded' src={previewImage} alt='preview'></img>
							</TransformComponent>
						</TransformWrapper>
					) : (
						<div className=' text-gray-500 dark:text-gray-300'>
							<IconCircleDashed
								size={56}
								className='mx-auto my-auto animate-spin'
							></IconCircleDashed>
						</div>
					)}
				</div>
			</Modal.Body>

			<Modal.Actions>
				<Button
					className='mr-auto cursor-pointer select-none rounded-2xl bg-base-100 bg-gradient-to-br from-violet-500 to-secondary p-3 text-white hover:bg-gradient-to-bl'
					onMouseDown={handleShare}
				>
					<div className='my-auto flex flex-auto flex-row gap-2'>
						<IconShare></IconShare>
						<p className='my-auto'>Share</p>
					</div>
				</Button>

				<p className='my-auto ml-auto mr-3 select-none text-xs dark:text-gray-600'>
					Save as
				</p>

				<Button
					className='flex cursor-pointer select-none rounded-2xl bg-base-200 p-3 hover:bg-neutral'
					onMouseDown={() => exportImage(export_format.png)}
				>
					<div className='mx-auto my-auto flex flex-auto flex-row gap-2'>
						<IconFileTypePng className='mx-auto'></IconFileTypePng>
					</div>
				</Button>
				<Button
					className='flex cursor-pointer select-none rounded-2xl bg-base-200 p-3 hover:bg-neutral'
					onMouseDown={() => exportImage(export_format.jpeg)}
				>
					<div className='mx-auto my-auto flex flex-auto flex-row gap-2'>
						<IconFileTypeJpg className='mx-auto'></IconFileTypeJpg>
					</div>
				</Button>
				<Button
					className='flex cursor-pointer select-none rounded-2xl bg-base-200 p-3 hover:bg-neutral'
					onMouseDown={() => exportImage(export_format.svg)}
				>
					<div className='mx-auto my-auto flex flex-auto flex-row gap-2'>
						<IconFileTypeSvg className='mx-auto'></IconFileTypeSvg>
					</div>
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
