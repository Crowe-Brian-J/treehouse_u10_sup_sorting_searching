// js/selectionSort.js
'use strict'

// Utilities
const { elapsedTime } = require('./timeUtils')
const { loadFile } = require('./fileUtils')

const numbersArray = loadFile('numbers/8.txt', { parse: 'number' })
const namesArray = loadFile('names/unsorted.txt', { parse: 'string' })

const selectionSort = (arr) => {
  // Create a copy if you want to avoid mutating the original
  const sortedArr = arr.slice()
  let comparisons = 0
  let swaps = 0

  for (let i = 0; i < sortedArr.length; i++) {
    let minIndex = i

    // Find the minimum in the unsorted part
    for (let j = i + 1; j < sortedArr.length; j++) {
      comparisons++
      if (sortedArr[j] < sortedArr[minIndex]) {
        minIndex = j
      }
    }

    // Swap if a smaller element was found
    if (minIndex !== i) {
      ;[sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]]
      swaps++
    }
  }

  return { sortedArr, comparisons, swaps }
}

// console.log(selectionSort([5, 2, 4, 1])) // [1, 2, 4, 5]

//Log numbers
const {
  result: numbersResult,
  elapsed: numbersElapsed,
  unit: numbersUnit
} = elapsedTime(() => selectionSort(numbersArray), 'µsecs')

console.log('Original:', numbersArray)
console.log('Sorted:', numbersResult.sortedArr)
console.log(
  `Numbers - Comparisons: ${numbersResult.comparisons}, Swaps: ${numbersResult.swaps}`
)
console.log(`Numbers sort took ${numbersElapsed.toFixed(3)} ${numbersUnit}`)

// Log names
const {
  result: namesResult,
  elapsed: namesElapsed,
  namesUnit
} = elapsedTime(() => selectionSort(namesArray.slice(0, 25)), 'µsecs')

console.log('Original Names List:', namesArray.slice(0, 25))
console.log('Sorted Names List:', namesResult.sortedArr)
console.log(
  `Names - Comparisons: ${namesResult.comparisons}, Swaps: ${namesResult.swaps}`
)
console.log(`Names sort took ${namesElapsed.toFixed(3)} ${namesUnit}`)
