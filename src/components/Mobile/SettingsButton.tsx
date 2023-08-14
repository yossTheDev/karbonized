import {
	IconDotsVertical,
	IconInfoCircle,
	IconPlus,
	IconShare,
} from '@tabler/icons-react';
import { toBlob, toPng } from 'html-to-image';
import React, { Suspense, useState } from 'react';
import { Dropdown } from 'react-daisyui';
import { Portal } from 'react-portal';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { getRandomNumber } from '../../utils/getRandom';

const AboutModal = React.lazy(() => import('../Modals/AboutModal'));
const ProjectWizard = React.lazy(() => import('../Modals/ProjectWizard'));

export const HomeButton: React.FC = () => {
	const [showAbout, setShowAbout] = useState(false);
	const [showWizard, setShowWizard] = useState(true);

	// Share Image
	const handleShare = async () => {
		const element = document.getElementById('workspace');
		if (element) {
			if (Capacitor.isNativePlatform()) {
				const data = await toPng(element);

				const file = await Filesystem.writeFile({
					data: data,
					directory: Directory.Data,
					path: 'karbonized-image-' + getRandomNumber(),
				});

				Share.share({ title: 'Share', files: [file.uri] });
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

					<Dropdown.Item onClick={() => handleShare}>
						<IconShare></IconShare>
						<label className='cursor-pointer'>Share</label>
					</Dropdown.Item>

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
		</>
	);
};

export default HomeButton;
