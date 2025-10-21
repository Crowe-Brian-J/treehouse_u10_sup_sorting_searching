// js/recursion.js
'use strict'

const fs = require('fs')
const path = require('path')

// Utilities
const { runSort } = require('./runSort')

// Recursive Merge Sort
const recursiveSort = (arr) => {
  if (arr.length <= 1) return arr // base case: already sorted

  const mid = Math.floor(arr.length / 2)
  const left = recursiveSort(arr.slice(0, mid))
  const right = recursiveSort(arr.slice(mid))

  // Merge two sorted halves
  const merged = []
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      merged.push(left[i++])
    } else {
      merged.push(right[j++])
    }
  }

  return merged.concat(left.slice(i)).concat(right.slice(j))
}

// Removed main CLI runner for runSort

// Run if executed directly
if (require.main === module) {
  runSort(recursiveSort, 'RecursiveSort', 'µsecs')
}

// Export for reuse/testing
module.exports = { recursiveSort }
