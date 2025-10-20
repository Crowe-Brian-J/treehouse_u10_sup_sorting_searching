// js/fileUtils.js
'use strict'

const fs = require('fs')
const path = require('path')

const loadFile = (filePath, options = { parse: 'number' }) => {
  const base = path.resolve(__dirname, '..') // js/.. -> root directory
  const absPath = path.resolve(base, filePath)

  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`)
  }

  const raw = fs.readFileSync(absPath, 'utf8')
  const lines = raw.split(/\r?\n/).filter((line) => line.length > 0)

  if (options.parse === 'number') {
    return lines.map((line) => {
      const n = Number(line.trim())
      if (Number.isNaN(n)) {
        throw new Error(`Invalid number in file: ${line}`)
      }
      return n
    })
  }

  return lines.map((line) => line.trim())
}

module.exports = { loadFile }
