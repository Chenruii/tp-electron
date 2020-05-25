'use strict';

const electron = require('electron');

// on va charger le module node dans app
// en dans module node la variable osenv peut redousdre le pro des emplacement
const fs = require('fs');
const osenv =require('osenv');

// la fonction osenv.home return le dossier personnel de l'user
function getUsersHomeFolder() {
  return osenv.home();
}

// on liste les fichiers avec fs.readdir  (fs: fileSystem)
function getFilesInFolder(folderPath,cb){
  fs.readdir(folderPath,cb);
}

function main(){
  const folderPath = getUsersHomeFolder();
  getFilesInFolder(folderPath, (err, files) => {
    if (err) {
      console.log('Vous avez pas chargé votre dossier HOME');
    }
    files.forEach((file) => {
      console.log(`${folderPath}/${file}`);
    });
  });
}

main();

// on créer des obj app pour electron
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// garder une reférence globale à un objet fenetre, 
// la fenetre fermera quand obj js seront collecter
let mainWindow;

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
  mainWindow = new BrowserWindow();

  // charger index.html
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // liberer mainwindxos quand il est plus allouer
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
