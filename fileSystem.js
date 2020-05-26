'use strict';
     
// on va charger le module node dans app
// en dans module node la variable osenv peut redousdre le pro des emplacement
const fs = require('fs');
const osenv =require('osenv');
// decl de mod async : traiter les appel à des fonction asynchorne et prendre les resulats
// decl mod path
const async = require('async');
const path = require('path');

const shell = require('electron').shell;
/*
if (process.versions.electron) {
  shell = require('electron').shell;
} else {
  shell = window.require('nw.gui').Shell;
}
*/
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
     
function inspectAndDescribeFiles(folderPath, files, cb) {
    // avec async, on appel les fonction async et prendre res
    async.map(files, (file, asyncCB) => {
      const resolveFilePath = path.resolve(folderPath, file);
      inspectAndDescribeFile(resolveFilePath, asyncCB);
    }, cb);
}
  
function openFile(filePath) {
  //  on appel la fonction openItem de api shell
  shell.openItem(filePath);
}

module.exports = {
  getUsersHomeFolder,
  getFilesInFolder,
  inspectAndDescribeFiles,
  openFile
};