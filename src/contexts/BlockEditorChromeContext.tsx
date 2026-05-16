import React, { createContext, useContext, useMemo, useState } from 'react';

export type BlockEditorCodeTab = 'html' | 'css' | 'js';
export type BlockEditorPreviewTab = 'preview' | 'css' | 'js' | 'actions';

export interface BlockEditorMenuConfig {
	save: () => void;
	exportKComponent: () => void;
	refreshPreview: () => void;
	togglePreview: () => void;
	toggleExplorer: () => void;
	toggleRuntime: () => void;
	setActiveCodeTab: (tab: BlockEditorCodeTab) => void;
	setActivePreviewTab: (tab: BlockEditorPreviewTab) => void;
	showPreview: boolean;
	showExplorer: boolean;
	allowScriptExecution: boolean;
	activeCodeTab: BlockEditorCodeTab;
	activePreviewTab: BlockEditorPreviewTab;
}

interface BlockEditorChromeContextValue {
	config: BlockEditorMenuConfig | null;
	setConfig: React.Dispatch<React.SetStateAction<BlockEditorMenuConfig | null>>;
}

const BlockEditorChromeContext = createContext<BlockEditorChromeContextValue | null>(
	null,
);

export const BlockEditorChromeProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [config, setConfig] = useState<BlockEditorMenuConfig | null>(null);

	const value = useMemo(
		() => ({
			config,
			setConfig,
		}),
		[config],
	);

	return (
		<BlockEditorChromeContext.Provider value={value}>
			{children}
		</BlockEditorChromeContext.Provider>
	);
};

export const useBlockEditorChrome = (): BlockEditorChromeContextValue => {
	const context = useContext(BlockEditorChromeContext);

	if (!context) {
		throw new Error(
			'useBlockEditorChrome must be used within BlockEditorChromeProvider',
		);
	}

	return context;
};
