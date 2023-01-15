import React from 'react';
import { CodeControl } from './CodeBlock';
import { QrControl } from './QrBlock';
import { TextControl } from './TextBlock';

interface Props {
	type: string;
}

export const ControlHandler: React.FC<Props> = ({ type }) => {
	// Store Actions
	switch (type) {
		case 'code':
			return <CodeControl id={Math.random().toString()}></CodeControl>;
		case 'text':
			return <TextControl id={Math.random().toString()}></TextControl>;
		case 'qr':
			return <QrControl id={Math.random().toString()}></QrControl>;
		default:
			return <></>;
	}
};
