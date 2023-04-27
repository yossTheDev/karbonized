import { IconBrandTwitter, IconLetterT } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Button, Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import karbonized from '../../assets/karbonized.svg';
import './TweetBlock.css';

export const TweetBlock: React.FC = () => {
	/* Component States */
	const [url, setUrl] = useState(
		'https://twitter.com/karbonized_app/status/1651550611140116480?s=20'
	);
	/**https://twitter.com/karbonized_app/status/1651550611140116480?s=20 */

	const [tweetText, setTweetText] = useState(
		'Make Awesome Images of your screenshots or your code with Karbonized. \n Made by @yossthedev'
	);
	const [tweetUser, setUser] = useState('Karbonized');
	const [tweetUserName, setUserName] = useState('@karbonized_app');
	const [tweetUserImage, setUserImage] = useState(karbonized);
	const [tweetImageUrl, setImageUrl] = useState<any>(karbonized);

	const getTweetData = async () => {
		// const tweetData = await getTweet('1629193609080709122');

		const r = await (
			await fetch(
				'https://react-tweet.vercel.app/api/tweet/' +
					url.split('/status/')[1].replace('?s=20', '')
			)
		).json();

		setUser(r.data.user.name);
		setUserImage(r.data.user.profile_image_url_https);
		setTweetText(r.data.text);
		setUserName('@' + r.data.user.screen_name);

		//console.log(r.data.photos[0].url.replace('https://', ''));

		//console.log(r);
		//console.log(r.data.photos);
		if (r.data.photos.length > 0) {
			const i = r.data.photos[0].url;
			//const ro = await (await fetch(r.data.photos[0].url)).body;
			setImageUrl(i);
		}
	};

	return (
		<>
			<ControlTemplate
				borderEditable={false}
				defaultHeight='200px'
				defaultWidth='500px'
				minHeight={'200px'}
				minWidth={'500px'}
				maxWidth={'2000px'}
				maxHeight={'2000px'}
				menu={
					<>
						<CustomCollapse
							isOpen
							menu={
								<div className='m-2 flex flex-row gap-2'>
									<IconLetterT></IconLetterT>
									<p className='my-auto'>Text</p>
								</div>
							}
						>
							<div className='flex flex-auto flex-row text-xs'>
								<p className='my-auto'>Tweet URL</p>

								<Input
									className='ml-2 flex flex-auto'
									onChange={(ev) => setUrl(ev.target.value)}
									value={url}
								></Input>
							</div>

							<Button onClick={() => getTweetData()}>Update</Button>
						</CustomCollapse>
					</>
				}
			>
				<div className='flex h-full w-full flex-auto flex-col overflow-hidden rounded-lg bg-white p-5 text-gray-800 shadow'>
					<div className='mb-4 flex w-full'>
						<div className='h-12 w-12 overflow-hidden rounded-full'>
							<img src={tweetUserImage} alt=''></img>
						</div>
						<div className='flex-grow pl-3'>
							<h6 className='text-md font-bold'>{tweetUser}</h6>
							<p className='text-xs text-gray-600'>{tweetUserName}</p>
						</div>
						<div className='w-12 text-right'>
							<IconBrandTwitter className='fill-blue-400 text-3xl text-blue-400'></IconBrandTwitter>
						</div>
					</div>
					<div className='mb-4 w-full'>
						<p className='text-sm'>{tweetText}</p>
					</div>
					{tweetImageUrl != '' && (
						<img className='flex h-72 rounded-2xl' src={tweetImageUrl}></img>
					)}

					<div className='hidden w-full'>
						<p className='text-right text-xs text-gray-500'>Oct 15th 8:33pm</p>
					</div>
				</div>
			</ControlTemplate>
		</>
	);
};

export default TweetBlock;
