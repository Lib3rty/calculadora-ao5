export const fetchWCAPerson = async (wcaId) => {
  if (!wcaId) return null
  
  try {
    const response = await fetch(`https://www.worldcubeassociation.org/api/v0/persons/${wcaId.trim().toUpperCase()}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Competidor no encontrado. Verifica el WCA ID.')
      }
      throw new Error('Error al conectar con la WCA.')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

/**
 * Obtiene el PR (en ms) de un evento y tipo de resultado específico.
 * @param {Object} wcaData - Respuesta de la API de la WCA
 * @param {String} eventId - ID del evento (ej. '333')
 * @param {String} type - 'average' o 'single'
 * @returns {Number|null} El PR en milisegundos o null si no existe
 */
export const getPRInMs = (wcaData, eventId, type = 'average') => {
  if (!wcaData || !wcaData.personal_records || !wcaData.personal_records[eventId]) {
    return null
  }
  
  const record = wcaData.personal_records[eventId][type]
  if (!record || typeof record.best !== 'number') {
    return null
  }
  
  // Los tiempos de la WCA vienen en centésimas de segundo (1/100 s)
  // 1 centésima = 10 milisegundos
  return record.best * 10
}
