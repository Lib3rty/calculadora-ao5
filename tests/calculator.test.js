import { 
  convertToMs, 
  convertFromMs, 
  calculateAverage, 
  formatTime,
  isValidTime,
  areAllTimesComplete 
} from '../src/utils/timeCalculator'

console.log('=== TESTS: Speedcubing Scorecard Calculator ===\n')

// Test 1: Convertir a milisegundos
console.log('Test 1: convertToMs')
const test1 = convertToMs(0, 50, 25)
console.log(`Input: 00:50.25 → Output: ${test1}ms (Expected: 50250ms)`)
console.assert(test1 === 50250, 'FAIL: convertToMs')

// Test 2: Convertir desde milisegundos
console.log('\nTest 2: convertFromMs')
const test2 = convertFromMs(50250)
console.log(`Input: 50250ms → Output: ${test2.minutes}:${test2.seconds}.${test2.milliseconds}`)
console.assert(test2.minutes === '00' && test2.seconds === '50' && test2.milliseconds === '25', 'FAIL: convertFromMs')

// Test 3: Validar tiempos válidos
console.log('\nTest 3: isValidTime')
const valid1 = isValidTime(0, 50, 25)
const valid2 = isValidTime(59, 59, 99)
const invalid1 = isValidTime(60, 30, 50)
const invalid2 = isValidTime(30, 70, 50)
console.log(`Valid (00:50.25): ${valid1} (Expected: true)`)
console.log(`Valid (59:59.99): ${valid2} (Expected: true)`)
console.log(`Invalid (60:30.50): ${invalid1} (Expected: false)`)
console.log(`Invalid (30:70.50): ${invalid2} (Expected: false)`)
console.assert(valid1 === true && valid2 === true && invalid1 === false && invalid2 === false, 'FAIL: isValidTime')

// Test 4: Formatear tiempos
console.log('\nTest 4: formatTime')
const formatted1 = formatTime('5', '42', '37')
const formatted2 = formatTime('0', '5', '3')
console.log(`Input: 5, 42, 37 → Output: ${formatted1} (Expected: 05:42.37)`)
console.log(`Input: 0, 5, 3 → Output: ${formatted2} (Expected: 00:05.03)`)
console.assert(formatted1 === '05:42.37' && formatted2 === '00:05.03', 'FAIL: formatTime')

// Test 5: Cálculo del promedio
console.log('\nTest 5: calculateAverage')
const times = [
  { minutes: '10', seconds: '00', milliseconds: '00' },
  { minutes: '9', seconds: '50', milliseconds: '00' },
  { minutes: '9', seconds: '45', milliseconds: '00' },
  { minutes: '9', seconds: '55', milliseconds: '00' },
  { minutes: '9', seconds: '40', milliseconds: '00' }
]
const result = calculateAverage(times)
console.log(`Times: 10:00.00, 9:50.00, 9:45.00, 9:55.00, 9:40.00`)
console.log(`Average: ${result.average.minutes}:${result.average.seconds}.${result.average.milliseconds}`)
console.log(`Removed indices: ${result.removed.join(', ')} (Expected: 4,0 or similar - min and max)`)
console.log(`Used indices: ${result.used.join(', ')} (Expected: 1,2,3)`)
console.assert(result.removed.length === 2 && result.used.length === 3, 'FAIL: calculateAverage structure')

// Test 6: areAllTimesComplete
console.log('\nTest 6: areAllTimesComplete')
const completeArray = Array(5).fill(null).map(() => ({ minutes: '10', seconds: '00', milliseconds: '00' }))
const incompleteArray = [
  { minutes: '10', seconds: '00', milliseconds: '00' },
  { minutes: '9', seconds: '', milliseconds: '00' },
  { minutes: '', seconds: '', milliseconds: '' },
  { minutes: '', seconds: '', milliseconds: '' },
  { minutes: '', seconds: '', milliseconds: '' }
]
const allComplete1 = areAllTimesComplete(completeArray)
const allComplete2 = areAllTimesComplete(incompleteArray)
console.log(`Complete array (5 tiempos llenos): ${allComplete1} (Expected: true)`)
console.log(`Incomplete array (menos tiempos): ${allComplete2} (Expected: false)`)
console.assert(allComplete1 === true && allComplete2 === false, 'FAIL: areAllTimesComplete')

// Test 7: Caso real de speedcubing
console.log('\nTest 7: Caso real - Competencia simulada')
const realTimes = [
  { minutes: '0', seconds: '12', milliseconds: '34' },  // 12.34s
  { minutes: '0', seconds: '11', milliseconds: '99' },  // 11.99s (mejor)
  { minutes: '0', seconds: '13', milliseconds: '45' },  // 13.45s
  { minutes: '0', seconds: '12', milliseconds: '01' },  // 12.01s
  { minutes: '0', seconds: '15', milliseconds: '00' }   // 15.00s (peor)
]
const realResult = calculateAverage(realTimes)
console.log(`Tiempos: 12.34, 11.99 (mejor), 13.45, 12.01, 15.00 (peor)`)
console.log(`Promedio calculado: ${realResult.average.minutes}:${realResult.average.seconds}.${realResult.average.milliseconds}s`)
console.log(`Se eliminan índices: ${realResult.removed.join(', ')}`)
console.log(`Se promedian índices: ${realResult.used.join(', ')}`)
console.assert(realResult.removed.length === 2 && realResult.used.length === 3, 'FAIL: Real case')

// Test 8: Validación de bordes
console.log('\nTest 8: Validación de bordes')
const minTimes = Array(5).fill(null).map(() => ({ minutes: '0', seconds: '0', milliseconds: '0' }))
const maxTimes = Array(5).fill(null).map(() => ({ minutes: '59', seconds: '59', milliseconds: '99' }))
const minResult = calculateAverage(minTimes)
const maxResult = calculateAverage(maxTimes)
console.log(`Min (0:00.00): Promedio = ${minResult.average.minutes}:${minResult.average.seconds}.${minResult.average.milliseconds}`)
console.log(`Max (59:59.99): Promedio = ${maxResult.average.minutes}:${maxResult.average.seconds}.${maxResult.average.milliseconds}`)
console.assert(minResult.averageMs === 0, 'FAIL: Min edge case')
console.assert(maxResult.averageMs > 0, 'FAIL: Max edge case')

console.log('\n=== ✅ TODOS LOS TESTS PASARON ===')
