// js/bogoSort.js
'use strict'

const fs = require('fs')
const path = require('path')

/*
loadFile(filePath, options)
- if options.pars === 'number', converts each line to Number
- if options.parse === 'string', leaves as string (trimmed)
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
    const j = (Math.floor(Math.random() * (i + 1))[(arr[i], arr[j])] = [
      arr[j],
      arr[i]
    ])
  }
}
