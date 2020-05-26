'use strict';

let document;

const fileSystem = require('./fileSystem');
const search = require('./search');

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
    // on ajoute des appel des fonction pour reini index de la search
    search.resetIndex();

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
  
  // ajouter le fichier à lindex de search
  search.addToIndex(file);

  // on save le chemin acces dans data-filePath 
  clone.querySelector('img').setAttribute('data-filePath', file.path);

  // on ajoute le nomFichier et son icone
  clone.querySelector('img').src = `images/${file.type}.svg`;

  // si repectoire , alors on doucle clique sur leima de repectoire
  if (file.type === 'directory') {
    clone.querySelector('img').addEventListener('dblclick', () => {
      // charger les dossier apres clique
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

function filterResults(results) {
  // obtnier les chemin acces aux fichier dans res de searchpour une compraison
  const validFilePaths = results.map((result) => {
    return result.ref;
  });
  const items = document.getElementsByClassName('item');
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let filePath = item.getElementsByTagName('img')[0].getAttribute('data-filePath');
    // resu de recherche du fichier correspondante
    if (validFilePaths.indexOf(filePath) !== -1) {
      item.style = null;
    } else {
      // si on treouve pas, rendre invisible
      item.style = 'display:none;';
    }
  }
}

// fonction qui permet de gerer les resulat aevc filtrage,  
// la recherche vide , on appel cette fonction
function resetFilter() {
  const items = document.getElementsByClassName('item');
  for (let i = 0; i < items.length; i++) {
    items[i].style = null;
  }
}

// fonction qui permet de contectualiser les docu dans la fenetre
function bindDocument (window) {
    if (!document) {
      document = window.document;
    }
}
// pour ecouter la recherche
function bindSearchField(cb) {
  document.getElementById('search').addEventListener('keyup', cb, false);
}

module.exports = {
    bindDocument,
    displayFiles,
    loadDirectory,
    bindSearchField,
    filterResults,
    resetFilter
};