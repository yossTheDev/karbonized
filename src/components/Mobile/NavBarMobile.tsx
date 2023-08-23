import { IconBell, IconInfoCircle, IconMenu2 } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Modal, Navbar } from 'react-daisyui';
import { Portal } from 'react-portal';
import NewsPanel from '../Panels/NewsPanel';
import AboutModal from '../Modals/AboutModal';

export const NavBarMobile: React.FC = () => {
	const [showNews, setShowNews] = useState(false);
	const [showAbout, setShowAbout] = useState(false);

	return (
		<>
			<Navbar className='bg-base-100'>
				<Navbar.Start className='z-20'>
					<button className='btn btn-circle btn-ghost drawer-button active:bg-base-300 lg:hidden'>
						<IconBell
							onClick={() => setShowNews(true)}
							className='mx-auto dark:text-gray-300'
							size={24}
						></IconBell>
					</button>
				</Navbar.Start>

				<Navbar.Center>
					<label className='text-base-content'>K A R B O N I Z E D</label>
				</Navbar.Center>

				<Navbar.End>
					<button
						onClick={() => setShowAbout(true)}
						className='btn btn-circle btn-ghost drawer-button active:bg-base-300 lg:hidden'
					>
						<IconInfoCircle
							className='mx-auto dark:text-gray-300'
							size={24}
						></IconInfoCircle>
					</button>
				</Navbar.End>
			</Navbar>

			{showNews && (
				<Portal>
					<Modal.Legacy
						className='h-96 overflow-hidden p-1'
						open
						onClickBackdrop={() => setShowNews(false)}
					>
						<NewsPanel></NewsPanel>
					</Modal.Legacy>
				</Portal>
			)}

			{showAbout && (
				<AboutModal
					onClose={() => setShowAbout(false)}
					open={showAbout}
				></AboutModal>
			)}
		</>
	);
};

export default NavBarMobile;
