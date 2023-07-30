import { contextBridge, ipcRenderer, app, shell } from 'electron';

document.addEventListener('click', (event: any) => {
	if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
		event.preventDefault();
		shell.openExternal(event.target.href);
	}
});

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

		once(
			channel: string,
			listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
		) {
			ipcRenderer.once(channel, listener);
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
