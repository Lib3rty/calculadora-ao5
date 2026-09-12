/**
 * Convierte minutos, segundos y milisegundos a milisegundos totales
 */
export const convertToMs = (minutes, seconds, milliseconds) => {
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
  const msArray = times.map(t => convertToMs(t.minutes, t.seconds, t.milliseconds))
  
  // Crear array con índices para rastrear qué se elimina
  const indexed = msArray.map((ms, idx) => ({ ms, idx }))
  
  // Ordenar para encontrar min y max
  const sorted = [...indexed].sort((a, b) => a.ms - b.ms)
  
  // Min y max son el primero y último del array ordenado
  const minMs = sorted[0].ms
  const maxMs = sorted[4].ms
  const minIdx = indexed.findIndex(x => x.ms === minMs)
  const maxIdx = indexed.findIndex(x => x.ms === maxMs)
  
  // Los 3 del medio son todos excepto min y max
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

/**
 * Valida si los tiempos son válidos
 */
export const isValidTime = (minutes, seconds, milliseconds) => {
  const mm = parseInt(minutes)
  const ss = parseInt(seconds)
  const ms = parseInt(milliseconds)
  
  return !isNaN(mm) && !isNaN(ss) && !isNaN(ms) &&
         mm >= 0 && mm <= 59 &&
         ss >= 0 && ss <= 59 &&
         ms >= 0 && ms <= 99
}

/**
 * Verifica si todos los 5 tiempos están completos
 */
export const areAllTimesComplete = (times) => {
  return times.length === 5 && times.every(t => 
    isValidTime(t.minutes, t.seconds, t.milliseconds)
  )
}
