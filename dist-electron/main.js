"use strict";
const electron = require("electron");
const path = require("path");
electron.app.whenReady().then(() => {
  const win = new electron.BrowserWindow({
    title: "Main window",
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 900,
    useContentSize: true,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false
    }
  });
  electron.app.applicationMenu = new electron.Menu();
  win.maximize();
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
  electron.ipcMain.on("maximizeApp", (event) => {
    if (win.isMaximized()) {
      win.unmaximize();
      event.reply("maximizedStatus", win.isMaximized());
    } else {
      win.maximize();
      event.reply("maximizedStatus", win.isMaximized());
    }
  });
  electron.ipcMain.on("minimizeApp", () => {
    win.minimize();
  });
  electron.ipcMain.on("closeApp", () => {
    win.close();
  });
});
