import React, { useState } from 'react';
import { Modal } from 'react-daisyui';
import { useStoreState } from '../stores/Hooks';
import yoss from '../assets/yoss.png';
import {
	IconBrandGithub,
	IconBrandTelegram,
	IconBrandTwitter,
	IconCoinBitcoin,
	IconCreditCard,
	IconCurrencyDogecoin,
	IconHeart,
	IconHierarchy,
	IconPhone,
} from '@tabler/icons';
import { Clipboard } from '@capacitor/clipboard';
import qvapay from '../assets/qvapay.svg';

export const StatusBar: React.FC = () => {
	//Component Store
	const [showAbout, setShowAbout] = useState(false);
	// App Store
	const workspaceName = useStoreState((state) => state.workspaceName);
	const workspaceWidth = useStoreState((state) => state.workspaceWidth);
	const workspaceHeight = useStoreState((state) => state.workspaceHeight);

	return (
		<>
			<div className='flex flex-row p-1 text-gray-500 select-none'>
				<div className='flex flex-row flex-auto my-auto'>
					<IconHierarchy className='my-auto' size={18}></IconHierarchy>
					<p className='ml-2 text-xs my-auto'>
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
							<p className='text-xs my-auto ml-1'>Open Source</p>
						</a>
					</div>
				</div>
			</div>

			{showAbout && (
				<Modal
					className='bg-base-200'
					open={showAbout}
					onClickBackdrop={() => setShowAbout(false)}
				>
					<Modal.Header className='font-bold dark:text-white'>
						Karbonized
					</Modal.Header>

					<Modal.Body className='select-none'>
						<img className='h-36 rounded-full mx-auto' src={yoss}></img>
						<p className='text-white font-bold text-2xl m-2 text-center'>
							Hi I am Yoannis Sánchez Soto
						</p>
						<p className='text-gray-500 m-2 text-center'>
							Thank`s for use Karbonized. You can support my work following me
							on my social networks
						</p>

						{/* Social Networks */}
						<div className='m-2 mt-4 p-2 flex flex-auto flex-row flex-wrap gap-2 mx-auto  w-fit'>
							<a
								href='https://twitter.com/yossthedev'
								target={'_blank'}
								className='flex flex-row gap-1 p-2 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-blue-400 to to-blue-500  '
							>
								<IconBrandTwitter></IconBrandTwitter>
								<p className='my-auto font-bold'>Twitter</p>
							</a>

							<a
								href='https://t.me/yossthedev'
								target={'_blank'}
								className='flex flex-row gap-1 p-2 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-blue-500 to to-blue-600 '
							>
								<IconBrandTelegram></IconBrandTelegram>
								<p className='my-auto font-bold'>Telegram</p>
							</a>

							<a
								href='https://github.com/yossthedev'
								target={'_blank'}
								className='flex flex-row gap-1 p-2 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br  from-base-100 to bg-gray-900'
							>
								<IconBrandGithub></IconBrandGithub>
								<p className='my-auto font-bold'>GitHub</p>
							</a>
						</div>

						<p className='text-gray-500 text-center m-2'>Or make a donation</p>

						{/* Donations*/}
						<div className='m-2 mt-4 p-2 flex flex-auto flex-row flex-wrap gap-2 mx-auto  w-fit'>
							<div
								className='flex flex-row gap-1 p-2 w-24 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-yellow-400 to to-yellow-500  '
								onClick={async () => {
									//await Toast.show({ text: 'Copied!' });
									await Clipboard.write({
										string: 'bc1qwr6wltxvpvuqhx94lqjrdr090747yz9rw5mpec',
									});
								}}
							>
								<div className='mx-auto flex flex-row gap-2'>
									<IconCoinBitcoin className='my-auto'></IconCoinBitcoin>
									<p className='my-auto font-bold'>BTC</p>
								</div>
							</div>

							<div
								onClick={async () => {
									//await Toast.show({ text: 'Copied!' });
									await Clipboard.write({
										string: 'DFUAWcJLiqYKmZydxFsowdsEZio5ue9JYC',
									});
								}}
								className='flex flex-row gap-1 p-2 w-24 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-yellow-500 to to-yellow-600  '
							>
								<IconCurrencyDogecoin className='my-auto'></IconCurrencyDogecoin>
								<p className='my-auto font-bold'>DOGE</p>
							</div>

							<a
								href='https://qvapay.com/payme/yoannisgnw'
								target={'_blank'}
								className='flex flex-row gap-1 p-2 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-blue-300 to-blue-400  '
							>
								<img
									className='text-yellow-700 mx-auto h-5 my-auto'
									src={qvapay}
								></img>
								<p className='my-auto font-bold'>QVAPAY</p>
							</a>
						</div>
					</Modal.Body>

					<Modal.Actions>
						<button
							className='dark:text-white'
							onClick={() => setShowAbout(false)}
						>
							OK
						</button>
					</Modal.Actions>
				</Modal>
			)}
		</>
	);
};
