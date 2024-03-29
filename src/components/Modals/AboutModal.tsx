import {
	IconBrandGithub,
	IconBrandTelegram,
	IconBrandTwitter,
} from '@tabler/icons-react';
import React, { Ref } from 'react';
import { Button, Modal } from 'react-daisyui';
import karbonized from '../../assets/logo.svg';
interface Props {
	open: boolean;
	onClose?: Function;
	ref?: Ref<HTMLDialogElement>;
}

export const AboutModal: React.FC<Props> = ({ open, onClose, ref }) => {
	return (
		<Modal.Legacy
			open
			onClickBackdrop={() => {
				onClose && onClose();
			}}
			className='overflow-hidden'
		>
			<Modal.Header className='hidden font-bold dark:text-white'>
				<p className='poppins-font-family text-center text-2xl md:text-left md:text-xl'>
					Karbonized
				</p>
			</Modal.Header>

			<Modal.Body className='flex select-none flex-col'>
				<div className='mx-auto rounded-2xl bg-base-200 p-4 shadow-xl dark:bg-base-300/70'>
					<img
						className='mx-auto my-auto h-28 rounded-full'
						src={karbonized}
					></img>
				</div>

				<label className='mt-4 text-center text-2xl font-bold dark:text-white'>
					Karbonized
				</label>
				<p className='mx-auto mb-2 w-64 justify-center text-center text-sm text-base-content/70'>
					Image Generator for Code Snippets & Mockups
				</p>

				<span className='mb-4 text-center text-xs text-base-content'>
					Made by{' '}
					<a
						target='_blank'
						className='link'
						href='https://twitter.com/yossthedev'
					>
						@yossthedev
					</a>
				</span>

				<div className='mx-auto w-fit select-none rounded-full bg-base-300/70 px-4 py-2 text-base-content'>
					<label>v1.12.0</label>
				</div>

				{/* Social Networks */}
				<div className='m-2 mx-auto mt-4 flex w-fit flex-auto flex-row flex-wrap gap-2  p-2 dark:text-white'>
					<a
						target='_blank'
						href='https://twitter.com/karbonized_app'
						className=' btn btn-circle'
					>
						<div className='pointer-events-none mx-auto my-auto flex flex-row'>
							<IconBrandTwitter></IconBrandTwitter>
						</div>
					</a>

					<a
						target='_blank'
						href='https://t.me/karbonized'
						className=' btn btn-circle'
					>
						<div className='pointer-events-none mx-auto my-auto flex flex-row'>
							<IconBrandTelegram></IconBrandTelegram>
						</div>
					</a>

					<a
						target='_blank'
						href='https://github.com/yossthedev/karbonized'
						className=' btn btn-circle'
					>
						<div className='pointer-events-none mx-auto my-auto flex flex-row'>
							<IconBrandGithub></IconBrandGithub>
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

export default AboutModal;
