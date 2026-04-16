import { BrowserWindow, Menu, app, ipcMain, nativeImage } from "electron";
import { existsSync, mkdirSync } from "fs";
import * as fs from "node:fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
//#region src-electron/main.ts
var __dirname = dirname(fileURLToPath(import.meta.url));
var loadExtensions = async (event) => {
	mkdirSync(join(app.getPath("appData"), "karbonized", "extensions"), { recursive: true });
	event.reply("loading_extensions", true);
	const extensionsPath = join(app.getPath("appData"), "karbonized", "extensions");
	const extensions = (await fs.readdir(extensionsPath)).filter((item) => item.endsWith(".kext"));
	const loadedExtensions = [];
	for (const extension of extensions) {
		const newExtension = JSON.parse(await fs.readFile(join(extensionsPath, extension), "utf-8"));
		loadedExtensions.push(newExtension);
		event.reply("extension_loaded", newExtension);
	}
	await fs.writeFile(join(app.getPath("appData"), "karbonized", "extensions_data.json"), JSON.stringify(loadedExtensions));
	event.reply("extensions_loaded", loadedExtensions);
	event.reply("loading_extensions", false);
};
app.whenReady().then(() => {
	const win = new BrowserWindow({
		title: "Karbonized",
		icon: nativeImage.createFromPath(join(__dirname, process.platform === "win32" ? "icon.ico" : "icon.png")),
		width: 800,
		height: 600,
		minHeight: 600,
		minWidth: 900,
		useContentSize: true,
		frame: process.platform === "darwin",
		titleBarStyle: "hidden",
		webPreferences: {
			preload: join(__dirname, "preload.cjs"),
			sandbox: false
		}
	});
	if (!process.env.VITE_DEV_SERVER_URL) app.applicationMenu = new Menu();
	win.maximize();
	if (process.env.VITE_DEV_SERVER_URL) win.loadURL(process.env.VITE_DEV_SERVER_URL);
	else win.loadFile("dist/index.html");
	ipcMain.on("maximizeApp", (event) => {
		if (win.isMaximized()) {
			win.unmaximize();
			event.reply("maximizedStatus", win.isMaximized());
		} else {
			win.maximize();
			event.reply("maximizedStatus", win.isMaximized());
		}
	});
	ipcMain.on("minimizeApp", () => {
		win.minimize();
	});
	ipcMain.on("closeApp", () => {
		win.close();
	});
	ipcMain.on("getAppData", async (event) => {
		const load = async () => {
			if (existsSync(join(app.getPath("appData"), "karbonized", "extensions_data.json"))) {
				const data = JSON.parse(await fs.readFile(join(app.getPath("appData"), "karbonized", "extensions_data.json"), "utf-8"));
				event.reply("extensions_loaded", data);
			} else await loadExtensions(event);
		};
		await load();
	});
	ipcMain.on("reloadExtensions", async (event) => {
		await loadExtensions(event);
	});
});
//#endregion
