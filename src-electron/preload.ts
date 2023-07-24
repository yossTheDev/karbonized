import { Titlebar, TitlebarColor } from 'custom-electron-titlebar';
import { contextBridge, ipcRenderer, app } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
	// Title bar implementation
	/*new Titlebar({
		backgroundColor: TitlebarColor.fromHex('#0E0E0E'),
		containerOverflow: 'hidden',
	});*/
});

export type Channels = 'minimizeApp' | 'maximizeApp' | 'closeApp';

contextBridge.exposeInMainWorld('electron', {
	ipcRenderer: {
		sendMessage(channel: Channels, args: unknown[]) {
			ipcRenderer.send(channel, args);
		},
		on(
			channel: string,
			listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
		) {
			ipcRenderer.on(channel, listener);
		},
	},
});
