import React from 'react';
import { CodeControl } from './CodeControl';
import { TextControl } from './TextControl';

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
		default:
			return <></>;
	}
};
