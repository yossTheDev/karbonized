import { IconBell, IconMenu2 } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Modal, Navbar } from 'react-daisyui';
import { Portal } from 'react-portal';
import NewsPanel from '../Panels/NewsPanel';

const HomeButton = React.lazy(() => import('./SettingsButton'));

export const NavBarMobile: React.FC = () => {
	const [showNews, setShowNews] = useState(false);

	return (
		<Navbar className='bg-base-100'>
			<Navbar.Start className='z-20'>
				<label
					htmlFor='my-drawer-2'
					className='btn btn-circle btn-ghost drawer-button active:bg-base-300 lg:hidden'
				>
					<IconMenu2
						className='mx-auto dark:text-gray-300'
						size={24}
					></IconMenu2>
				</label>
			</Navbar.Start>

			<Navbar.Center>
				<label className='text-base-content'>K A R B O N I Z E D</label>
			</Navbar.Center>

			<Navbar.End>
				<button
					onClick={() => setShowNews(true)}
					className='btn btn-circle btn-ghost drawer-button active:bg-base-300 lg:hidden'
				>
					<IconBell className='mx-auto dark:text-gray-300' size={24}></IconBell>
				</button>
				<HomeButton></HomeButton>
			</Navbar.End>

			{showNews && (
				<Portal>
					<Modal.Legacy
						className='h-96 overflow-hidden'
						open
						onClickBackdrop={() => setShowNews(false)}
					>
						<NewsPanel></NewsPanel>
					</Modal.Legacy>
				</Portal>
			)}
		</Navbar>
	);
};
