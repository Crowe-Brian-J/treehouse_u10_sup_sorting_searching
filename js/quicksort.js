// js/quicksort.js

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

console.log(quickSort([5, 3, 7, 2, 8, 1])) // Output: [1, 2, 3, 5, 7, 8]
