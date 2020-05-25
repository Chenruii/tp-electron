//引用electron的模块
const electron = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  // 创建窗口
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // 通过 url 加载主页
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 在打开时启用开发者工具
  // mainWindow.webContents.openDevTools()

  // 监听窗口是否关闭
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}