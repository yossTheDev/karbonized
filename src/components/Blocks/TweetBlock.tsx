import { IconBrandTwitter } from '@tabler/icons-react';
import React, { useId, useState } from 'react';
import karbonized from '../../assets/karbonized.svg';
import { CustomCollapse } from '../CustomControls/CustomCollapse';
import { ControlTemplate } from './ControlTemplate';
import './TweetBlock.css';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
interface Props {
	id: string;
}

export const TweetBlock: React.FC<Props> = ({ id }) => {
	/* Component States */
	const [url, setUrl] = useState(
		'https://twitter.com/karbonized_app/status/1651550611140116480?s=20',
	);
	/** https://twitter.com/karbonized_app/status/1651550611140116480?s=20 */

	const [tweetText, setTweetText] = useState(
		'Make Awesome Images of your screenshots or your code with Karbonized. \n Made by @yossthedev',
	);
	const [tweetUser, setUser] = useState('Karbonized');
	const [tweetUserName, setUserName] = useState('@karbonized_app');
	const [tweetUserImage, setUserImage] = useState(karbonized);
	const [tweetImageUrl, setImageUrl] = useState<any>('');

	/* useEffect(() => {
		getTweetData();
	}); */

	async function getImageDataUrl(url: RequestInfo | URL) {
		return await fetch(url)
			.then(async (response) => await response.blob())
			.then(async (blob) => {
				return await new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => {
						resolve(reader.result);
					};
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				});
			});
	}

	const getTweetData = async () => {
		const r = await (
			await fetch(
				'https://react-tweet.vercel.app/api/tweet/' +
					url.split('/status/')[1].replace('?s=20', ''),
			)
		).json();

		setUser(r.data.user.name);

		/* Set User image */
		getImageDataUrl(r.data.user.profile_image_url_https)
			.then((dataUrl) => {
				setUserImage(dataUrl as string);
			})
			.catch((error) => {
				console.error(error);
			});

		setTweetText(r.data.text);
		setUserName('@' + r.data.user.screen_name);

		console.log(r);
		if (r.data.photos.length > 0) {
			/* Set The First Image */
			getImageDataUrl(r.data.photos[0].url)
				.then((dataUrl) => {
					// Hacer algo con el Data URL de la imagen
					setImageUrl(dataUrl);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<>
			<ControlTemplate
				id={id}
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
								<div className='flex items-center gap-2 text-foreground'>
									<IconBrandTwitter size={18} className='text-muted-foreground' />
									<Label className='text-sm font-semibold'>Tweet</Label>
								</div>
							}
						>
							<div className='flex flex-auto flex-row text-xs'>
								<Label className='my-auto text-xs text-muted-foreground'>Tweet URL</Label>

								<Input
									className='ml-2 h-8 flex w-full flex-auto text-sm'
									onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
										setUrl(ev.target.value);
									}}
									value={url}
								></Input>
							</div>

							<Button
								variant='outline'
								className='w-full transition-all duration-200 hover:scale-105'
								onClick={async () => {
									await getTweetData();
								}}
							>
								Update
							</Button>
						</CustomCollapse>
					</>
				}
			>
				<div className='flex h-full w-full flex-auto flex-col overflow-hidden rounded-lg bg-white p-5 text-neutral-800 shadow'>
					<div className='mb-4 flex w-full'>
						<div className='h-12 w-12 overflow-hidden rounded-full'>
							<img
								crossOrigin='anonymous'
								src={tweetUserImage}
								alt='User Image'
							></img>
						</div>
						<div className='grow pl-3'>
							<h6 className='text-md font-bold'>{tweetUser}</h6>
							<p className='text-xs text-neutral-600'>{tweetUserName}</p>
						</div>
						<div className='w-12 text-right'>
							<IconBrandTwitter className='fill-blue-400 text-3xl text-blue-400'></IconBrandTwitter>
						</div>
					</div>

					<div className='mb-4 w-full'>
						<p className='text-sm'>{tweetText}</p>
					</div>

					{tweetImageUrl != '' && (
						<img
							crossOrigin='anonymous'
							className='flex h-72 rounded-2xl'
							src={tweetImageUrl}
						></img>
					)}

					<div className='hidden w-full'>
						<p className='text-right text-xs text-neutral-500'>
							Oct 15th 8:33pm
						</p>
					</div>
				</div>
			</ControlTemplate>
		</>
	);
};

export default TweetBlock;
