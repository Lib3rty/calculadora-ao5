import React from 'react'
import { formatTime } from '../utils/timeCalculator'

export default function ScoreCard({ 
  times, 
  result, 
  onNewScorecard 
}) {
  if (!result) return null

  const formatTimeDisplay = (mm, ss, ms) => `${mm}:${ss}.${ms}`

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          📊 Resultado
        </h2>

        {/* Lista de tiempos */}
        <div className="space-y-3 mb-8">
          {times.map((time, idx) => {
            const isRemoved = result.removed.includes(idx)
            const displayTime = formatTimeDisplay(
              String(time.minutes).padStart(2, '0'),
              String(time.seconds).padStart(2, '0'),
              String(time.milliseconds).padStart(2, '0')
            )

            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isRemoved
                    ? 'bg-gray-700 border-gray-600 opacity-50'
                    : 'bg-gray-700 border-green-600'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Tiempo {idx + 1}</p>
                    <p className="text-2xl font-mono font-bold text-white">
                      {displayTime}
                    </p>
                  </div>
                  <div className="text-right">
                    {isRemoved && (
                      <span className="inline-block bg-red-600 text-white text-xs font-bold py-1 px-3 rounded">
                        Eliminado
                      </span>
                    )}
                    {!isRemoved && (
                      <span className="inline-block bg-green-600 text-white text-xs font-bold py-1 px-3 rounded">
                        Usado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Promedio final */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-8 border-2 border-blue-500">
          <p className="text-gray-200 text-sm mb-2">Promedio de los 3 mejores tiempos:</p>
          <p className="text-4xl font-mono font-bold text-white text-center">
            {formatTimeDisplay(
              result.average.minutes,
              result.average.seconds,
              result.average.milliseconds
            )}
          </p>
        </div>

        {/* Información adicional */}
        <div className="bg-gray-700 rounded p-4 mb-6 text-sm text-gray-300">
          <p>
            Se elimina el tiempo más bajo y el más alto.
          </p>
          <p className="mt-2">
            Se promedian los 3 tiempos restantes.
          </p>
        </div>

        {/* Botones */}
        <button
          onClick={onNewScorecard}
          className="w-full py-3 px-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Nueva Scorecard
        </button>
      </div>
    </div>
  )
}
