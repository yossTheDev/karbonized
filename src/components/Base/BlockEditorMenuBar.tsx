import React from 'react';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { useBlockEditorChrome } from '@/contexts/BlockEditorChromeContext';

export const BlockEditorMenuBar: React.FC = () => {
	const { config } = useBlockEditorChrome();

	return (
		<Menubar className='border-0 bg-transparent p-0 shadow-none'>
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem onSelect={() => config?.save()} disabled={!config}>
						Save Block
						<MenubarShortcut>Ctrl+S</MenubarShortcut>
					</MenubarItem>
					<MenubarItem
						onSelect={() => config?.exportKComponent()}
						disabled={!config}
					>
						Export as Component
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent>
					<MenubarItem
						onSelect={() => config?.toggleExplorer()}
						disabled={!config}
					>
						{config?.showExplorer ? 'Hide Explorer' : 'Show Explorer'}
						<MenubarShortcut>Ctrl+B</MenubarShortcut>
					</MenubarItem>
					<MenubarItem
						onSelect={() => config?.togglePreview()}
						disabled={!config}
					>
						{config?.showPreview ? 'Hide Preview' : 'Show Preview'}
						<MenubarShortcut>Ctrl+\</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem
						onSelect={() => config?.setActiveCodeTab('html')}
						disabled={!config}
					>
						Open HTML
						<MenubarShortcut>Alt+1</MenubarShortcut>
					</MenubarItem>
					<MenubarItem
						onSelect={() => config?.setActiveCodeTab('css')}
						disabled={!config}
					>
						Open CSS
						<MenubarShortcut>Alt+2</MenubarShortcut>
					</MenubarItem>
					<MenubarItem
						onSelect={() => config?.setActiveCodeTab('js')}
						disabled={!config}
					>
						Open JavaScript
						<MenubarShortcut>Alt+3</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Preview</MenubarTrigger>
				<MenubarContent>
					<MenubarItem
						onSelect={() => config?.setActivePreviewTab('preview')}
						disabled={!config}
					>
						Render Surface
					</MenubarItem>
					<MenubarItem
						onSelect={() => config?.setActivePreviewTab('css')}
						disabled={!config}
					>
						CSS Variables
					</MenubarItem>
					<MenubarItem
						onSelect={() => config?.setActivePreviewTab('js')}
						disabled={!config}
					>
						JS Variables
					</MenubarItem>
					<MenubarItem
						onSelect={() => config?.setActivePreviewTab('actions')}
						disabled={!config}
					>
						Actions
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Run</MenubarTrigger>
				<MenubarContent>
					<MenubarItem
						onSelect={() => config?.refreshPreview()}
						disabled={!config}
					>
						Refresh Preview
						<MenubarShortcut>Ctrl+R</MenubarShortcut>
					</MenubarItem>
					<MenubarItem
						onSelect={() => config?.toggleRuntime()}
						disabled={!config}
					>
						{config?.allowScriptExecution
							? 'Disable JS Runtime'
							: 'Enable JS Runtime'}
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

export default BlockEditorMenuBar;
