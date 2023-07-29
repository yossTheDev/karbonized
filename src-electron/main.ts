import { app, BrowserWindow, ipcMain, Menu, nativeImage } from 'electron';
import { join } from 'path';
import * as fs from 'fs';

app.whenReady().then(() => {
	const icon = nativeImage.createFromPath(
		join(
			__dirname,
			'assets',
			process.platform === 'win32' ? 'icon.ico' : 'icon.png',
		),
	);

	const win = new BrowserWindow({
		title: 'Karbonized',
		icon: icon,
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

	if (!process.env.VITE_DEV_SERVER_URL) {
		app.applicationMenu = new Menu();
	}

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

	ipcMain.on('getAppData', (event) => {
		console.log(app.getPath('appData'));
		fs.mkdirSync(join(app.getPath('appData'), 'karbonized', 'extensions'), {
			recursive: true,
		});

		const extensionsPath = join(
			app.getPath('appData'),
			'karbonized',
			'extensions',
		);

		const extensions = fs
			.readdirSync(extensionsPath)
			.filter((item) =>
				fs.statSync(`${join(extensionsPath, item)}`).isDirectory(),
			);

		const loadedExtensions: Extension[] = [];

		extensions.forEach((extension) => {
			let newExtension: Extension = { components: [] };

			// Get Extension Data
			newExtension.info = JSON.parse(
				fs.readFileSync(join(extensionsPath, extension, 'info.json'), 'utf-8'),
			);

			/* Get Extension Components */
			let lastFile = '';

			fs.readdirSync(join(extensionsPath, extension, 'components'))
				.filter((item) => item.endsWith('.json'))
				.forEach((item) => {
					let newComponent: {
						properties?: {};
						code?: string;
						image?: string;
					} = {};

					/* Get Component Properties */
					newComponent.properties = JSON.parse(
						fs.readFileSync(
							join(extensionsPath, extension, 'components', item),
							'utf-8',
						),
					);

					if (
						fs.existsSync(
							join(
								extensionsPath,
								extension,
								'components',
								item.split('.')[0] + '.png',
							),
						)
					) {
						newComponent.image =
							'data:image/png;base64,' +
							fs.readFileSync(
								join(
									extensionsPath,
									extension,
									'components',
									item.split('.')[0] + '.png',
								),
								'base64',
							);
					}

					if (
						fs.existsSync(
							join(
								extensionsPath,
								extension,
								'components',
								item.split('.')[0] + '.jsx',
							),
						)
					) {
						newComponent.code = fs.readFileSync(
							join(
								extensionsPath,
								extension,
								'components',
								item.split('.')[0] + '.jsx',
							),
							'utf-8',
						);
					}

					newExtension.components = [...newExtension.components, newComponent];
				});

			loadedExtensions.push(newExtension);
		});

		event.reply('extensions_loaded', loadedExtensions);
	});
});

interface Extension {
	info?: {
		name: string;
		author: string;
		description: string;
		version: string;
	};

	components: { properties?: {}; code?: string; image?: string }[];
}
