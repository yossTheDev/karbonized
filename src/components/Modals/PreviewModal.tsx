import { FileImage, FileJson, Share2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
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
				</DialogHeader>

				<div className='flex flex-auto select-none flex-col overflow-y-auto'>
					<div className='mx-auto my-auto w-96 rounded-2xl bg-muted p-4 shadow-inner'>
						{previewImage !== '' ? (
							<TransformWrapper>
								<TransformComponent>
									<img className='rounded' src={previewImage} alt='preview' />
								</TransformComponent>
							</TransformWrapper>
						) : (
							<div className='text-center'>
								<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
							</div>
						)}
					</div>
				</div>

				<DialogFooter>
					<Button className='mr-auto' onMouseDown={handleShare}>
						<Share2 className='mr-2' size={20} />
						Share
					</Button>

					<p className='my-auto mr-3 select-none text-xs text-muted-foreground'>
						Save as
					</p>

					<Button
						variant='outline'
						size='icon'
						onMouseDown={() => {
							exportImage(export_format.png);
						}}
					>
						<FileImage size={20} />
					</Button>
					<Button
						variant='outline'
						size='icon'
						onMouseDown={() => {
							exportImage(export_format.jpeg);
						}}
					>
						<FileImage size={20} />
					</Button>
					<Button
						variant='outline'
						size='icon'
						onMouseDown={() => {
							exportImage(export_format.svg);
						}}
					>
						<FileJson size={20} />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PreviewModal;
