import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { join } from 'path';

app.whenReady().then(() => {
	const win = new BrowserWindow({
		title: 'Main window',
		width: 800,
		height: 600,
		minHeight: 600,
		minWidth: 900,
		useContentSize: true,
		frame: process.platform === 'darwin',
		titleBarStyle: 'hidden',

		webPreferences: {
			preload: join(__dirname, 'preload.js'),
			sandbox: false,
		},
	});

	win.maximize();

	// You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(process.env.VITE_DEV_SERVER_URL);
	} else {
		// Load your file
		win.loadFile('dist/index.html');
	}

	ipcMain.on('maximizeApp', (event) => {
		if (win.isMaximized()) {
			win.unmaximize();
			event.reply('maximizedStatus', win.isMaximized());
		} else {
			win.maximize();
			event.reply('maximizedStatus', win.isMaximized());
		}
	});

	ipcMain.on('minimizeApp', () => {
		win.minimize();
	});

	ipcMain.on('closeApp', () => {
		win.close();
	});
});
