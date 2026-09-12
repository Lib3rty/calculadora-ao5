import React from 'react'
import TimeInput from './TimeInput'
import { areAllTimesComplete } from '../utils/timeCalculator'

export default function TimerForm({ 
  times, 
  onTimeChange, 
  onCalculate,
  loading = false
}) {
  const allComplete = areAllTimesComplete(times)

  const handleReset = () => {
    const emptyTimes = Array(5).fill(null).map(() => ({
      minutes: '',
      seconds: '',
      milliseconds: ''
    }))
    times.forEach((_, idx) => onTimeChange(idx, emptyTimes[idx]))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Ingresa tus 5 Tiempos
        </h2>

        <div className="space-y-4">
          {times.map((time, idx) => (
            <TimeInput
              key={idx}
              index={idx}
              time={time}
              onChange={onTimeChange}
            />
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onCalculate}
            disabled={!allComplete || loading}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-colors ${
              allComplete && !loading
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Calculando...' : 'Calcular Promedio'}
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition-colors ${
              loading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600 cursor-pointer'
            }`}
          >
            Limpiar
          </button>
        </div>

        <div className="mt-4 p-3 bg-gray-700 rounded text-center text-sm text-gray-300">
          <p>
            {!allComplete 
              ? `Falta ingresar ${5 - times.filter(t => 
                  t.minutes !== '' && t.seconds !== '' && t.milliseconds !== ''
                ).length} tiempo(s)`
              : '✓ Todos los tiempos ingresados'}
          </p>
        </div>
      </div>
    </div>
  )
}
