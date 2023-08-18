import { createContext } from 'react';

export const AppContext = createContext<{
	viewerRef: any;
	showWizard: boolean;
	setShowWizard: Function;
}>({
	viewerRef: null,
	showWizard: true,
	setShowWizard: () => {},
});
