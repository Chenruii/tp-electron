'use strict';

let document;

const fileSystem = require('./fileSystem');

// maj chemin acces
function displayFolderPath(folderPath) {
  document.getElementById('current-folder').innerText = folderPath;
}

// on vide le contenu
function clearView() {
  const mainArea = document.getElementById('main-area');
  let firstChild = mainArea.firstChild;
  while (firstChild) {
    mainArea.removeChild(firstChild);
    firstChild = mainArea.firstChild;
  }
}
// fonction qui maj chemin acces dans zone de texte
function loadDirectory(folderPath) {
  return function (window) {
    if (!document) {
      document = window.document;
    }
    // update de chemin acces dans le zone texte
    displayFolderPath(folderPath);
    fileSystem.getFilesInFolder(folderPath, (err, files) => {

      // on delete les ele de main area
      clearView();
      if (err) {
        throw new Error('on a pas pu charger le dossier');
      }
      fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles);
    });
  }
}
function displayFile(file) {
    const mainArea = document.getElementById('main-area');
    const template = document.querySelector('#item-template');
    // on crer une copie  du model
    let clone = document.importNode(template.content, true);
    
    // on ajoute le nomFichier et son icone
    clone.querySelector('img').src = `images/${file.type}.svg`;
    // si repectoire , alors on doucle clique sur leima de repectoire
  if (file.type === 'directory') {
    clone.querySelector('img').addEventListener('dblclick', () => {
      // charger les dsossier apres clique
      loadDirectory(file.path)();
    }, false);
  }
 
  clone.querySelector('.filename').innerText = file.file;
  
    mainArea.appendChild(clone);
}

  // fonction qui permet d'afficher les info de la liste des dossiers
function displayFiles(err, files) {
    if (err) {
      return alert('On ne peux pas afficher les fichiers');
    }
    files.forEach((file) => {
      console.log(file);
    });
}
// fonction qui permet de contectualiser les docu dans la fenetre
function bindDocument (window) {
    if (!document) {
      document = window.document;
    }
}
   
module.exports = {
    bindDocument,
    displayFiles,
    loadDirectory
};