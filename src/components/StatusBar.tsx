import React, { useState } from 'react';
import { Modal } from 'react-daisyui';
import { useStoreState } from '../stores/Hooks';
import yoss from '../assets/yoss.png';
import {
	IconBrandGithub,
	IconBrandTelegram,
	IconBrandTwitter,
	IconCoinBitcoin,
	IconCurrencyDogecoin,
	IconHeart,
	IconSquareRotated,
} from '@tabler/icons';
import { Clipboard } from '@capacitor/clipboard';
import qvapay from '../assets/qvapay.svg';
import { AboutModal } from './Modals/AboutModal';

export const StatusBar: React.FC = () => {
	//Component Store
	const [showAbout, setShowAbout] = useState(false);
	// App Store
	const workspaceName = useStoreState((state) => state.workspaceName);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	return (
		<>
			<div className='hidden md:flex flex-row p-1 text-gray-500 select-none'>
				<div className='flex flex-row flex-auto my-auto '>
					<IconSquareRotated className='my-auto' size={18}></IconSquareRotated>
					<p className='ml-2 text-xs my-auto text-center'>
						Workspace: {workspaceName} Size: {workspaceWidth} X{' '}
						{workspaceHeight}
					</p>

					<div className='flex flex-row my-auto ml-auto'>
						<div
							onMouseDown={() => setShowAbout(true)}
							className='flex flex-row gap-2 hover:bg-base-100 hover:rounded cursor-pointer p-1'
						>
							<p className='text-xs my-auto'>
								Made With
								<span>
									<IconHeart
										size={18}
										className='inline-flex my-auto mx-1'
									></IconHeart>
								</span>
								By @yossthedev
							</p>
						</div>

						<a
							href='https://github.com/yossthedev/karbonized/'
							target={'_blank'}
							className='flex flex-auto flex-row my-auto mx-2 hover:rounded hover:bg-base-100 cursor-pointer p-1'
						>
							<IconBrandGithub className='my-auto' size={18}></IconBrandGithub>
							<p className='text-xs my-auto ml-1'>Source Code</p>
						</a>
					</div>
				</div>
			</div>

			{showAbout && (
				<AboutModal open onClose={() => setShowAbout(false)}></AboutModal>
			)}
		</>
	);
};
