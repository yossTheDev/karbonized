import {
	IconHome,
	IconCopy,
	IconClipboard,
	IconShare,
	IconQrcode,
	IconInfoCircle,
	IconPlus,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { Button, Dropdown } from 'react-daisyui';
import { useStoreActions } from '../../stores/Hooks';
import { AboutModal } from '../Modals/AboutModal';

interface Props {
	size?: number;
	className?: string;
}

export const HomeButton: React.FC<Props> = ({ size = 22, className }) => {
	const [showAbout, setShowAbout] = useState(false);
	const cleanWorkspace = useStoreActions((state) => state.cleanWorkspace);

	return (
		<>
			<Dropdown vertical='middle' horizontal='center' className='my-auto'>
				<button
					className={`my-auto mr-2 w-12 rounded-2xl bg-base-200 p-0.5 text-black transition-all active:scale-90 dark:text-white md:flex ${className}`}
					color='ghost'
				>
					<IconHome size={size} className='mx-auto my-auto'></IconHome>
				</button>
				<Dropdown.Menu className='mt-2 w-52 rounded-2xl bg-base-200 dark:text-white'>
					<Dropdown.Item
						onClick={() => {
							cleanWorkspace();
						}}
					>
						<IconPlus></IconPlus>
						<p>New</p>
					</Dropdown.Item>

					<Dropdown.Item onClick={async () => setShowAbout(true)}>
						<IconInfoCircle></IconInfoCircle>
						<p>About</p>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			{showAbout && (
				<AboutModal
					onClose={() => setShowAbout(false)}
					open={showAbout}
				></AboutModal>
			)}
		</>
	);
};
