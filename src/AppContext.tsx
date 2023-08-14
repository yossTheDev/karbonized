import { createContext } from 'react';

export const AppContext = createContext<{ viewerRef: any }>({
	viewerRef: null,
});
