const electron = require('electron');

const { app, BrowserWindow } = electron;

// garder une reférence globale à un objet fenetre, 
// la fenetre fermera quand obj js seront collecter
let mainWindow;

function createWindow() {
 // crer une  fenetre navigateur
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // on charge index.html dans le repec courant
  mainWindow.loadURL(`file://${__dirname}/index.html`);

 // activation des outils de dev
  mainWindow.webContents.openDevTools();

  // un eve se declenche lorsque une fenetre se ferm
  mainWindow.on('closed', () => {
    // delete tout les eve des chaque obj
    mainWindow = null;
  });
}

// initialissation de electron grace a cette fonction
// api non disp si eve rezady n'est pas activer
app.on('ready', createWindow);

// fermer tout les fenetre
app.on('window-all-closed', () => {
  
  // sinon les brre de menu resteront active
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // crer une nouvelle fenetre
  if (mainWindow === null) {
    createWindow();
  }
});