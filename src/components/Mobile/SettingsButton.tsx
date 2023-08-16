import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Toast } from '@capacitor/toast';
import {
	IconDotsVertical,
	IconDownload,
	IconInfoCircle,
	IconPhoto,
	IconPlus,
	IconShare,
} from '@tabler/icons-react';
import { toBlob, toPng } from 'html-to-image';
import React, { Suspense, useState } from 'react';
import { Dropdown, Modal } from 'react-daisyui';
import { Portal } from 'react-portal';
import { getRandomNumber } from '../../utils/getRandom';
import { Media } from '@capacitor-community/media';

const AboutModal = React.lazy(() => import('../Modals/AboutModal'));
const ProjectWizard = React.lazy(() => import('../Modals/ProjectWizard'));

export const HomeButton: React.FC = () => {
	const [showAbout, setShowAbout] = useState(false);
	const [showWizard, setShowWizard] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleShare = async () => {
		const element = document.getElementById('workspace');

		if (element) {
			if (Capacitor.isNativePlatform()) {
				try {
					const data = await toPng(element);

					const file = await Filesystem.writeFile({
						data: data,
						directory: Directory.Cache,
						path: `karbonized-image-${getRandomNumber()}.png`,
					});

					await Share.share({
						url: file.uri,
					});
				} catch (err) {
					Toast.show({ text: err as string });
				}
			} else {
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
		}
	};

	const handleSaveToGallery = async () => {
		setLoading(true);

		const element = document.getElementById('workspace');

		if (element) {
			try {
				const albums = await Media.getAlbums();

				let karbonized = albums.albums.find(
					(item) => item.name === 'karbonized',
				);

				if (!karbonized) {
					await Media.createAlbum({ name: 'karbonized' });

					karbonized = albums.albums.find((item) => item.name === 'karbonized');
				}

				const data = await toPng(element);

				await Media.savePhoto({
					path: data,
					albumIdentifier: karbonized?.identifier,
				});

				await Toast.show({ text: 'Saved!' });
			} catch (err) {
				await Toast.show({ text: err as string });
			}
		}

		setLoading(false);
	};

	const handleDownload = () => {
		const element = document.getElementById('workspace');

		if (element) {
			toPng(element, {
				cacheBust: true,
			})
				.then(async (dataUrl) => {
					const link = document.createElement('a');
					link.download = name + '.png';
					link.href = dataUrl;
					link.click();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<>
			<Dropdown end className='z-20'>
				<button className='btn btn-circle btn-ghost active:bg-base-300'>
					<IconDotsVertical
						size={22}
						className='mx-auto my-auto'
					></IconDotsVertical>
				</button>
				<Dropdown.Menu className='mx-auto w-52 gap-1 rounded-2xl bg-base-200 text-base-content'>
					<Dropdown.Item
						onClick={() => {
							setShowWizard(true);
						}}
					>
						<IconPlus></IconPlus>
						<label className='cursor-pointer'>New Project</label>
					</Dropdown.Item>

					<Dropdown.Item onClick={() => handleShare()}>
						<IconShare></IconShare>
						<label className='cursor-pointer'>Share</label>
					</Dropdown.Item>

					{!Capacitor.isNativePlatform() && (
						<Dropdown.Item onClick={() => handleDownload()}>
							<IconDownload></IconDownload>
							<label className='cursor-pointer'>Download</label>
						</Dropdown.Item>
					)}

					{Capacitor.isNativePlatform() && (
						<Dropdown.Item onClick={() => handleSaveToGallery()}>
							<IconPhoto></IconPhoto>
							<label className='cursor-pointer'>Save To Gallery</label>
						</Dropdown.Item>
					)}

					<Dropdown.Item onClick={() => setShowAbout(true)}>
						<IconInfoCircle></IconInfoCircle>
						<label className='cursor-pointer'>About</label>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			{showAbout && (
				<Suspense>
					<AboutModal
						onClose={() => setShowAbout(false)}
						open={showAbout}
					></AboutModal>
				</Suspense>
			)}
			{showWizard && (
				<Suspense>
					<Portal>
						<ProjectWizard
							onClose={() => setShowWizard(false)}
							open={showWizard}
						></ProjectWizard>
					</Portal>
				</Suspense>
			)}
			{loading && (
				<Modal className='w-fit' open={loading}>
					<Modal.Body>
						<div className='mx-auto flex'>
							<span className='loading loading-spinner loading-lg mx-auto my-auto text-center' />
						</div>
					</Modal.Body>
				</Modal>
			)}
		</>
	);
};

export default HomeButton;
