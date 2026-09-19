/**
 * Convierte minutos, segundos y milisegundos a milisegundos totales
 */
export const convertToMs = (minutes, seconds, milliseconds, isDNF = false) => {
  if (isDNF) return Infinity
  const mm = Math.max(0, Math.min(59, parseInt(minutes) || 0))
  const ss = Math.max(0, Math.min(59, parseInt(seconds) || 0))
  const ms = Math.max(0, Math.min(99, parseInt(milliseconds) || 0))
  
  return mm * 60000 + ss * 1000 + ms * 10
}

/**
 * Convierte milisegundos totales a formato MM:SS.MS
 */
export const convertFromMs = (totalMs) => {
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const milliseconds = Math.round((totalMs % 1000) / 10)
  
  return {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    milliseconds: String(milliseconds).padStart(2, '0')
  }
}

/**
 * Formatea tiempo como MM:SS.MS para mostrar
 */
export const formatTime = (minutes, seconds, milliseconds) => {
  const mm = String(Math.max(0, Math.min(59, parseInt(minutes) || 0))).padStart(2, '0')
  const ss = String(Math.max(0, Math.min(59, parseInt(seconds) || 0))).padStart(2, '0')
  const ms = String(Math.max(0, Math.min(99, parseInt(milliseconds) || 0))).padStart(2, '0')
  
  return `${mm}:${ss}.${ms}`
}

/**
 * Calcula el promedio de 5 tiempos:
 * - Elimina el más bajo y el más alto
 * - Promedia los 3 del medio
 * @param {Array} times - Array de objetos con {minutes, seconds, milliseconds}
 * @returns {Object} {average: {minutes, seconds, milliseconds}, removed: [indices], used: [indices]}
 */
export const calculateAverage = (times) => {
  if (!times || times.length !== 5) {
    return null
  }

  // Convertir todos a milisegundos
  const msArray = times.map(t => convertToMs(t.minutes, t.seconds, t.milliseconds, t.isDNF))
  
  // Crear array con índices para rastrear qué se elimina
  const indexed = msArray.map((ms, idx) => ({ ms, idx }))
  
  // Ordenar para encontrar min y max
  const sorted = [...indexed].sort((a, b) => a.ms - b.ms)
  
  // Min y max son el primero y último del array ordenado
  const minIdx = sorted[0].idx
  const maxIdx = sorted[4].idx
  
  // Los 3 del medio son todos excepto min y max
  const middle = msArray.filter((ms, idx) => idx !== minIdx && idx !== maxIdx)
  const average = middle.reduce((a, b) => a + b, 0) / 3
  
  const removedIndices = [minIdx, maxIdx]
  const usedIndices = indexed.filter(x => !removedIndices.includes(x.idx)).map(x => x.idx)
  
  return {
    type: 'ao5',
    average: average === Infinity ? { isDNF: true } : convertFromMs(average),
    averageMs: average,
    removed: removedIndices,
    used: usedIndices
  }
}

/**
 * Calcula la media de 3 tiempos:
 * - Promedia los 3 tiempos sin eliminar ninguno
 * - Si algún tiempo es DNF, el resultado es DNF
 * @param {Array} times - Array de 3 objetos con {minutes, seconds, milliseconds, isDNF}
 * @returns {Object} {type: 'mo3', average: {minutes, seconds, milliseconds}, removed: [], used: [indices]}
 */
export const calculateMeanOf3 = (times) => {
  if (!times || times.length !== 3) {
    return null
  }

  const msArray = times.map(t => convertToMs(t.minutes, t.seconds, t.milliseconds, t.isDNF))
  
  const hasDNF = msArray.includes(Infinity)
  
  const average = hasDNF ? Infinity : msArray.reduce((a, b) => a + b, 0) / 3
  
  return {
    type: 'mo3',
    average: average === Infinity ? { isDNF: true } : convertFromMs(average),
    averageMs: average,
    removed: [],
    used: [0, 1, 2]
  }
}

/**
 * Valida si los tiempos son válidos
 */
export const isValidTime = (minutes, seconds, milliseconds, isDNF = false) => {
  if (isDNF) return true
  const mm = parseInt(minutes)
  const ss = parseInt(seconds)
  const ms = parseInt(milliseconds)
  
  return !isNaN(mm) && !isNaN(ss) && !isNaN(ms) &&
         mm >= 0 && mm <= 59 &&
         ss >= 0 && ss <= 59 &&
         ms >= 0 && ms <= 99
}

/**
 * Verifica si todos los tiempos están completos
 */
export const areAllTimesComplete = (times, expectedLength = 5) => {
  return times.length === expectedLength && times.every(t => 
    t.isDNF || isValidTime(t.minutes, t.seconds, t.milliseconds)
  )
}
