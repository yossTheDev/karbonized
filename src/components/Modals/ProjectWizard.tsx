import React from 'react';
import { Button, Modal } from 'react-daisyui';
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
			className='overflow-hidden bg-base-100'
		>
			<Modal.Header className='hidden font-bold dark:text-white'>
				<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
					Karbonized
				</p>
			</Modal.Header>

			<Modal.Body className='flex select-none flex-col'></Modal.Body>

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
