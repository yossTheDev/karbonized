import { IconMenu2 } from '@tabler/icons-react';
import React from 'react';
import { Navbar } from 'react-daisyui';

const HomeButton = React.lazy(() => import('./SettingsButton'));

export const NavBarMobile: React.FC = () => {
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
				<label className='dark:text-gray-300'>K A R B O N I Z E D</label>
			</Navbar.Center>

			<Navbar.End>
				<HomeButton></HomeButton>
			</Navbar.End>
		</Navbar>
	);
};
