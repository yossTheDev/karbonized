import React from 'react';
import { AvatarBlock } from './AvatarBlock';
import { CodeControl } from './CodeBlock';
import { ImageBlock } from './ImageBlock';
import { QrControl } from './QrBlock';
import { TextControl } from './TextBlock';
import { WindowBlock } from './WindowBlock';

interface Props {
	id: string;
	type: string;
}

export const ControlHandler: React.FC<Props> = ({ type, id }) => {
	// Store Actions
	switch (type) {
		case 'code':
			return <CodeControl id={id}></CodeControl>;
		case 'text':
			return <TextControl id={id}></TextControl>;
		case 'qr':
			return <QrControl id={id}></QrControl>;
		case 'image':
			return <ImageBlock id={id}></ImageBlock>;
		case 'window':
			return <WindowBlock id={id}></WindowBlock>;
		case 'avatar':
			return <AvatarBlock id={id}></AvatarBlock>;
		default:
			return <></>;
	}
};
