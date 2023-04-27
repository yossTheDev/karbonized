import { Clipboard } from '@capacitor/clipboard';
import {
	IconBrandGithub,
	IconBrandTelegram,
	IconBrandTwitter,
	IconCoinBitcoin,
	IconCurrencyDogecoin,
} from '@tabler/icons-react';
import React from 'react';
import { Button, Modal } from 'react-daisyui';
import qvapay from '../../assets/qvapay.svg';
import yoss from '../../assets/yoss.png';

interface Props {
	open: boolean;
	onClose?: Function;
}

export const AboutModal: React.FC<Props> = ({ open, onClose }) => {
	return (
		<Modal
			open={open}
			onClickBackdrop={() => {
				onClose && onClose();
			}}
			className='bg-base-100'
		>
			<Modal.Header className='font-bold dark:text-white'>
				<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
					Karbonized
				</p>
			</Modal.Header>

			<Modal.Body className='flex flex-auto select-none flex-col overflow-y-scroll '>
				<img className='mx-auto h-36 rounded-full' src={yoss}></img>
				<p className='m-2 text-center text-2xl font-bold dark:text-white'>
					Hi I am Yoannis Sánchez Soto
				</p>
				<p className='m-2 text-center text-gray-500'>
					Thank`s for use Karbonized. You can support my work following me on my
					social networks
				</p>

				{/* Social Networks */}
				<div className='m-2 mx-auto mt-4 flex w-fit flex-auto flex-row flex-wrap gap-2  p-2'>
					<a
						href='https://twitter.com/yossthedev'
						target={'_blank'}
						className='to flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-gradient-to-br from-blue-400 to-blue-500 p-3 text-white hover:bg-gradient-to-bl  '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<IconBrandTwitter></IconBrandTwitter>
							<p className='my-auto ml-1 font-bold'>Twitter</p>
						</div>
					</a>

					<a
						href='https://t.me/yossthedev'
						target={'_blank'}
						className='to flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white hover:bg-gradient-to-bl '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<IconBrandTelegram></IconBrandTelegram>
							<p className='my-auto ml-1 font-bold'>Telegram</p>
						</div>
					</a>

					<a
						href='https://github.com/yossthedev'
						target={'_blank'}
						className='flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-3  text-white hover:bg-gradient-to-bl '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<IconBrandGithub></IconBrandGithub>
							<p className='my-auto ml-1 font-bold'>GitHub</p>
						</div>
					</a>
				</div>

				<p className='m-2 text-center text-gray-500'>Or make a donation</p>

				{/* Donations*/}
				<div className='m-2 mx-auto mt-4 flex w-fit flex-auto flex-row flex-wrap gap-2  p-2'>
					<div
						className='to flex w-24 flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 text-white hover:bg-gradient-to-bl  '
						onClick={async () => {
							//await Toast.show({ text: 'Copied!' });
							await Clipboard.write({
								string: 'bc1qwr6wltxvpvuqhx94lqjrdr090747yz9rw5mpec',
							});
						}}
					>
						<div className='mx-auto my-auto flex flex-row gap-2'>
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
						className='to flex w-24 flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 text-white hover:bg-gradient-to-bl  '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<IconCurrencyDogecoin className='my-auto'></IconCurrencyDogecoin>
							<p className='my-auto font-bold'>DOGE</p>
						</div>
					</div>

					<a
						href='https://qvapay.com/payme/yoannisgnw'
						target={'_blank'}
						className='flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-gradient-to-br from-blue-300 to-blue-400 p-3 text-white hover:bg-gradient-to-bl  '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<img
								className='mx-auto my-auto h-5 text-yellow-700'
								src={qvapay}
							></img>
							<p className='my-auto font-bold'>QVAPAY</p>
						</div>
					</a>
				</div>
			</Modal.Body>

			<Modal.Actions>
				<Button
					className='dark:text-white'
					onClick={() => onClose && onClose()}
				>
					OK
				</Button>
			</Modal.Actions>
		</Modal>
	);
};
