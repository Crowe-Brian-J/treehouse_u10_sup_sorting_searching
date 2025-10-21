// jsSearch/binarySearch.js
'use strict'

const { runSearch } = require('./runSearch')

// I assume this is going to work similar to binary sort. For strings though, I'm guessing we have to break them into an array of strings to match place value?

// Split the list
const midpoint = (first, last) => {
  return Math.floor((first + last) / 2)
}

// Binary Search
const binarySearch = (collection, target) => {
  let first = 0
  let last = collection.length - 1
  while (first <= last) {
    let mid = midpoint(first, last)
    if (collection[mid] === target) {
      return mid
    } else if (collection[mid] < target) {
      first = mid + 1
    } else {
      last = mid - 1
    }
  }
  return null
}

if (require.main === module) {
  runSearch(binarySearch, 'binarySearch', 'µsecs')
}
