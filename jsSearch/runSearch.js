// jsSearch/runSearch.js
'use strict'

const { loadFile } = require('../js/fileUtils')
const { elapsedTime } = require('../js/timeUtils')

const normalizeUnit = (u) => {
  if (!u) return 'µsecs' // fallback default

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
  return 'µsecs'
}

const runSearch = (cb, label = 'Search Algorithm', unit = 'µsecs') => {
  const argv = process.argv.slice(2)
  if (argv.length < 2) {
    console.error(
      `Usage: node jsSearch/${label.toLowerCase()}.js <filePath> <target> [--strings]`
    )
    process.exit(1)
  }

  const file = argv[0]
  let target = argv[1]
  const parseAs = argv.includes('--strings') ? 'string' : 'number'

  console.log(`Loading ${file} as ${parseAs}...`)
  const arr = loadFile(file, { parse: parseAs }) //option name is 'parse'
  console.log(`Loaded ${arr.length} items. Running ${label}...\n`)

  // Convert target if parsing numbers
  if (parseAs === 'number') target = Number(target)

  const canonicalUnit = normalizeUnit(unit)

  // elapsedTime expects (fn, unit) and return {result, elapsed, unit}
  const {
    result: index,
    elapsed,
    unit: actualUnit
  } = elapsedTime(() => cb(arr, target), canonicalUnit)

  console.log(`Search Target: ${target}`)
  console.log(
    index !== null
      ? `Found at index: ${index}`
      : `Target not found in collection.`
  )

  console.log(`\n${label} completed in ${elapsed.toFixed(3)} ${actualUnit}`)
}

module.exports = { runSearch }
