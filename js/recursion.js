// recursion.js
'use strict'

const fs = require('fs')
const path = require('path')
const { elapsedTime } = require('./timeUtils')

// Load a file (numbers or names)
const loadFile = (filePath, options = { parse: 'number' }) => {
  const abs = path.resolve(filePath)

  // Safety checks with clear errors
  if (!fs.existsSync(abs)) {
    throw new Error(`File not found: ${abs}`)
  }
  const stat = fs.statSync(abs)
  if (!stat.isFile()) {
    throw new Error(`Expected a file but got something else: ${abs}`)
  }

  // Read explicitly as utf8 to ensure string
  const raw = fs.readFileSync(abs, 'utf8')

  // Debugging/logging - remove or comment out after things work
  // console.log('DEBUG loadFile: type of raw =', typeof raw)
  // console.log('DEBUG first 200 chars:', raw.slice(0, 200))

  if (typeof raw !== 'string') {
    throw new Error(`Unexpected data type from fs.readFileSync: ${typeof raw}`)
  }

  const lines = raw.split(/\r?\n/).filter((line) => line.length > 0)

  if (!Array.isArray(lines)) {
    throw new Error(
      'Internal error: expected lines to be an array after split/filter'
    )
  }

  if (options.parse === 'number') {
    return lines.map((line) => {
      const n = Number(line.trim())
      if (Number.isNaN(n)) {
        throw new Error(`Invalid number in file: "${line}"`)
      }
      return n
    })
  } else {
    return lines.map((line) => line.trim())
  }
}

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

// Main runner
const main = () => {
  const argv = process.argv.slice(2)
  if (argv.length < 1) {
    console.error('Usage: node recursiveSort.js <file> [--strings] [--limit=N]')
    process.exit(1)
  }

  const file = argv[0]
  const parseAs = argv.includes('--strings') ? 'string' : 'number'
  const limitArg = argv.find((a) => a.startsWith('--limit='))
  const limit = limitArg ? Number(limitArg.split('=')[1]) : undefined

  const arr = loadFile(file, { parse: parseAs })
  const arrToSort = limit ? arr.slice(0, limit) : arr

  const {
    result: sorted,
    elapsed,
    unit
  } = elapsedTime(() => recursiveSort(arrToSort), 'msecs')

  console.log(`Original (first ${limit || arr.length} items):`, arrToSort)
  console.log(`Sorted (first ${limit || arr.length} items):`, sorted)
  console.log(`Elapsed time: ${elapsed.toFixed(3)} ${unit}`)
}

// Run if executed directly
if (require.main === module) main()

// Export for reuse/testing
module.exports = { loadFile, recursiveSort }
