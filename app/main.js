'use strict'

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // mainWindow.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', createWindow)
