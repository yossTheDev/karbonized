import { app, BrowserWindow, ipcMain, Menu, nativeImage } from 'electron';
import { existsSync, mkdirSync } from 'fs';
import * as fs from 'node:fs/promises';
import { join } from 'path';

const loadExtensions = async (event) => {
	/* Create Extensions Folder */
	mkdirSync(join(app.getPath('appData'), 'karbonized', 'extensions'), {
		recursive: true,
	});

	event.reply('loading_extensions', true);

	const extensionsPath = join(
		app.getPath('appData'),
		'karbonized',
		'extensions',
	);

	const extensions = (await fs.readdir(extensionsPath)).filter(async (item) =>
		(await fs.stat(`${join(extensionsPath, item)}`)).isDirectory(),
	);

	const loadedExtensions: Extension[] = [];

	for (const extension of extensions) {
		let newExtension: Extension = { logo: '', components: [] };

		console.log('loading extensions...');

		/* Get Extension Logo */
		if (existsSync(join(extensionsPath, extension, 'logo.png'))) {
			newExtension.logo =
				'data:image/png;base64,' +
				(await fs.readFile(
					join(extensionsPath, extension, 'logo.png'),
					'base64',
				));
		}

		/* Load Extension Info */
		newExtension.info = JSON.parse(
			await fs.readFile(join(extensionsPath, extension, 'info.json'), 'utf-8'),
		);

		/* Get All Components */
		const components = (
			await fs.readdir(join(extensionsPath, extension, 'components'))
		).filter((item) => item.endsWith('.json'));

		for (const item of components) {
			let newComponent: {
				properties?: {};
				code?: string;
				image?: string;
			} = {};

			/* Get Component Properties */
			newComponent.properties = JSON.parse(
				await fs.readFile(
					join(extensionsPath, extension, 'components', item),
					'utf-8',
				),
			);

			const name = item.split('.')[0];

			if (
				existsSync(join(extensionsPath, extension, 'components', name + '.png'))
			) {
				newComponent.image =
					'data:image/png;base64,' +
					(await fs.readFile(
						join(extensionsPath, extension, 'components', name + '.png'),
						'base64',
					));
			}

			if (
				existsSync(join(extensionsPath, extension, 'components', name + '.svg'))
			) {
				newComponent.image =
					'data:image/svg+xml;base64,' +
					(await fs.readFile(
						join(extensionsPath, extension, 'components', name + '.svg'),
						'base64',
					));
			}

			if (
				existsSync(join(extensionsPath, extension, 'components', name + '.jsx'))
			) {
				newComponent.code = await fs.readFile(
					join(extensionsPath, extension, 'components', name + '.jsx'),
					'utf-8',
				);
			}

			newExtension.components.push(newComponent);

			//console.log(newComponent);

			//console.log(newComponent)
		}

		loadedExtensions.push(newExtension);

		console.log(newExtension.info);

		event.reply('extension_loaded', newExtension);
	}

	/* Write Extensions Data */
	await fs.writeFile(
		join(app.getPath('appData'), 'karbonized', 'extensions_data.json'),
		JSON.stringify(loadedExtensions),
	);
	console.log('Loading Extensions... Finished');

	event.reply('loading_extensions', false);
};

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

	ipcMain.on('getAppData', async (event) => {
		const load = async () => {
			if (
				existsSync(
					join(app.getPath('appData'), 'karbonized', 'extensions_data.json'),
				)
			) {
				const data = JSON.parse(
					await fs.readFile(
						join(app.getPath('appData'), 'karbonized', 'extensions_data.json'),
						'utf-8',
					),
				);

				event.reply('extensions_loaded', data);
			} else {
				await loadExtensions(event);
			}
		};

		await load();
	});

	ipcMain.on('reloadExtensions', async (event) => {
		await loadExtensions(event);
	});
});

interface Extension {
	info?: {
		name: string;
		author: string;
		description: string;
		version: string;
	};
	logo: string;
	components: { properties?: {}; code?: string; image?: string }[];
}
