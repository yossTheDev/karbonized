import { IconLetterT } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Button, Input } from 'react-daisyui';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import { Tweet } from 'react-tweet';
import { getTweet } from 'react-tweet/api';
import './TweetBlock.css';

export const TweetBlock: React.FC = () => {
	/* Component States */
	const [url, setUrl] = useState('1629193609080709122');

	const [tweetText, setTweetText] = useState('hello');
	const [tweetUser, setUser] = useState('Karbonized');
	const [tweetUserImage, setUserImage] = useState('Karbonized');
	const [tweetUsername, setUsername] = useState('Karbonized');
	const [tweetImageUrl, setImageUrl] = useState('');

	const getTweetData = async () => {
		const tweetData = await getTweet('1629193609080709122');

		// setUser(tweetData?.user.name);
		// setTweetText(tweetData?.text);

		console.log(tweetData);
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
				<div className='flex h-full w-full flex-auto flex-col overflow-hidden bg-white'>
					<p>{tweetUser}</p>
					<p>{tweetText}</p>
					<img src={tweetImageUrl}></img>
				</div>
			</ControlTemplate>
		</>
	);
};

export default TweetBlock;
