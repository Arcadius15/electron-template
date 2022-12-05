const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

require('@electron/remote/main').initialize()
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.webContents.openDevTools(true)
  win.loadURL('http://localhost:3000/')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('browser-window-created', (_, window) => {
  require("@electron/remote/main").enable(window.webContents)
})