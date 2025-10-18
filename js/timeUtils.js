const { performance } = require('perf_hooks')

const elapsedTime = (cb, unit = 'µsecs') => {
  const start = performance.now()
  const result = cb()
  const end = performance.now()
  let elapsed = end - start

  if (unit === 'µsecs') elapsed *= 1000

  return { result, elapsed }
}

module.exports = { elapsedTime }
