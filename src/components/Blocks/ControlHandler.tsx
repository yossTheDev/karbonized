import React, { Suspense } from 'react';
import BadgeBlock from './BadgeBlock';
import { BlockLoader } from './BlockLoader';
import TweetBlock from './TweetBlock';

const CodeControl = React.lazy(async () => await import('./CodeBlock'));
const FaIconBlock = React.lazy(async () => await import('./FaIconBlock'));
const CustomBlock = React.lazy(async () => await import('./CustomBlock'));
const TextControl = React.lazy(async () => await import('./TextBlock'));
const QrControl = React.lazy(async () => await import('./QrBlock'));
const PhoneBlock = React.lazy(async () => await import('./PhoneBlock'));
const ImageBlock = React.lazy(async () => await import('./ImageBlock'));
const AvatarBlock = React.lazy(async () => await import('./AvatarBlock'));
const ShapeBlock = React.lazy(async () => await import('./ShapeBlock'));
const WindowBlock = React.lazy(async () => await import('./WindowBlock'));
const HTMLBlock = React.lazy(async () => await import('./HTMLBlock'));

interface Props {
	id: string;
	type: string;
	isVisible: boolean;
}

export const ControlHandler: React.FC<Props> = ({ type, id, isVisible }) => {
	// Store Actions
	switch (type) {
		case 'code':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<div className={`${!isVisible && 'hidden'}`}>
						<CodeControl id={id}></CodeControl>
					</div>
				</Suspense>
			);
		case 'text':
			return (
				<Suspense>
					<div className={`${!isVisible && 'hidden'}`}>
						<TextControl id={id}></TextControl>
					</div>
				</Suspense>
			);
		case 'qr':
			return (
				<Suspense>
					<div className={`${!isVisible && 'hidden'}`}>
						<QrControl id={id}></QrControl>
					</div>
				</Suspense>
			);
		case 'image':
			return (
				<Suspense>
					<div className={`${!isVisible && 'hidden'}`}>
						<ImageBlock id={id}></ImageBlock>
					</div>
				</Suspense>
			);
		case 'window':
			return (
				<Suspense>
					<div className={`${!isVisible && 'hidden'}`}>
						<WindowBlock id={id}></WindowBlock>
					</div>
				</Suspense>
			);
		case 'avatar':
			return (
				<Suspense>
					<div className={`${!isVisible && 'hidden'}`}>
						<AvatarBlock id={id}></AvatarBlock>
					</div>
				</Suspense>
			);

		case 'shape':
			return (
				<Suspense>
					<div className={`${!isVisible && 'hidden'}`}>
						<ShapeBlock id={id}></ShapeBlock>
					</div>
				</Suspense>
			);
		case 'phone_mockup':
			return (
				<Suspense>
					<div className={`${!isVisible && 'hidden'}`}>
						<PhoneBlock id={id}></PhoneBlock>
					</div>
				</Suspense>
			);
		case 'icon':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<div className={`${!isVisible && 'hidden'}`}>
						<FaIconBlock id={id}></FaIconBlock>
					</div>
				</Suspense>
			);

		case 'tweet':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<div className={`${!isVisible && 'hidden'}`}>
						<TweetBlock id={id}></TweetBlock>
					</div>
				</Suspense>
			);

		case 'badge':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<div className={`${!isVisible && 'hidden'}`}>
						<BadgeBlock id={id}></BadgeBlock>
					</div>
				</Suspense>
			);
		case 'custom':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<div className={`${!isVisible && 'hidden'}`}>
						<CustomBlock id={id}></CustomBlock>
					</div>
				</Suspense>
			);
		case 'html':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<div className={`${!isVisible && 'hidden'}`}>
						<HTMLBlock id={id}></HTMLBlock>
					</div>
				</Suspense>
			);
		default:
			return <></>;
	}
};
