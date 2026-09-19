import React, { useState, useEffect } from 'react'
import TimerForm from './components/TimerForm'
import ScoreCard from './components/ScoreCard'
import ReferenceConfig from './components/ReferenceConfig'
import { calculateAverage, calculateMeanOf3 } from './utils/timeCalculator'

function App() {
  const [times, setTimes] = useState([
    { minutes: '', seconds: '', milliseconds: '', isDNF: false },
    { minutes: '', seconds: '', milliseconds: '', isDNF: false },
    { minutes: '', seconds: '', milliseconds: '', isDNF: false },
    { minutes: '', seconds: '', milliseconds: '', isDNF: false },
    { minutes: '', seconds: '', milliseconds: '', isDNF: false }
  ])

  const [mode, setMode] = useState('ao5')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const [referenceTime, setReferenceTime] = useState(null)
  const [savedWcaConfig, setSavedWcaConfig] = useState({ wcaId: '', event: '333' })

  // Cargar último resultado y config del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('lastScorecard')
    if (saved) {
      try {
        const { times: savedTimes, result: savedResult, mode: savedMode } = JSON.parse(saved)
        setTimes(savedTimes)
        setResult(savedResult)
        if (savedMode) setMode(savedMode)
      } catch (err) {
        console.log('No hay scorecard guardada')
      }
    }
    
    const savedWca = localStorage.getItem('wcaConfig')
    if (savedWca) {
      try {
        setSavedWcaConfig(JSON.parse(savedWca))
      } catch (err) {}
    }
  }, [])

  const handleReferenceChange = (ref) => {
    setReferenceTime(ref)
    if (ref && ref.type === 'wca') {
      const newConfig = { wcaId: ref.wcaId, event: ref.event }
      setSavedWcaConfig(newConfig)
      localStorage.setItem('wcaConfig', JSON.stringify(newConfig))
    }
  }

  const handleTimeChange = (idx, newTime) => {
    const newTimes = [...times]
    newTimes[idx] = newTime
    setTimes(newTimes)
  }

  const handleCalculate = () => {
    setLoading(true)
    
    // Simular pequeña animación/delay
    setTimeout(() => {
      const calculatedResult = mode === 'mo3' ? calculateMeanOf3(times) : calculateAverage(times)
      setResult(calculatedResult)
      
      // Guardar en localStorage
      localStorage.setItem('lastScorecard', JSON.stringify({
        times,
        result: calculatedResult,
        mode
      }))
      
      setLoading(false)
    }, 300)
  }

  const handleNewScorecard = (newMode = mode) => {
    const length = newMode === 'ao5' ? 5 : 3
    const emptyTimes = Array(length).fill(null).map(() => ({
      minutes: '',
      seconds: '',
      milliseconds: '',
      isDNF: false
    }))
    setTimes(emptyTimes)
    setResult(null)
    setMode(newMode)
    localStorage.removeItem('lastScorecard')
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 whitespace-nowrap">
            Calculadora WCA
          </h1>
          <p className="text-gray-400">
            Calcula tu promedio de tus solves
          </p>
        </div>

        {/* Selector de Modo */}
        {!result && (
          <div className="flex justify-center mb-8 bg-gray-800 rounded-lg p-1 max-w-xs mx-auto border border-gray-700">
            <button
              onClick={() => handleNewScorecard('ao5')}
              className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
                mode === 'ao5' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
              }`}
            >
              Average of 5
            </button>
            <button
              onClick={() => handleNewScorecard('mo3')}
              className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
                mode === 'mo3' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
              }`}
            >
              Mean of 3
            </button>
          </div>
        )}

        {/* Contenido principal */}
        {!result ? (
          <>
            <ReferenceConfig 
              onReferenceChange={handleReferenceChange} 
              initialWcaId={savedWcaConfig.wcaId}
              initialEvent={savedWcaConfig.event}
              mode={mode}
            />
            <TimerForm
              times={times}
              onTimeChange={handleTimeChange}
              onCalculate={handleCalculate}
              loading={loading}
            />
          </>
        ) : (
          <ScoreCard
            times={times}
            result={result}
            onNewScorecard={handleNewScorecard}
            referenceTime={referenceTime}
          />
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">
            Funciona sin conexión después de la primera carga
          </p>
          <p className="font-semibold">
            Powered by <a href="https://instagram.com/lib3rtty" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Lib3rty</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
