import React, { useState, useEffect } from 'react'
import { WCA_EVENTS } from '../utils/events'
import { fetchWCAPerson, getPRInMs } from '../services/wcaApi'
import { formatTime, convertFromMs, convertToMs, isValidTime } from '../utils/timeCalculator'

export default function ReferenceConfig({ 
  onReferenceChange, 
  initialWcaId = '', 
  initialEvent = '333',
  mode = 'ao5'
}) {
  const [wcaId, setWcaId] = useState(initialWcaId)
  const [selectedEvent, setSelectedEvent] = useState(initialEvent)
  const [wcaData, setWcaData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Modo de configuración: 'wca' o 'manual'
  const [configMode, setConfigMode] = useState('wca')
  
  // Tiempos manuales
  const [manualTime, setManualTime] = useState({ minutes: '', seconds: '', milliseconds: '' })

  const handleFetchWCA = async () => {
    if (!wcaId.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await fetchWCAPerson(wcaId)
      setWcaData(data)
      updateReference(data, selectedEvent)
    } catch (err) {
      setError(err.message)
      setWcaData(null)
      onReferenceChange(null)
    } finally {
      setLoading(false)
    }
  }

  // Cargar WCA data si ya había un ID inicial guardado
  useEffect(() => {
    if (initialWcaId && !wcaData) {
      handleFetchWCA()
    }
  }, [])

  const updateReference = (data, eventId) => {
    if (!data) {
      onReferenceChange(null)
      return
    }
    
    // Si el modo actual es mo3, buscamos el PR "mean" (la WCA devuelve mean como 'average')
    // Nota: La API WCA retorna 'average' para los promedios, tanto si es ao5 como mo3.
    // Obtenemos average y single
    const prMs = getPRInMs(data, eventId, 'average')
    const singleMs = getPRInMs(data, eventId, 'single')
    
    if (prMs || singleMs) {
      onReferenceChange({
        type: 'wca',
        ms: prMs,
        singleMs: singleMs,
        wcaId: data.person.id,
        event: eventId
      })
    } else {
      onReferenceChange(null)
    }
  }

  const handleEventChange = (e) => {
    const newEvent = e.target.value
    setSelectedEvent(newEvent)
    if (wcaData) {
      updateReference(wcaData, newEvent)
    }
  }

  const handleManualChange = (field, value) => {
    // Extraer solo dígitos, límite 2
    let digits = value.replace(/\D/g, '').slice(0, 2)
    const newManualTime = { ...manualTime, [field]: digits }
    setManualTime(newManualTime)
    
    if (isValidTime(newManualTime.minutes || '0', newManualTime.seconds || '0', newManualTime.milliseconds || '0')) {
      const ms = convertToMs(newManualTime.minutes, newManualTime.seconds, newManualTime.milliseconds)
      if (ms > 0) {
        onReferenceChange({
          type: 'manual',
          ms: ms,
          wcaId: null,
          event: null
        })
      } else {
        onReferenceChange(null)
      }
    } else {
      onReferenceChange(null)
    }
  }

  // Effect to switch to manual reference if changing to manual mode
  useEffect(() => {
    if (configMode === 'manual') {
      const ms = convertToMs(manualTime.minutes, manualTime.seconds, manualTime.milliseconds)
      if (ms > 0) {
        onReferenceChange({ type: 'manual', ms })
      } else {
        onReferenceChange(null)
      }
    } else if (configMode === 'wca') {
      updateReference(wcaData, selectedEvent)
    }
  }, [configMode])

  const prMs = wcaData ? getPRInMs(wcaData, selectedEvent, 'average') : null
  const prDisplay = prMs ? (() => {
    const t = convertFromMs(prMs)
    return formatTime(t.minutes, t.seconds, t.milliseconds)
  })() : null

  const singleMs = wcaData ? getPRInMs(wcaData, selectedEvent, 'single') : null
  const singleDisplay = singleMs ? (() => {
    const t = convertFromMs(singleMs)
    return formatTime(t.minutes, t.seconds, t.milliseconds)
  })() : null

  return (
    <div className="w-full max-w-md mx-auto mb-6 bg-gray-800 rounded-lg p-5 shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Tiempo a Vencer</h3>
        <div className="flex bg-gray-900 rounded-md p-1 border border-gray-700">
          <button 
            onClick={() => setConfigMode('wca')}
            className={`px-3 py-1 text-xs font-semibold rounded ${configMode === 'wca' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
          >
            WCA
          </button>
          <button 
            onClick={() => setConfigMode('manual')}
            className={`px-3 py-1 text-xs font-semibold rounded ${configMode === 'manual' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
          >
            Manual
          </button>
        </div>
      </div>

      {configMode === 'wca' ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Tu WCA ID" 
              value={wcaId}
              onChange={(e) => setWcaId(e.target.value.toUpperCase())}
              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono uppercase"
            />
            <button 
              onClick={handleFetchWCA}
              disabled={loading || !wcaId.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold disabled:bg-gray-700 transition-colors"
            >
              {loading ? '...' : 'Buscar'}
            </button>
          </div>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          {wcaData && (
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-300 font-semibold mb-2">
                👤 {wcaData.person.name}
              </p>
              
              <div className="flex gap-2 items-center">
                <select 
                  value={selectedEvent}
                  onChange={handleEventChange}
                  className="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg block p-2"
                >
                  {WCA_EVENTS.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.name}</option>
                  ))}
                </select>
                
                <div className="flex-1 flex flex-col items-end">
                  {singleDisplay && (
                    <div className="flex justify-between w-full max-w-[140px] items-baseline">
                      <span className="text-xs text-gray-400 block uppercase">Single PR:</span>
                      <span className="text-sm font-mono font-bold text-green-300">{singleDisplay}</span>
                    </div>
                  )}
                  {prDisplay ? (
                    <div className="flex justify-between w-full max-w-[140px] items-baseline mt-1">
                      <span className="text-xs text-gray-400 block uppercase">Avg PR:</span>
                      <span className="text-lg font-mono font-bold text-green-400">{prDisplay}</span>
                    </div>
                  ) : (
                    !singleDisplay && <span className="text-sm text-gray-400">Sin PR oficial</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-900 rounded-lg border border-gray-700 px-3 py-2 flex-1">
            <input 
              type="text" 
              value={manualTime.minutes}
              onChange={(e) => handleManualChange('minutes', e.target.value)}
              placeholder="00"
              className="w-10 bg-transparent text-white text-center font-mono font-bold focus:outline-none"
            />
            <span className="text-gray-400 font-bold">:</span>
            <input 
              type="text" 
              value={manualTime.seconds}
              onChange={(e) => handleManualChange('seconds', e.target.value)}
              placeholder="00"
              className="w-10 bg-transparent text-white text-center font-mono font-bold focus:outline-none"
            />
            <span className="text-gray-400 font-bold">.</span>
            <input 
              type="text" 
              value={manualTime.milliseconds}
              onChange={(e) => handleManualChange('milliseconds', e.target.value)}
              placeholder="00"
              className="w-10 bg-transparent text-white text-center font-mono font-bold focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}
