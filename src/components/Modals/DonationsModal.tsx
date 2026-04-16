import { Clipboard } from '@capacitor/clipboard';
import { Bitcoin, DollarSign, ExternalLink } from 'lucide-react';
import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import karbonized from '../../assets/karbonized.svg';
import qvapay from '../../assets/qvapay.svg';

interface Props {
	open: boolean;
	onClose?: () => void;
}

export const DonationsModal: React.FC<Props> = ({ open, onClose }) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Donations</DialogTitle>
					<DialogDescription>
						Support the development of Karbonized by making a donation
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col items-center gap-4'>
					{/* Donations */}
					<div className='flex flex-wrap justify-center gap-2'>
						<Button
							variant='default'
							className='bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white'
							onClick={async () => {
								await Clipboard.write({
									string: 'bc1qwr6wltxvpvuqhx94lqjrdr090747yz9rw5mpec',
								});
								alert('copied!');
							}}
						>
							<Bitcoin size={20} className='mr-2' />
							BTC
						</Button>

						<Button
							variant='default'
							className='bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white'
							onClick={async () => {
								await Clipboard.write({
									string: 'DFUAWcJLiqYKmZydxFsowdsEZio5ue9JYC',
								});
								alert('copied!');
							}}
						>
							<DollarSign size={20} className='mr-2' />
							DOGE
						</Button>

						<Button
							variant='default'
							className='bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white'
							asChild
						>
							<a
								href='https://qvapay.com/payme/yoannisgnw'
								target='_blank'
								rel='noreferrer'
							>
								<img
									className='mr-2 h-5'
									src={qvapay}
									alt='QVAPAY'
								/>
								QVAPAY
							</a>
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DonationsModal;
