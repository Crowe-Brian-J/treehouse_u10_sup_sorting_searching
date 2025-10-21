// jsSearch/linearSearch.js

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

// const namesArr = loadFile('names/sorted.txt', { parse: 'string' })

// const index = indexOfItem(namesArr, 'Lucie Hansman')
// console.log(index) // 65829

//possible refactor -> runSearch - similar to runSort so we can see how long it takes

if (require.main === module) {
  runSearch(indexOfItem, 'linearSearch', 'µsecs')
}
