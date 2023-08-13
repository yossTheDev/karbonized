import {
	IconDotsVertical,
	IconHome,
	IconInfoCircle,
	IconPlus,
	IconSettings,
	IconShare,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-daisyui';
import { AboutModal } from '../Modals/AboutModal';
import { ProjectWizard } from '../Modals/ProjectWizard';
import { Portal } from 'react-portal';
import { toBlob } from 'html-to-image';
import { IconSettings2 } from '@tabler/icons-react';

interface Props {
	size?: number;
	className?: string;
}

export const HomeButton: React.FC<Props> = ({ size = 22, className }) => {
	const [showAbout, setShowAbout] = useState(false);
	const [showWizard, setShowWizard] = useState(true);

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'n') {
			event.preventDefault();

			setShowWizard(true);
		} else if (event.key === 'Escape') {
			event.preventDefault();
			setShowWizard(false);
			setShowAbout(false);
		}
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

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	});

	return (
		<>
			<Dropdown end className='z-20'>
				<button className='btn btn-ghost'>
					<IconDotsVertical
						size={size}
						className='mx-auto my-auto'
					></IconDotsVertical>
				</button>
				<Dropdown.Menu className='mx-auto w-52 gap-1 rounded-2xl bg-base-200 dark:text-white'>
					<Dropdown.Item
						onClick={() => {
							setShowWizard(true);
						}}
					>
						<IconPlus></IconPlus>
						<label className='cursor-pointer'>New Project</label>
					</Dropdown.Item>

					<Dropdown.Item onClick={handleShare}>
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
				<AboutModal
					onClose={() => setShowAbout(false)}
					open={showAbout}
				></AboutModal>
			)}
			{showWizard && (
				<Portal>
					<ProjectWizard
						onClose={() => setShowWizard(false)}
						open={showWizard}
					></ProjectWizard>
				</Portal>
			)}
		</>
	);
};
