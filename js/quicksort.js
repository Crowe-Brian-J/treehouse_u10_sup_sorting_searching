// js/quicksort.js
'use strict'

const { runSort } = require('./runSort')

// Uses recursion
const quickSort = (arr) => {
  if (arr.length <= 1) return arr // Base Case

  const pivot = arr[arr.length - 1]
  const left = []
  const right = []

  for (const el of arr.slice(0, -1)) {
    el < pivot ? left.push(el) : right.push(el)
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}

if (require.main === module) {
  // Pass the unit you want here (e.g. 'µsecs', or 'msecs')
  runSort(quickSort, 'QuickSort', 'µsecs')
}

module.exports = { quickSort }
