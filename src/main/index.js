'use strict'

import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * 监听事件
 */

// 打开文件夹

ipcMain.on('openfile:workButton', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files) {
    if (files) event.sender.send('openfile:workButton:reply', files)
  })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

let tipMessage = {
  error: '检测更新失败',
  checking: '正在检查更新…',
  updateAva: '检测到新版本,正在下载…',
  updateNotAva: '当前为最新版',
  hasDownload: '最新版已经下载完毕,是否立即更新'
}

const uploadUrl = '其他版本地址';

autoUpdater.setFeedURL(uploadUrl)

autoUpdater.on('error', () => {
  sendUpdateMessage(tipMessage.error)
})

autoUpdater.on('checking-for-update', () => {
  sendUpdateMessage(tipMessage.checking)
})

autoUpdater.on('update-available', () => {
  sendUpdateMessage(tipMessage.updateAva)
})

autoUpdater.on('update-not-available', () => {
  sendUpdateMessage(tipMessage.updateNotAva)
})

autoUpdater.on('update-downloaded', () => {
  // autoUpdater.quitAndInstall()
  sendUpdateMessage(tipMessage.hasDownload)
  ipcMain.on('update:app', (flag) => {
    if (flag) {
      autoUpdater.quitAndInstall();
    } else {
      return false;
    }
  })
})

autoUpdater.on('download-progress', function (progressObj) {
  mainWindow.webContents.send('downloadProgress', progressObj)
})

function sendUpdateMessage(text) {
  mainWindow.webContents.send('message', text)
}

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
