import {
	IconBrandCSharp,
	IconBrandJavascript,
	IconBrandPython,
	IconBrandReact,
	IconFile,
} from '@tabler/icons-react';
import React from 'react';

export const LanguajeTabIcon: React.FC<{ languaje: string }> = ({
	languaje,
}) => {
	switch (languaje) {
		case 'javascript':
			return <IconBrandJavascript></IconBrandJavascript>;
		case 'csharp':
			return <IconBrandCSharp></IconBrandCSharp>;
		case 'jsx':
			return <IconBrandReact></IconBrandReact>;
		case 'tsx':
			return <IconBrandReact></IconBrandReact>;
		case 'python':
			return <IconBrandPython></IconBrandPython>;

		default:
			return <IconFile></IconFile>;
	}
};
