// js/bogoSort.js
'use strict'

// Utilities
const { runSort } = require('./runSort')

// Fisher-Yates shuffle (in-place)
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
}

// Test if the array is sorted
const isSorted = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false
  }
  return true
}

const bogoSort = (arr, options = { maxAttempts: 10000 }) => {
  const max = options.maxAttempts
  if (arr.length <= 1) return 0

  if (isSorted(arr)) return 0

  for (let attempt = 1; attempt <= max; attempt++) {
    shuffle(arr)
    if (isSorted(arr)) {
      return attempt
    }
  }
  return false
}

// CLI runner
if (require.main === module) {
  runSort(
    (arr) => {
      const working = arr.slice()
      bogoSort(working, { maxAttempts: 100000 })
      return working // now runSort can safely slice
    },
    'BogoSort',
    'msecs'
  )
}

// Export for tests
module.exports = { bogoSort, isSorted, shuffle }
