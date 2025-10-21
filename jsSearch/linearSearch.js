// jsSearch/linearSearch.js
'use strict'

const { runSearch } = require('./runSearch')

// collection is the array, target is the value
const indexOfItem = (collection, target) => {
  for (let i = 0; i < collection.length; i++) {
    if (collection[i] === target) {
      return i
    }
  }
  return null
}

// Example target for names/sorted.txt -->
// 'Lucie Hansman' --> index: 65829

// Example CLI call in terminal
// node jsSearch/<file>.js <filePath for list> <target> --strings
// node jsSearch/linearSearch.js names/sorted.txt "Lucie Hansman" --strings

if (require.main === module) {
  runSearch(indexOfItem, 'linearSearch', 'µsecs')
}
