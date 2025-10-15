// js/bogoSort.js
'use strict'

const fs = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

/*
 * loadFile(filePath, options)
 * - if options.pars === 'number', converts each line to Number
 * - if options.parse === 'string', leaves as string (trimmed)
 */
const loadFile = (filePath, options = { parse: 'number' }) => {
  const abs = path.resolve(filePath)
  const raw = fs.readFileSync(abs, 'utf8')
  const lines = raw.split(/\r?\n/).filter((line) => line.length > 0)
  // To account for files in the numbers directory
  if (options.parse === 'number') {
    return lines.map((line) => {
      const n = Number(line.trim())
      if (Number.isNaN(n)) {
        throw new Error(`Invalid number in file: "${line}"`)
      }
      return n
    })
    // To account for files in the names directory
  } else {
    return lines.map((line) => line.trim())
  }
}

// Fisher-Yates shuffle (in-place)
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    // Because VSCode keeps autoformatting
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

/*
 * bogoSort (in-place)
 * - arr: array to sort (mutated)
 * - options.maxAttempts: stops after that many tries and returns false
 * - returns number of attempts if sorted, or false if maxAttempts reached
 */
const bogoSort = (arr, options = { maxAttempts: 1000000 }) => {
  const max = options.maxAttempts
  if (arr.length <= 1) return 0

  // Quick check: if already sorted, return 0
  if (isSorted(arr)) return 0

  for (let attempt = 1; attempt <= max; attempt++) {
    shuffle(arr)
    if (isSorted(arr)) {
      return attempt
    }
  }
  return false // Did not sort algorithm within max attempts
}

// CLI runner
const main = () => {
  const argv = process.argv.slice(2)
  if (argv.length < 1) {
    console.error('Usage: node js/bogoSort.js <file> [-- strings] [--max=N]')
    process.exit(1)
  }

  const file = argv[0]
  const parseAs = argv.includes('--strings') ? 'string' : 'number'
  const maxArg = argv.find((a) => a.startsWith('--max='))
  const maxAttempts = maxArg ? Number(maxArg.split('=')[1]) : 1000000

  if (maxArg && Number.isNaN(maxAttempts)) {
    console.error('Invalid --max value')
    process.exit(1)
  }

  const arr = loadFile(file, { parse: parseAs })
  console.log(`Loadded ${arr.length} items from ${file}. Starting bogo sort...`)

  // use copy
  const working = arr.slice()

  // start timer
  const start = performance.now()

  const attempts = bogoSort(working, { maxAttempts })

  // Stop timer and compute elapsed seconds correctly
  const end = performance.now()
  const elapsed = (end - start) / 1000

  if (attempts === false) {
    console.log(
      `Gave up after ${maxAttempts} attempts (${elapsed.toFixed(
        3
      )}s). Not sorted.`
    )
  } else {
    console.log(`Sorted after ${attempts} attempts in ${elapsed.toFixed(3)}s.`)
    console.log('Result (first 20 items):', working.slice(0, 20))
  }
}

// Run when executed directly
if (require.main === module) main()

// Export for tests
module.exports = { loadFile, bogoSort, isSorted, shuffle }
