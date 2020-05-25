'use strict';

const electron = require('electron');

// on va charger le module node dans app
// en dans module node la variable osenv peut redousdre le pro des emplacement
const fs = require('fs');
const osenv =require('osenv');

// decl de mod async : traiter les appel à des fonction asynchorne et prendre les resulats
// decl mod path
const async = require('async');
const path = require('path');

// on créer des obj app pour electron
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// garder une reférence globale à un objet fenetre, 
// la fenetre fermera quand obj js seront collecter
let mainWindow = null;

// fermer tout les fenetre
app.on('window-all-closed', () => {
  
  // sinon les brre de menu resteront active
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  /*
   crer une new fenetre
  */
 mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true
  }
});

// debug
mainWindow.webContents.openDevTools();

  // charger index.html
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // liberer mainwindxos quand il est plus allouer
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
