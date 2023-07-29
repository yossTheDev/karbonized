import { Titlebar, TitlebarColor } from 'custom-electron-titlebar';
import { contextBridge, ipcRenderer, app } from 'electron';

window.addEventListener('DOMContentLoaded', () => {});

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

		isLinux() {
			return process.platform === 'linux';
		},

		isWindow() {
			return process.platform === 'win32';
		},

		isMac() {
			return process.platform === 'darwin';
		},

		isLinuxOrWindows() {
			return process.platform === 'darwin' || process.platform === 'linux';
		},

		getAppData() {
			console.log(app.getPath('appData'));
		},
	},
});
