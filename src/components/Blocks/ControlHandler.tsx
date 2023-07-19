import React, { Suspense } from 'react';
import BadgeBlock from './BadgeBlock';
import { BlockLoader } from './BlockLoader';
import TweetBlock from './TweetBlock';

const CodeControl = React.lazy(() => import('./CodeBlock'));
const FaIconBlock = React.lazy(() => import('./FaIconBlock'));

const TextControl = React.lazy(() => import('./TextBlock'));
const QrControl = React.lazy(() => import('./QrBlock'));
const PhoneBlock = React.lazy(() => import('./PhoneBlock'));
const ImageBlock = React.lazy(() => import('./ImageBlock'));
const AvatarBlock = React.lazy(() => import('./AvatarBlock'));
const ShapeBlock = React.lazy(() => import('./ShapeBlock'));
const WindowBlock = React.lazy(() => import('./WindowBlock'));

interface Props {
	id: string;
	type: string;
}

export const ControlHandler: React.FC<Props> = ({ type, id }) => {
	// Store Actions
	switch (type) {
		case 'code':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<CodeControl id={id}></CodeControl>
				</Suspense>
			);
		case 'text':
			return (
				<Suspense>
					<TextControl id={id}></TextControl>
				</Suspense>
			);
		case 'qr':
			return (
				<Suspense>
					<QrControl id={id}></QrControl>
				</Suspense>
			);
		case 'image':
			return (
				<Suspense>
					<ImageBlock id={id}></ImageBlock>
				</Suspense>
			);
		case 'window':
			return (
				<Suspense>
					<WindowBlock id={id}></WindowBlock>
				</Suspense>
			);
		case 'avatar':
			return (
				<Suspense>
					<AvatarBlock id={id}></AvatarBlock>
				</Suspense>
			);

		case 'arrow':
			return (
				<Suspense>
					<ShapeBlock id={id}></ShapeBlock>
				</Suspense>
			);
		case 'phone_mockup':
			return (
				<Suspense>
					<PhoneBlock id={id}></PhoneBlock>
				</Suspense>
			);
		case 'faicon':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<FaIconBlock id={id}></FaIconBlock>
				</Suspense>
			);

		case 'tweet':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<TweetBlock id={id}></TweetBlock>
				</Suspense>
			);

		case 'badge':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<BadgeBlock id={id}></BadgeBlock>
				</Suspense>
			);
		default:
			return <></>;
	}
};
