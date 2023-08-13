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

export const DonationsModal: React.FC<Props> = ({ open, onClose }) => {
	return (
		<Modal.Legacy
			open={open}
			onClickBackdrop={() => {
				onClose && onClose();
			}}
			className='overflow-hidden bg-base-300'
		>
			<Modal.Header className='hidden font-bold dark:text-white'>
				<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
					Karbonized
				</p>
			</Modal.Header>

			<Modal.Body className='flex select-none flex-col'>
				<p className='mx-auto dark:text-gray-300'>
					Support the Project. Make a Donation 😃
				</p>

				{/* Donations*/}
				<div className='m-2 mx-auto flex flex-auto flex-row flex-wrap gap-2  p-2'>
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
							<p className='poppins-font-family my-auto font-bold hover:cursor-pointer'>
								BTC
							</p>
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
							<p className='poppins-font-family my-auto font-bold hover:cursor-pointer'>
								DOGE
							</p>
						</div>
					</div>

					<a
						href='https://qvapay.com/payme/yoannisgnw'
						className='flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-gradient-to-br from-blue-300 to-blue-400 p-3 text-white hover:bg-gradient-to-bl  '
					>
						<div className='mx-auto my-auto flex flex-row'>
							<img
								className='mx-auto my-auto h-5 text-yellow-700'
								src={qvapay}
							></img>
							<p className='poppins-font-family my-auto font-bold hover:cursor-pointer'>
								QVAPAY
							</p>
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
		</Modal.Legacy>
	);
};

export default DonationsModal;
