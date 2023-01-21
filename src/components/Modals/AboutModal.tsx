import { Clipboard } from '@capacitor/clipboard';
import {
	IconBrandGithub,
	IconBrandTelegram,
	IconBrandTwitter,
	IconCoinBitcoin,
	IconCurrencyDogecoin,
} from '@tabler/icons';
import React from 'react';
import { Button, Modal } from 'react-daisyui';
import { Portal } from 'react-portal';
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
				<p className='text-center md:text-left md:text-xl text-2xl poppins-font-family'>
					Karbonized
				</p>
			</Modal.Header>

			<Modal.Body className='select-none overflow-y-scroll flex flex-auto flex-col max-h-80'>
				<img className='h-36 rounded-full mx-auto' src={yoss}></img>
				<p className='dark:text-white font-bold text-2xl m-2 text-center'>
					Hi I am Yoannis Sánchez Soto
				</p>
				<p className='text-gray-500 m-2 text-center'>
					Thank`s for use Karbonized. You can support my work following me on my
					social networks
				</p>

				{/* Social Networks */}
				<div className='m-2 mt-4 p-2 flex flex-auto flex-row flex-wrap gap-2 mx-auto  w-fit'>
					<a
						href='https://twitter.com/yossthedev'
						target={'_blank'}
						className='flex flex-row flex-auto gap-1 p-3 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-blue-400 to to-blue-500  '
					>
						<div className='flex flex-row my-auto mx-auto'>
							<IconBrandTwitter></IconBrandTwitter>
							<p className='my-auto font-bold ml-1'>Twitter</p>
						</div>
					</a>

					<a
						href='https://t.me/yossthedev'
						target={'_blank'}
						className='flex flex-auto flex-row gap-1 p-3 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-blue-500 to to-blue-600 '
					>
						<div className='flex flex-row mx-auto my-auto'>
							<IconBrandTelegram></IconBrandTelegram>
							<p className='my-auto font-bold ml-1'>Telegram</p>
						</div>
					</a>

					<a
						href='https://github.com/yossthedev'
						target={'_blank'}
						className='flex flex-auto flex-row gap-1 p-3 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br  from-gray-800 to-gray-900 '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<IconBrandGithub></IconBrandGithub>
							<p className='my-auto font-bold ml-1'>GitHub</p>
						</div>
					</a>
				</div>

				<p className='text-gray-500 text-center m-2'>Or make a donation</p>

				{/* Donations*/}
				<div className='m-2 mt-4 p-2 flex flex-auto flex-row flex-wrap gap-2 mx-auto  w-fit'>
					<div
						className='flex flex-auto flex-row gap-1 p-3 w-24 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-yellow-400 to to-yellow-500  '
						onClick={async () => {
							//await Toast.show({ text: 'Copied!' });
							await Clipboard.write({
								string: 'bc1qwr6wltxvpvuqhx94lqjrdr090747yz9rw5mpec',
							});
						}}
					>
						<div className='mx-auto flex flex-row gap-2 my-auto'>
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
						className='flex flex-auto flex-row gap-1 p-3 w-24 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-yellow-500 to to-yellow-600  '
					>
						<div className='flex flex-row mx-auto my-auto'>
							<IconCurrencyDogecoin className='my-auto'></IconCurrencyDogecoin>
							<p className='my-auto font-bold'>DOGE</p>
						</div>
					</div>

					<a
						href='https://qvapay.com/payme/yoannisgnw'
						target={'_blank'}
						className='flex flex-auto flex-row gap-1 p-3 hover:bg-gradient-to-bl select-none cursor-pointer text-white rounded-3xl bg-gradient-to-br from-blue-300 to-blue-400  '
					>
						<div className='flex flex-row mx-auto my-auto'>
							<img
								className='text-yellow-700 mx-auto h-5 my-auto'
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
