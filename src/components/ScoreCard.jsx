import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { formatTime, convertFromMs, convertToMs } from '../utils/timeCalculator'

export default function ScoreCard({ 
  times, 
  result, 
  onNewScorecard,
  referenceTime
}) {
  if (!result) return null

  const formatTimeDisplay = (mm, ss, ms) => `${mm}:${ss}.${ms}`

  useEffect(() => {
    if (!referenceTime) return

    const msArray = times.map(t => convertToMs(t.minutes, t.seconds, t.milliseconds, t.isDNF))
    const bestSingleMs = Math.min(...msArray)

    const beatSingle = referenceTime.singleMs && bestSingleMs < referenceTime.singleMs
    const beatAverage = referenceTime.ms && !result.average.isDNF && result.averageMs < referenceTime.ms

    if (beatSingle || beatAverage) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        zIndex: 1000
      })
    }
  }, [result, referenceTime, times])

  const renderComparisonBox = (currentMs, targetMs, label) => {
    if (!targetMs || currentMs === Infinity) return null
    
    const diff = currentMs - targetMs
    const isSuccess = diff < 0
    const absDiff = Math.abs(diff)
    
    const diffTime = convertFromMs(absDiff)
    const diffDisplay = `${diffTime.minutes !== '00' ? diffTime.minutes + ':' : ''}${diffTime.seconds}.${diffTime.milliseconds}`
    
    return (
      <div className={`rounded-lg p-3 mb-3 border-2 flex items-center gap-3 ${
        isSuccess 
          ? 'bg-green-900/30 border-green-500 text-green-100' 
          : 'bg-yellow-900/30 border-yellow-500 text-yellow-100'
      }`}>
        <div className="text-2xl">
          {isSuccess ? '🎉' : '💪'}
        </div>
        <div>
          <p className="font-bold text-sm">
            {label}: {isSuccess ? '¡Rompiste el tiempo!' : '¡Casi lo logras!'}
          </p>
          <p className="text-xs opacity-90">
            {isSuccess ? 'Mejor por ' : 'A '}
            <span className="font-mono font-bold">{diffDisplay}s</span>
          </p>
        </div>
      </div>
    )
  }

  const renderReferenceComparison = () => {
    if (!referenceTime) return null

    const msArray = times.map(t => convertToMs(t.minutes, t.seconds, t.milliseconds, t.isDNF))
    const bestSingleMs = Math.min(...msArray)
    
    return (
      <div className="mb-6">
        {referenceTime.singleMs && renderComparisonBox(bestSingleMs, referenceTime.singleMs, 'Single PR')}
        {referenceTime.ms && renderComparisonBox(result.averageMs, referenceTime.ms, result.type === 'mo3' ? 'Mean PR' : 'Average PR')}
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          📊 Resultado
        </h2>

        {renderReferenceComparison()}

        {/* Lista de tiempos */}
        <div className="space-y-3 mb-8">
          {times.map((time, idx) => {
            const isRemoved = result.removed.includes(idx)
            const displayTime = time.isDNF ? 'DNF' : formatTimeDisplay(
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
          <p className="text-gray-200 text-sm mb-2">
            {result.type === 'mo3' ? 'Media de los 3 tiempos:' : 'Promedio de los 3 mejores tiempos:'}
          </p>
          <p className="text-4xl font-mono font-bold text-white text-center">
            {result.average.isDNF ? 'DNF' : formatTimeDisplay(
              result.average.minutes,
              result.average.seconds,
              result.average.milliseconds
            )}
          </p>
        </div>

        {/* Información adicional */}
        <div className="bg-gray-700 rounded p-4 mb-6 text-sm text-gray-300">
          {result.type === 'mo3' ? (
            <p>Se promedian los 3 tiempos ingresados sin eliminar ninguno.</p>
          ) : (
            <>
              <p>Se elimina el tiempo más bajo y el más alto.</p>
              <p className="mt-2">Se promedian los 3 tiempos restantes.</p>
            </>
          )}
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
