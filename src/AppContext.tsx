import { createContext } from 'react';

export const AppContext = createContext<{
	viewerRef: any;
	showWizard: boolean;
	setShowWizard: Function;
	theme: string;
	toggleTheme: () => void;
}>({
	viewerRef: null,
	showWizard: true,
	setShowWizard: () => { },
	theme: 'dark',
	toggleTheme: () => { },
});
