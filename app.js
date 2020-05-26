'use strict';

// on va charger le module node dans app
// en dans module node la variable osenv peut redousdre le pro des emplacement
const fs = require('fs');
const osenv =require('osenv');


// decl de mod async : traiter les appel à des fonction asynchorne et prendre les resulats
// decl mod path
const async = require('async');
const path = require('path');

//import des fichiers
const fileSystem = require('./fileSystem');
const userInterface = require('./userInterface');

// la fonction osenv.home return le dossier personnel de l'user
function getUsersHomeFolder() {
  return osenv.home();
}

// on liste les fichiers avec fs.readdir  (fs: fileSystem)
function getFilesInFolder(folderPath,cb){
  fs.readdir(folderPath,cb);
}

function inspectAndDescribeFile(filePath, cb) {
  let result = {
    file: path.basename(filePath),
    path: filePath,
    type: ''
  };
  fs.stat(filePath, (err, stat) => {
    if (err) {
      cb(err);
    } else {
      // savoir si c'est un dossier
      if (stat.isFile()) { 
        result.type = 'file';
      }
      // savoi si c un menu
      if (stat.isDirectory()) { 
        result.type = 'directory';
      }
      cb(err, result);
    }
  });
}

function inspectAndDescribeFiles(folderPath, files, cb) {
  // avec async, on appel les fonction async et prendre res
  async.map(files, (file, asyncCB) => {
    const resolveFilePath = path.resolve(folderPath, file);
    inspectAndDescribeFile(resolveFilePath, asyncCB);
  }, cb);
}

function displayFile(file) {
    const mainArea = document.getElementById('main-area');
    const template = document.querySelector('#item-template');
    // on crer une copie  du model
    let clone = document.importNode(template.content, true);
    
    // on ajoute le nomFichier et son icone
    clone.querySelector('img').src = `images/${file.type}.svg`;
    clone.querySelector('.filename').innerText = file.file;
  
    mainArea.appendChild(clone);
  }

// fonction qui permet d'afficher les info de la liste des dossiers
function displayFiles(err, files) {
  if (err) {
    return alert('On ne peux pas afficher les dossiers');
  }
  files.forEach((file) => {
    console.log(file);
  });
}

//  fonction qui recupere les chemins d'acces au dossier perso de user et les ifo de la liste des fichier dans le dossier
function main(){
    // on contexteulise les docs
    userInterface.bindDocument(window);

    const folderPath = fileSystem.getUsersHomeFolder();
 
    /*
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
      if (err) {
        console.log('Vous avez pas chargé votre dossier HOME');
      }
      fileSystem.inspectAndDescribeFiles(folderPath, files, userInterface.displayFiles);
    });
  }
  
   const folderPath = getUsersHomeFolder();
  getFilesInFolder(folderPath, (err, files) => {
    if (err) {
      console.log('Vous avez pas chargé votre dossier HOME');
    }
    /*
    files.forEach((file) => {
      console.log(`${folderPath}/${file}`);
    });

    inspectAndDescribeFiles(folderPath, files, displayFiles);
  });
  */
 // on reninitialise le zone de texte et maj du chemi d'acces precedente de la zone
 userInterface.loadDirectory(folderPath)(window);
}
  
window.onload = function() {
    main();
  };

