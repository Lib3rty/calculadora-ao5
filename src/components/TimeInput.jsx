import React, { useState, useEffect } from 'react'
import { isValidTime } from '../utils/timeCalculator'

export default function TimeInput({ 
  index, 
  time, 
  onChange, 
  error = '' 
}) {
  const [rawValue, setRawValue] = useState('')

  // Sincronizar cuando se reinicia desde el padre
  useEffect(() => {
    if (time.minutes === '' && time.seconds === '' && time.milliseconds === '' && !time.isDNF) {
      setRawValue('')
    }
  }, [time.minutes, time.seconds, time.milliseconds, time.isDNF])

  const handleChange = (e) => {
    const inputVal = e.target.value
    // Extraer solo dígitos
    const digits = inputVal.replace(/\D/g, '')
    
    if (digits === '') {
      setRawValue('')
      onChange(index, { minutes: '', seconds: '', milliseconds: '' })
      return
    }

    // Eliminar ceros a la izquierda
    let cleaned = digits.replace(/^0+/, '')
    if (cleaned === '') {
      cleaned = '0'
    }
    
    // Limitar a 6 dígitos (MMSSMS)
    cleaned = cleaned.slice(0, 6)
    
    setRawValue(cleaned)

    const padded = cleaned.padStart(6, '0')
    const m = padded.slice(0, 2)
    const s = padded.slice(2, 4)
    const ms = padded.slice(4, 6)

    onChange(index, { minutes: m, seconds: s, milliseconds: ms, isDNF: false })
  }

  const toggleDNF = () => {
    if (time.isDNF) {
      onChange(index, { minutes: '', seconds: '', milliseconds: '', isDNF: false })
      setRawValue('')
    } else {
      onChange(index, { minutes: '', seconds: '', milliseconds: '', isDNF: true })
      setRawValue('')
    }
  }

  const formatDisplay = (raw) => {
    if (!raw) return ''
    const length = raw.length
    if (length <= 2) {
      return `0.${raw.padStart(2, '0')}`
    } else if (length <= 4) {
      const s = raw.slice(0, length - 2)
      const ms = raw.slice(-2)
      return `${s}.${ms}`
    } else {
      const m = raw.slice(0, length - 4)
      const s = raw.slice(-4, -2)
      const ms = raw.slice(-2)
      return `${m}:${s}.${ms}`
    }
  }

  const displayValue = time.isDNF ? 'DNF' : formatDisplay(rawValue)
  const isTimeEmpty = rawValue === '' && !time.isDNF
  const isValid = time.isDNF || isTimeEmpty || isValidTime(time.minutes, time.seconds, time.milliseconds)

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Tiempo {index + 1}
      </label>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            disabled={time.isDNF}
            placeholder="0.00"
            className={`w-full px-4 py-3 rounded-lg text-center font-mono text-2xl font-bold bg-gray-800 border-2 transition-colors ${
              !isValid
                ? 'border-red-500 text-red-400 focus:border-red-500' 
                : time.isDNF 
                  ? 'border-red-600 text-red-500 bg-gray-900 cursor-not-allowed opacity-80'
                  : 'border-gray-700 text-white focus:border-blue-500 focus:outline-none'
            }`}
          />
          <button
            type="button"
            onClick={toggleDNF}
            className={`px-4 rounded-lg font-bold border-2 transition-colors flex-shrink-0 ${
              time.isDNF 
                ? 'bg-red-600 border-red-500 text-white' 
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            DNF
          </button>
        </div>
        {!isValid && !isTimeEmpty && !time.isDNF && (
          <span className="text-xs text-red-400 text-center mt-1">Formato inválido (Ej: segundos no pueden ser &gt; 59)</span>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}
