import { IconBell, IconLink } from '@tabler/icons-react';
import React from 'react';

import mock from '../../../news/news.json';

export const NewsPanel: React.FC = () => {
	return (
		<div className='flex h-full w-[30rem] flex-col p-2'>
			<div className='mb-2 flex w-fit gap-1 rounded-2xl bg-base-200 p-2 shadow'>
				<IconBell></IconBell>
				<p className='poppins-font-family'>News</p>
			</div>

			<div className='flex h-full w-full flex-auto flex-col overflow-auto'>
				{mock.map((item) => (
					<div className='gap-2 bg-base-300 p-2'>
						<img className='flex rounded-2xl' src={'news/' + item.img}></img>
						<h2 className='poppins-font-family mt-2 text-xl'>{item.title}</h2>
						<p>{item.description}</p>

						<a
							href={item.link}
							className='btn mt-2 flex gap-3 rounded-2xl bg-base-200 p-2'
						>
							<IconLink></IconLink>
							{item.link}
						</a>

						<div className='mx-auto my-4 h-2 w-5/6 rounded-full bg-base-200/70 p-1'></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NewsPanel;
