import { FileImage, FileJson, Share2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import karbonized from '../../assets/logo.svg';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ExportImage, export_format } from '../../utils/Exporter';
import { toBlob, toJpeg } from 'html-to-image';
import { useStoreState } from '../../stores/Hooks';

interface Props {
	open: boolean;
	onClose?: () => void;
}

export const PreviewModal: React.FC<Props> = ({ open, onClose }) => {
	/* Component State */
	const [previewImage, setPreviewImage] = useState('');

	/* App Store */
	const currentWorkspace = useStoreState((state) => state.currentWorkspace);

	/* Actions */
	const exportImage = (type: export_format) => {
		ExportImage(
			currentWorkspace?.workspaceName ?? 'workspace',
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
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-4xl max-h-[90vh] overflow-hidden'>
				<DialogHeader>
					<div className='flex items-center gap-2 rounded-xl bg-muted px-3 py-2 w-fit'>
						<img className='h-10' src={karbonized} alt='Karbonized' />
						<DialogTitle className='text-2xl font-heading'>Export</DialogTitle>
					</div>
					<DialogDescription>
						Preview and export your workspace as an image or JSON template
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-auto select-none flex-col overflow-y-auto'>
					<div className='mx-auto my-auto w-full max-w-lg rounded-2xl bg-muted p-6 shadow-inner'>
						{previewImage !== '' ? (
							<TransformWrapper>
								<TransformComponent>
									<img
										className='rounded w-full'
										src={previewImage}
										alt='preview'
									/>
								</TransformComponent>
							</TransformWrapper>
						) : (
							<div className='text-center py-12'>
								<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
							</div>
						)}
					</div>
				</div>

				<DialogFooter className='flex-col sm:flex-row gap-3'>
					<Button
						className='w-full sm:w-auto'
						variant='outline'
						onMouseDown={handleShare}
					>
						<Share2 className='mr-2' size={20} />
						Share
					</Button>

					<div className='flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto'>
						<Button
							variant='default'
							onMouseDown={() => {
								exportImage(export_format.png);
							}}
						>
							<FileImage className='mr-2' size={20} />
							PNG
						</Button>
						<Button
							variant='default'
							onMouseDown={() => {
								exportImage(export_format.jpeg);
							}}
						>
							<FileImage className='mr-2' size={20} />
							JPG
						</Button>
						<Button
							variant='default'
							onMouseDown={() => {
								exportImage(export_format.svg);
							}}
						>
							<FileJson className='mr-2' size={20} />
							SVG
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PreviewModal;
