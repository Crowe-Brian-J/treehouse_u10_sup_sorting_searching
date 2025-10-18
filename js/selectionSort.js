const fs = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

const loadNumbers = (filePath) => {
  const data = fs.readFileSync(path.join(__dirname, filePath), 'utf8')
  return data
    .split(/\r?\n/)
    .map((line) => Number(line))
    .filter((n) => !isNaN(n))
}

const loadNames = (filePath) => {
  return fs
    .readFileSync(path.join(__dirname, filePath), 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
}

const numbersArray = loadNumbers('../numbers/8.txt')
const namesArray = loadNames('../names/unsorted.txt')

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
const numbersStart = performance.now()
const numbersResult = selectionSort(numbersArray)
const numbersEnd = performance.now()
const numbersElapsed = (numbersEnd - numbersStart) * 1000
console.log('Original:', numbersArray)
console.log('Sorted:', numbersResult.sortedArr)
console.log(
  `Numbers - Comparisons: ${numbersResult.comparisons}, Swaps: ${numbersResult.swaps}`
)
console.log(`Numbers sort took ${numbersElapsed} microseconds`)

// Log names
const namesStart = performance.now()
const namesResult = selectionSort(namesArray.slice(0, 25))
const namesEnd = performance.now()
const namesElapsed = (namesEnd - namesStart) * 1000
console.log('Original Names List:', namesArray.slice(0, 25))
console.log('Sorted Names List:', namesResult.sortedArr)
console.log(
  `Names - Comparisons: ${namesResult.comparisons}, Swaps: ${namesResult.swaps}`
)
console.log(`Names sort took ${namesElapsed} microseconds`)
