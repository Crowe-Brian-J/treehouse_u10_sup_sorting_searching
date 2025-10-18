const fs = require('fs')
const path = require('path')
const { fileURLToPath } = require('url')

const loadNumbers = (filePath) => {
  const data = fs.readFileSync(path.join(__dirname, filePath), 'utf8')
  return data
    .split(/\r?\n/)
    .map((line) => Number(line))
    .filter((n) => !isNaN(n))
}

const numbersArray = loadNumbers('../numbers/8.txt')

const selectionSort = (arr) => {
  // Create a copy if you want to avoid mutating the original
  const sortedArr = arr.slice()

  for (let i = 0; i < sortedArr.length; i++) {
    let minIndex = i

    // Find the minimum in the unsorted part
    for (let j = i + 1; j < sortedArr.length; j++) {
      if (sortedArr[j] < sortedArr[minIndex]) {
        minIndex = j
      }
    }

    // Swap if a smaller element was found
    if (minIndex !== i) {
      ;[sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]]
    }
  }

  return sortedArr
}

//console.log(selectionSort([5, 2, 4, 1])) // [1, 2, 4, 5]
console.log('Original:', numbersArray)
console.log('Sorted:', selectionSort(numbersArray))
