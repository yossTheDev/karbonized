import React, { Suspense } from 'react';
import { BlockLoader } from './BlockLoader';

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
					<CodeControl></CodeControl>
				</Suspense>
			);
		case 'text':
			return (
				<Suspense>
					<TextControl></TextControl>
				</Suspense>
			);
		case 'qr':
			return (
				<Suspense>
					<QrControl></QrControl>
				</Suspense>
			);
		case 'image':
			return (
				<Suspense>
					<ImageBlock></ImageBlock>
				</Suspense>
			);
		case 'window':
			return (
				<Suspense>
					<WindowBlock></WindowBlock>
				</Suspense>
			);
		case 'avatar':
			return (
				<Suspense>
					<AvatarBlock></AvatarBlock>
				</Suspense>
			);

		case 'arrow':
			return (
				<Suspense>
					<ShapeBlock></ShapeBlock>
				</Suspense>
			);
		case 'phone_mockup':
			return (
				<Suspense>
					<PhoneBlock></PhoneBlock>
				</Suspense>
			);
		case 'faicon':
			return (
				<Suspense fallback={<BlockLoader></BlockLoader>}>
					<FaIconBlock></FaIconBlock>
				</Suspense>
			);
		default:
			return <></>;
	}
};
