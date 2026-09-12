#!/usr/bin/env node

/**
 * Test Suite para Speedcubing Scorecard Calculator
 * Ejecutar manualmente sin depender de npm/Node.js global
 */

// Importar funciones a testear
function convertToMs(minutes, seconds, milliseconds) {
  const mm = Math.max(0, Math.min(59, parseInt(minutes) || 0))
  const ss = Math.max(0, Math.min(59, parseInt(seconds) || 0))
  const ms = Math.max(0, Math.min(99, parseInt(milliseconds) || 0))
  
  return mm * 60000 + ss * 1000 + ms * 10
}

function convertFromMs(totalMs) {
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const milliseconds = Math.round((totalMs % 1000) / 10)
  
  return {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    milliseconds: String(milliseconds).padStart(2, '0')
  }
}

function formatTime(minutes, seconds, milliseconds) {
  const mm = String(Math.max(0, Math.min(59, parseInt(minutes) || 0))).padStart(2, '0')
  const ss = String(Math.max(0, Math.min(59, parseInt(seconds) || 0))).padStart(2, '0')
  const ms = String(Math.max(0, Math.min(99, parseInt(milliseconds) || 0))).padStart(2, '0')
  
  return `${mm}:${ss}.${ms}`
}

function isValidTime(minutes, seconds, milliseconds) {
  const mm = parseInt(minutes)
  const ss = parseInt(seconds)
  const ms = parseInt(milliseconds)
  
  return !isNaN(mm) && !isNaN(ss) && !isNaN(ms) &&
         mm >= 0 && mm <= 59 &&
         ss >= 0 && ss <= 59 &&
         ms >= 0 && ms <= 99
}

function areAllTimesComplete(times) {
  return times.length === 5 && times.every(t => 
    isValidTime(t.minutes, t.seconds, t.milliseconds)
  )
}

function calculateAverage(times) {
  if (!times || times.length !== 5) {
    return null
  }

  const msArray = times.map(t => convertToMs(t.minutes, t.seconds, t.milliseconds))
  const indexed = msArray.map((ms, idx) => ({ ms, idx }))
  const sorted = [...indexed].sort((a, b) => a.ms - b.ms)
  
  const minMs = sorted[0].ms
  const maxMs = sorted[4].ms
  const minIdx = indexed.findIndex(x => x.ms === minMs)
  const maxIdx = indexed.findIndex(x => x.ms === maxMs)
  
  const middle = msArray.filter((ms, idx) => idx !== minIdx && idx !== maxIdx)
  const average = middle.reduce((a, b) => a + b, 0) / 3
  
  const removedIndices = [minIdx, maxIdx]
  const usedIndices = indexed.filter(x => !removedIndices.includes(x.idx)).map(x => x.idx)
  
  return {
    average: convertFromMs(average),
    averageMs: average,
    removed: removedIndices,
    used: usedIndices
  }
}

// Tests
let passCount = 0
let failCount = 0

function assert(condition, message) {
  if (condition) {
    console.log(`✅ ${message}`)
    passCount++
  } else {
    console.log(`❌ ${message}`)
    failCount++
  }
}

console.log('🧪 TESTS: Speedcubing Scorecard Calculator\n')

// Test 1
const test1 = convertToMs(0, 50, 25)
assert(test1 === 50250, 'Test 1: convertToMs(0, 50, 25) === 50250')

// Test 2
const test2 = convertFromMs(50250)
assert(test2.minutes === '00' && test2.seconds === '50' && test2.milliseconds === '25', 
  'Test 2: convertFromMs(50250) === 00:50.25')

// Test 3
assert(isValidTime(0, 50, 25) === true, 'Test 3a: isValidTime(0, 50, 25) === true')
assert(isValidTime(59, 59, 99) === true, 'Test 3b: isValidTime(59, 59, 99) === true')
assert(isValidTime(60, 30, 50) === false, 'Test 3c: isValidTime(60, 30, 50) === false')

// Test 4
assert(formatTime('5', '42', '37') === '05:42.37', 'Test 4a: formatTime(5, 42, 37) === 05:42.37')
assert(formatTime('0', '5', '3') === '00:05.03', 'Test 4b: formatTime(0, 5, 3) === 00:05.03')

// Test 5 - Caso real
const times = [
  { minutes: '10', seconds: '00', milliseconds: '00' },
  { minutes: '9', seconds: '50', milliseconds: '00' },
  { minutes: '9', seconds: '45', milliseconds: '00' },
  { minutes: '9', seconds: '55', milliseconds: '00' },
  { minutes: '9', seconds: '40', milliseconds: '00' }
]
const result = calculateAverage(times)
assert(result.removed.length === 2, 'Test 5a: calculateAverage elimina 2 tiempos')
assert(result.used.length === 3, 'Test 5b: calculateAverage usa 3 tiempos')
assert(result.average !== null, 'Test 5c: calculateAverage retorna resultado')

// Test 6
const complete = Array(5).fill(null).map(() => ({ minutes: '10', seconds: '00', milliseconds: '00' }))
const incomplete = [{ minutes: '10', seconds: '', milliseconds: '00' }]
assert(areAllTimesComplete(complete) === true, 'Test 6a: areAllTimesComplete con 5 tiempos válidos')
assert(areAllTimesComplete(incomplete) === false, 'Test 6b: areAllTimesComplete con tiempos incompletos')

// Test 7 - Speedcubing real
const cubing = [
  { minutes: '0', seconds: '12', milliseconds: '34' },
  { minutes: '0', seconds: '11', milliseconds: '99' },
  { minutes: '0', seconds: '13', milliseconds: '45' },
  { minutes: '0', seconds: '12', milliseconds: '01' },
  { minutes: '0', seconds: '15', milliseconds: '00' }
]
const cubingResult = calculateAverage(cubing)
assert(cubingResult.averageMs > 0, 'Test 7: Caso real de speedcubing calcula promedio > 0')

console.log(`\n📊 Resultados: ${passCount} pasados, ${failCount} fallidos`)

if (failCount === 0) {
  console.log('✅ TODOS LOS TESTS PASARON')
  process.exit(0)
} else {
  console.log('❌ ALGUNOS TESTS FALLARON')
  process.exit(1)
}
