"use client"

import type React from "react"
import { useState } from "react"
import InversInput from "../components/InversInput"
import Navbar from "../components/Navbar"
import calculateInverse from "../utils/invers"
import { FlipHorizontal, Calculator } from "lucide-react"

const InversePage = () => {
  const [order, setOrder] = useState(3)
  const [matrix, setMatrix] = useState<number[][]>(Array.from({ length: order }, () => Array(order).fill(0)))
  const [inverseResult, setInverseResult] = useState<number[][] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = Math.max(2, Math.min(4, Number.parseInt(e.target.value)))
    setOrder(newOrder)
  }

  const handleCalculateInverse = () => {
    try {
      const { inverse } = calculateInverse(matrix)
      setInverseResult(inverse)
      setErrorMessage(null)
    } catch (error: any) {
      setErrorMessage(error.message || "Error calculating matrix inverse.")
      setInverseResult(null)
    }
  }

  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-violet-50/30">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl">
                <FlipHorizontal className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Matrix Inverse
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find the inverse of your matrix using advanced mathematical algorithms
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
                    className="w-20 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Matrix Input */}
            <div className="flex justify-center mb-8">
              <InversInput order={order} onMatrixChange={setMatrix} />
            </div>

            {/* Calculate Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleCalculateInverse}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-xl hover:from-violet-600 hover:to-violet-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                <Calculator className="w-5 h-5" />
                Calculate Inverse
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                <div className="text-red-800 text-center font-medium">{errorMessage}</div>
              </div>
            )}

            {/* Results */}
            {inverseResult && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Inverse Matrix</h2>
                <div className="flex justify-center">
                  <div className="inline-block">
                    {inverseResult.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-3 mb-3 last:mb-0">
                        {row.map((value, colIndex) => (
                          <div
                            key={colIndex}
                            className="w-16 h-16 flex items-center justify-center bg-violet-50 border border-violet-200 rounded-xl text-violet-800 font-medium text-sm"
                          >
                            {value.toFixed(2)}
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

export default InversePage
