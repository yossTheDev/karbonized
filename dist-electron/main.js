"use strict";
const electron = require("electron");
const path = require("path");
const fs$1 = require("node:fs/promises");
const fs = require("fs");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs$1);
electron.app.whenReady().then(() => {
  const icon = electron.nativeImage.createFromPath(
    path.join(
      __dirname,
      "assets",
      process.platform === "win32" ? "icon.ico" : "icon.png"
    )
  );
  const win = new electron.BrowserWindow({
    title: "Karbonized",
    icon,
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 900,
    useContentSize: true,
    frame: process.platform === "darwin",
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false
    }
  });
  if (!process.env.VITE_DEV_SERVER_URL) {
    electron.app.applicationMenu = new electron.Menu();
  }
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
  electron.ipcMain.on("getAppData", (event) => {
    const loadExtensions = async () => {
      fs.mkdirSync(path.join(electron.app.getPath("appData"), "karbonized", "extensions"), {
        recursive: true
      });
      event.reply("loading_extensions", true);
      const extensionsPath = path.join(
        electron.app.getPath("appData"),
        "karbonized",
        "extensions"
      );
      const extensions = (await fs__namespace.readdir(extensionsPath)).filter(
        async (item) => (await fs__namespace.stat(`${path.join(extensionsPath, item)}`)).isDirectory()
      );
      const loadedExtensions = [];
      for (const extension of extensions) {
        let newExtension = { logo: "", components: [] };
        if (fs.existsSync(path.join(extensionsPath, extension, "logo.png"))) {
          newExtension.logo = "data:image/png;base64," + await fs__namespace.readFile(
            path.join(extensionsPath, extension, "logo.png"),
            "base64"
          );
        }
        newExtension.info = JSON.parse(
          await fs__namespace.readFile(
            path.join(extensionsPath, extension, "info.json"),
            "utf-8"
          )
        );
        const components = (await fs__namespace.readdir(path.join(extensionsPath, extension, "components"))).filter((item) => item.endsWith(".json"));
        for (const item of components) {
          let newComponent = {};
          newComponent.properties = JSON.parse(
            await fs__namespace.readFile(
              path.join(extensionsPath, extension, "components", item),
              "utf-8"
            )
          );
          if (fs.existsSync(
            path.join(
              extensionsPath,
              extension,
              "components",
              item.split(".")[0] + ".png"
            )
          )) {
            newComponent.image = "data:image/png;base64," + await fs__namespace.readFile(
              path.join(
                extensionsPath,
                extension,
                "components",
                item.split(".")[0] + ".png"
              ),
              "base64"
            );
          }
          if (fs.existsSync(
            path.join(
              extensionsPath,
              extension,
              "components",
              item.split(".")[0] + ".svg"
            )
          )) {
            newComponent.image = "data:image/svg+xml;base64," + await fs__namespace.readFile(
              path.join(
                extensionsPath,
                extension,
                "components",
                item.split(".")[0] + ".svg"
              ),
              "base64"
            );
          }
          if (fs.existsSync(
            path.join(
              extensionsPath,
              extension,
              "components",
              item.split(".")[0] + ".jsx"
            )
          )) {
            newComponent.code = await fs__namespace.readFile(
              path.join(
                extensionsPath,
                extension,
                "components",
                item.split(".")[0] + ".jsx"
              ),
              "utf-8"
            );
          }
          newExtension.components.push(newComponent);
        }
        loadedExtensions.push(newExtension);
      }
      event.reply("extensions_loaded", loadedExtensions);
      event.reply("loading_extensions", false);
    };
    loadExtensions();
  });
});
