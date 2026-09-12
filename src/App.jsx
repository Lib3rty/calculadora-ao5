import React, { useState, useEffect } from 'react'
import TimerForm from './components/TimerForm'
import ScoreCard from './components/ScoreCard'
import { calculateAverage } from './utils/timeCalculator'

function App() {
  const [times, setTimes] = useState([
    { minutes: '', seconds: '', milliseconds: '' },
    { minutes: '', seconds: '', milliseconds: '' },
    { minutes: '', seconds: '', milliseconds: '' },
    { minutes: '', seconds: '', milliseconds: '' },
    { minutes: '', seconds: '', milliseconds: '' }
  ])

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  // Cargar último resultado del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('lastScorecard')
    if (saved) {
      try {
        const { times: savedTimes, result: savedResult } = JSON.parse(saved)
        setTimes(savedTimes)
        setResult(savedResult)
      } catch (err) {
        console.log('No hay scorecard guardada')
      }
    }
  }, [])

  const handleTimeChange = (idx, newTime) => {
    const newTimes = [...times]
    newTimes[idx] = newTime
    setTimes(newTimes)
  }

  const handleCalculate = () => {
    setLoading(true)
    
    // Simular pequeña animación/delay
    setTimeout(() => {
      const calculatedResult = calculateAverage(times)
      setResult(calculatedResult)
      
      // Guardar en localStorage
      localStorage.setItem('lastScorecard', JSON.stringify({
        times,
        result: calculatedResult
      }))
      
      setLoading(false)
    }, 300)
  }

  const handleNewScorecard = () => {
    const emptyTimes = Array(5).fill(null).map(() => ({
      minutes: '',
      seconds: '',
      milliseconds: ''
    }))
    setTimes(emptyTimes)
    setResult(null)
    localStorage.removeItem('lastScorecard')
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 whitespace-nowrap">
            Calculadora de ao5
          </h1>
          <p className="text-gray-400">
            Calcula tu promedio de tus solves
          </p>
        </div>

        {/* Contenido principal */}
        {!result ? (
          <TimerForm
            times={times}
            onTimeChange={handleTimeChange}
            onCalculate={handleCalculate}
            loading={loading}
          />
        ) : (
          <ScoreCard
            times={times}
            result={result}
            onNewScorecard={handleNewScorecard}
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
