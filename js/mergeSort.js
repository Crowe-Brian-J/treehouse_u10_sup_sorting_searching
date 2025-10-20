// js/mergeSort.js
'use strict'

const { runSort } = require('./runSort')

// Merge helper function
const merge = (left, right) => {
  const result = []
  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }

  // Append any remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j))
}

// Uses recursion
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr // Base Case

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}

if (require.main === module) {
  runSort(mergeSort, 'MergeSort', 'msecs')
}

module.exports = { mergeSort }
