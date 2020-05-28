'use strict';

//import des fichiers
const fileSystem = require('./fileSystem');
const userInterface = require('./userInterface');
const search = require('./search');


//  fonction qui recupere les chemins d'acces au dossier perso de user et les ifo de la liste des fichier dans le dossier
function main(){
    // on contexteulise les docs
    userInterface.bindDocument(window);

    let folderPath = fileSystem.getUsersHomeFolder();
 
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

// eve pour le changement des valeur des search
userInterface.bindSearchField((event) => {
  const query  = event.target.value;
  if (query  === '') {
    // si reche vide,on reinitialise a 0
    userInterface.resetFilter();
  } else {
    /*
     si ya des res, on appel la fonction de search pour traitere t filtrer les res sur interface
    */
    search.find(query , userInterface.filterResults);
    }
  });
}
  
window.onload = main;