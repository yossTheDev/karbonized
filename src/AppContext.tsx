import { createContext } from 'react';

export const AppContext = createContext<{
	viewerRef: any;
	theme: string;
	toggleTheme: () => void;
}>({
	viewerRef: null,
	theme: 'dark',
	toggleTheme: () => {},
});
