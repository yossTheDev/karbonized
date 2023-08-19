import { IconBell, IconLink } from '@tabler/icons-react';
import React from 'react';

import mock from '../../../news/news.json';
import { IconInfoCircle } from '@tabler/icons-react';
import { isElectron } from '../../utils/isElectron';

export const NewsPanel: React.FC = () => {
	return (
		<div className='flex h-full w-[30rem] flex-col p-2'>
			<div className='mb-2 ml-2 flex w-fit gap-1 rounded-3xl bg-base-200 px-3 py-0.5 shadow'>
				<IconBell className='my-auto'></IconBell>
				<p className='borel-font mt-3 text-lg'>News</p>
			</div>

			<div className='flex h-full w-full flex-auto flex-col overflow-auto'>
				{mock.map((item, index) => (
					<div key={item.title} className='gap-2 bg-base-300 p-2'>
						<img className='flex rounded-2xl' src={'news/' + item.img}></img>
						<h2 className='poppins-font-family mt-2 text-lg'>{item.title}</h2>
						<p className='mt-1 text-xs text-base-content/70'>
							{item.description}
						</p>

						{item.link && (
							<a
								href={item.link}
								className='btn mt-3 flex h-10 gap-3 overflow-hidden rounded-2xl bg-base-200 p-0 '
							>
								<div className='mx-auto my-auto flex gap-2'>
									<IconLink className=''></IconLink>

									<p className='my-auto flex w-40 cursor-pointer overflow-clip'>
										{item.link.length > 21
											? item.link.slice(0, 18) + '...'
											: item.link}
									</p>
								</div>
							</a>
						)}

						{index != mock.length - 1 && (
							<div className='mx-auto my-4 h-1 w-5/6 rounded-full bg-base-100 p-0.5 dark:bg-base-200/70'></div>
						)}
					</div>
				))}
			</div>

			{isElectron() && (
				<div className='flex gap-2 p-1 text-base-content/70'>
					<IconInfoCircle></IconInfoCircle>
					<p className='text-xs'>
						Some of this information may refer to new version of the app.
						Download the updates{' '}
						<a href='https://github.com/karbonized/releases/' className='link'>
							from here
						</a>
					</p>
				</div>
			)}
		</div>
	);
};

export default NewsPanel;
