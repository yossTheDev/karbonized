"use strict";
const electron = require("electron");
electron.app.whenReady().then(() => {
  const win = new electron.BrowserWindow({
    title: "Main window"
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
});
