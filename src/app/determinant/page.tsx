"use client"

import { useState, useCallback } from "react"
import MatrixInput from "../components/DeterminanInput"
import { calculateDeterminant } from "../utils/determinant"
import Navbar from "../components/Navbar"
import { Calculator, Hash } from "lucide-react"

const DeterminantPage = () => {
  const [order, setOrder] = useState(2)
  const [matrix, setMatrix] = useState<number[][]>(Array.from({ length: order }, () => Array(order).fill(0)))
  const handleMatrixChange = useCallback((newMatrix: number[][]) => {
    setMatrix(newMatrix)
  }, [])
  const [result, setResult] = useState<{ value: number; steps: string } | null>(null)

  const handleCalculate = () => {
    try {
      const determinant = calculateDeterminant(matrix)
      setResult(determinant)
    } catch (error) {
      alert((error as Error).message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                <Hash className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Matrix Determinant
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Calculate the determinant of your matrix with detailed step-by-step solutions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Controls */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
              <div className="flex items-center justify-center gap-4">
                <label className="text-lg font-medium text-gray-700 flex items-center gap-3">
                  Matrix Order:
                  <input
                    type="number"
                    min="2"
                    max="4"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-20 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Matrix Input */}
            <div className="flex justify-center mb-8">
              <MatrixInput order={order} onMatrixChange={handleMatrixChange} />
            </div>

            {/* Calculate Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleCalculate}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <Calculator className="w-5 h-5" />
                Calculate Determinant
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Result</h2>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Determinant Value</div>
                    <div className="text-4xl font-bold text-emerald-600">{result.value}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600 mb-2">Calculation Steps</div>
                    <div className="font-mono text-gray-800 break-all">
                      {result.steps} = {result.value}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DeterminantPage
