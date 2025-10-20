// js/runSort.js
'use strict'

const { loadFile } = require('./fileUtils')
const { elapsedTime } = require('./timeUtils')

const normalizeUnit = (u) => {
  if (!u) return 'msecs' // fallback default

  const s = String(u).toLowerCase()
  if (['s', 'sec', 'secs', 'second', 'seconds'].includes(s)) return 'secs'
  if (['ms', 'msec', 'msecs', 'millisecond', 'milliseconds'].includes(s))
    return 'msecs'
  if (
    [
      'us',
      'µs',
      'usec',
      'µsec',
      'usecs',
      'µsecs',
      'micro',
      'microsec',
      'microsecs',
      'microseconds'
    ].includes(s)
  )
    return 'µsecs'
  // unknown -> default
  return 'msecs'
}

const runSort = (cb, label = 'Sort Algorithm', unit = 'msecs') => {
  const argv = process.argv.slice(2)
  if (argv.length < 1) {
    console.error(
      `Usage: node js/${label.toLowerCase()}.js <filePath> [--strings]`
    )
    process.exit(1)
  }

  const file = argv[0]
  const parseAs = argv.includes('--strings') ? 'string' : 'number'

  console.log(`Loading ${file} as ${parseAs}...`)
  const arr = loadFile(file, { parse: parseAs }) // important: option name is 'parse'
  console.log(`Loaded ${arr.length} items. Running ${label}...\n`)

  const canonicalUnit = normalizeUnit(unit)

  // elapsedTime expects (fn, unit) and return {result, elapsed, unit}
  const {
    result: sorted,
    elapsed,
    unit: actualUnit
  } = elapsedTime(() => cb(arr), canonicalUnit)

  console.log(
    `Sorted items (only first 25 where applicable):\n`,
    sorted.slice(0, 25)
  )
  console.log(`\n${label} completed in ${elapsed.toFixed(3)} ${actualUnit}`)
}

module.exports = { runSort }
