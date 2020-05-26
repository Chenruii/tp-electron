'use strict';
     
const lunr = require('lunr');
     
let index;
     
// indexe et reini la search
function resetIndex() {
    index = lunr(function() {
      this.field('file');
      this.field('type');
      this.ref('path');
    });
  }
   
// ass un index des doc rechercher
function addToIndex(file) {
    index.add(file);
  }
   
// pointer sur un fichier designe
function find(query, cb) {
    if (!index) {
        resetIndex();
      }
      const results = index.search(query);
      cb(results);
}
   
module.exports = {
    addToIndex,
    find,
    resetIndex
};

