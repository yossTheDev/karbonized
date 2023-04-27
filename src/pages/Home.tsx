import {
	IconArrowRight,
	IconBrandGithub,
	IconBrandTelegram,
	IconBrandTwitter,
	IconInfoCircle,
	IconPlus,
	IconTools,
} from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import karbonized from '../assets/karbonized.svg';
import promotion from '../assets/promotion2.png';

export const Home: React.FC = () => {
	return (
		<div className='flex h-screen w-screen flex-auto flex-col overflow-hidden md:p-4'>
			{/* Nav Bar */}
			<div className='flex flex-row '>
				<div className='md:mt:0 mx-auto my-auto mt-4 flex h-fit w-fit select-none flex-row gap-2 rounded-xl  bg-base-200 p-2 text-black dark:text-white md:mx-0 md:flex'>
					<img className='h-8 w-full' src={karbonized}></img>
					<p className='poppins-font-family my-auto text-xl'>Karbonized</p>
				</div>

				<Link
					to='/editor'
					className='ml-auto hidden h-fit w-fit skew-x-3 cursor-pointer select-none flex-row gap-2 rounded-xl bg-base-200 p-3 text-black transition-all hover:bg-neutral active:scale-90 dark:text-white  md:flex'
				>
					<IconTools className='mx-2 my-auto'></IconTools>

					<p className='poppins-font-family my-auto text-xl'>Editor</p>
					<IconArrowRight className='my-auto'></IconArrowRight>
				</Link>
			</div>

			{/* Content */}
			<div className='flex h-full w-full flex-auto flex-col  md:flex-row'>
				<div className='flex flex-auto select-none flex-col'>
					<div className='mx-auto my-auto flex h-fit w-fit flex-col'>
						<p className='poppins-font-family mx-auto w-64 text-center text-3xl dark:text-white md:w-96 md:text-5xl'>
							Awesome Image Generator for your{' '}
							<span className='text-primary'>Code Snippets</span> and
							<span className='mx-2 skew-x-3 skew-y-3 bg-gradient-to-br from-pink-500 to-primary p-1 text-white'>
								Screenshots
							</span>
						</p>

						{/* Social Networks */}
						<div className='mx-auto mt-2 flex w-fit flex-row flex-wrap gap-2  p-2'>
							<a
								href='https://twitter.com/karbonized_app'
								target={'_blank'}
								className='flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-base-200 p-3 hover:bg-neutral hover:bg-gradient-to-bl dark:text-white  '
							>
								<div className='mx-auto my-auto flex flex-row'>
									<IconBrandTwitter></IconBrandTwitter>
								</div>
							</a>

							<a
								href='https://t.me/yossthedev'
								target={'_blank'}
								className='flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-base-200 p-3 hover:bg-neutral hover:bg-gradient-to-bl dark:text-white '
							>
								<div className='mx-auto my-auto flex flex-row'>
									<IconBrandTelegram></IconBrandTelegram>
								</div>
							</a>

							<a
								href='https://github.com/yossthedev'
								target={'_blank'}
								className='flex flex-auto cursor-pointer select-none flex-row gap-1 rounded-3xl bg-base-200 p-3 hover:bg-neutral  hover:bg-gradient-to-bl dark:text-white '
							>
								<div className='mx-auto my-auto flex flex-row'>
									<IconBrandGithub></IconBrandGithub>
								</div>
							</a>
						</div>

						{/* Try Editor Mobile */}
						<a
							href='/editor'
							className='mx-auto mt-2 flex h-fit w-fit skew-x-3 cursor-pointer select-none flex-row gap-2 rounded-xl bg-base-200 p-4 text-black transition-all hover:bg-neutral active:scale-90 dark:text-white  md:hidden'
						>
							<IconTools className='mx-2 my-auto'></IconTools>
							<p className='poppins-font-family my-auto text-xl'>Try Editor</p>
							<IconArrowRight className='my-auto'></IconArrowRight>
						</a>
					</div>
				</div>

				<div className='flex flex-auto select-none flex-col'>
					<img
						className='mx-auto w-5/6 rounded-xl text-white shadow-2xl shadow-pink-500 md:my-auto md:h-96'
						src={promotion}
					></img>
				</div>
			</div>
		</div>
	);
};
