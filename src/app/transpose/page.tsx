"use client"

import type React from "react"

import { useState, useCallback } from "react"
import MatrixInput from "../components/MatrixInput"
import calculateTranspose from "../utils/transpose"
import Navbar from "../components/Navbar"
import { RotateCcw, Calculator } from "lucide-react"

const TransposePage = () => {
  const [order, setOrder] = useState(2)
  const [matrix, setMatrix] = useState<number[][]>([])
  const [result, setResult] = useState<number[][] | null>(null)

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = Math.max(2, Math.min(4, Number(e.target.value)))
    setOrder(newOrder)
    setMatrix([])
    setResult(null)
  }

  const handleMatrixChange = useCallback((newMatrix: number[][]) => {
    setMatrix(newMatrix)
    setResult(null)
  }, [])

  const handleCalculate = () => {
    if (matrix.length === order && matrix[0].length === order) {
      setResult(calculateTranspose(matrix))
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/30">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <RotateCcw className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Matrix Transpose
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Transform your matrix by swapping rows and columns to create the transpose
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
                    onChange={handleOrderChange}
                    className="w-20 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <Calculator className="w-5 h-5" />
                Calculate Transpose
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Transpose Matrix</h2>
                <div className="flex justify-center">
                  <div className="inline-block">
                    {result.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-3 mb-3 last:mb-0">
                        {row.map((value, colIndex) => (
                          <div
                            key={colIndex}
                            className="w-16 h-16 flex items-center justify-center bg-amber-50 border border-amber-200 rounded-xl text-amber-800 font-medium"
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    ))}
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

export default TransposePage
