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
import karbonized from '../../assets/karbonized.svg';
import qvapay from '../../assets/qvapay.svg';
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
			className='overflow-hidden border border-neutral bg-base-200/95 backdrop-blur-2xl'
		>
			<Modal.Header className='hidden font-bold dark:text-white'>
				<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
					Karbonized
				</p>
			</Modal.Header>

			<Modal.Body className='flex select-none flex-col'>
				<div className='mx-auto rounded-2xl bg-base-200/70 p-4 shadow-xl'>
					<img
						className='mx-auto my-auto h-28 rounded-full'
						src={karbonized}
					></img>
				</div>

				<label className='mt-3 text-center text-2xl font-bold dark:text-white'>
					Karbonized
				</label>
				<p className='mx-auto w-64 justify-center text-center text-gray-500'>
					Image Editing Made Easy
				</p>

				<label className='mb-4 text-center text-xs text-gray-500'>
					Made by @yossthedev
				</label>

				<div className='mx-auto w-fit select-none rounded-full bg-base-200/70 px-4 py-2 text-gray-500'>
					<label>v1.4.3</label>
				</div>

				{/* Social Networks */}
				<div className='m-2 mx-auto mt-4 flex w-fit flex-auto flex-row flex-wrap gap-2  p-2 dark:text-white'>
					<a
						href='https://twitter.com/yossthedev'
						target={'_blank'}
						className='to flex flex-auto cursor-pointer select-none flex-row  gap-1 rounded-3xl bg-base-200/70 p-3 px-4 shadow hover:bg-neutral  '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<IconBrandTwitter></IconBrandTwitter>
						</div>
					</a>

					<a
						href='https://t.me/yossthedev'
						target={'_blank'}
						className='to flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-base-200/70 p-3 px-4 shadow hover:bg-neutral'
					>
						<div className='mx-auto my-auto flex flex-row'>
							<IconBrandTelegram></IconBrandTelegram>
						</div>
					</a>

					<a
						href='https://github.com/yossthedev'
						target={'_blank'}
						className='flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-base-200/70 p-3 px-4 shadow  hover:bg-neutral '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<IconBrandGithub></IconBrandGithub>
						</div>
					</a>
				</div>

				<p className='m-2 hidden text-center text-gray-500'>
					Or make a donation
				</p>

				{/* Donations*/}
				<div className='m-2 mx-auto mt-4 hidden w-fit flex-auto flex-row flex-wrap gap-2  p-2'>
					<div
						className='to flex w-24 flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 text-white hover:bg-gradient-to-bl  '
						onClick={async () => {
							//await Toast.show({ text: 'Copied!' });
							await Clipboard.write({
								string: 'bc1qwr6wltxvpvuqhx94lqjrdr090747yz9rw5mpec',
							});

							alert('copied!');
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

							alert('copied!');
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

			<Modal.Actions className='hidden'>
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
