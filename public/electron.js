const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const ipcMain = electron.ipcMain
const express = require('express')
const webSocketServer = require('websocket').server

// variables para enviar al servidor

let hiddenUsuario = false

const server = express()
console.log(ipcMain)

const path = require('path')
const isDev = require('electron-is-dev')
const { connect } = require('http2')

let mainWindow

let vistaUsuario

// Reload in Development for Browser Windows
if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
  })
}

// function ventanaUsuario() {
//   vistaUsuario = new BrowserWindow({ width: 900, height: 680 })
//   vistaUsuario.loadURL(
//     isDev
//       ? 'http://localhost:3000/usuario'
//       : `file://${path.join(__dirname, '../build/index.html')}`
//   )
//   if (isDev) {
//     // Open the DevTools.
//     //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
//     vistaUsuario.webContents.openDevTools()
//   }
//   vistaUsuario.on('closed', () => (mainWindow = null))
// }

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  vistaUsuario = new BrowserWindow({
    width: 900,
    height: 680,
    parent: mainWindow,
    show: true
  })
  vistaUsuario.loadURL(
    isDev
      ? 'http://localhost:3000/usuario'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => (mainWindow = null))

  const mainMenu = Menu.buildFromTemplate(templateMenu)
  Menu.setApplicationMenu(mainMenu)
}

const templateMenu = [
  {
    label: 'Usuario'
    // onclick() {
    //   vistaUsuario.show()
    // }
  }
]
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
// server.get('/api', (req, res) => {
//   return res.json({
//     ok: true
//   })
// })

server.use(express.static('assets'))

let servers = server.listen(8080, () => {
  console.log(`server en el puerto 8080`)
})

let webSocket = new webSocketServer({
  httpServer: servers
})

let connections = []

webSocket.on('request', function (request) {
  console.log('tenemos visita')
  let connection = request.accept('echo-protocol', request.origin)

  connections.push(connection)

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      hiddenUsuario = message.utf8Data
      broadcast(hiddenUsuario)
    }
  })

  function broadcast(message) {
    connections.forEach((c) => c.sendUTF(message))
  }

  connection.sendUTF(JSON.stringify(hiddenUsuario))
})
