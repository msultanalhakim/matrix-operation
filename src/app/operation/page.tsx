"use client"

import type React from "react"

import { useState, useCallback } from "react"
import MatrixInput from "../components/MatrixInput"
import Navbar from "../components/Navbar"
import { Grid3X3, Plus, Minus, X, Divide } from "lucide-react"

const MatrixPage = () => {
  const [order, setOrder] = useState(2)
  const [numMatrices, setNumMatrices] = useState(2)
  const [matrices, setMatrices] = useState<number[][][]>([])
  const [operation, setOperation] = useState<string>("sum")

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = Math.max(2, Math.min(4, Number(e.target.value)))
    setOrder(newOrder)
    setMatrices([])
  }

  const handleNumMatricesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Math.max(1, Math.min(4, Number(e.target.value)))
    setNumMatrices(num)
    setMatrices(new Array(num).fill(null))
  }

  const handleMatrixChange = useCallback((index: number, newMatrix: number[][]) => {
    setMatrices((prev) => {
      const updated = [...prev]
      updated[index] = newMatrix
      return updated
    })
  }, [])
  
  const getMatrixChangeHandler = useCallback(
    (index: number) => (newMatrix: number[][]) => handleMatrixChange(index, newMatrix),
    [handleMatrixChange]
  )

  const calculateResult = () => {
    if (matrices.length < 2 || matrices.some((matrix) => !matrix || matrix.length === 0 || matrix[0].length === 0)) {
      return null
    }

    switch (operation) {
      case "sum":
        return matrices.reduce((acc, matrix) => {
          return acc.map((row, rowIndex) => row.map((val, colIndex) => val + matrix[rowIndex][colIndex]))
        })
      case "subtract":
        return matrices.reduce((acc, matrix, index) => {
          if (index === 0) return matrix
          return acc.map((row, rowIndex) => row.map((val, colIndex) => val - matrix[rowIndex][colIndex]))
        })
      case "multiply":
        return matrices.reduce((acc, matrix, index) => {
          if (index === 0) return matrix
          return acc.map((row, rowIndex) => row.map((val, colIndex) => val * matrix[rowIndex][colIndex]))
        })
      case "divide":
        return matrices.reduce((acc, matrix, index) => {
          if (index === 0) return matrix
          return acc.map((row, rowIndex) => row.map((val, colIndex) => val / matrix[rowIndex][colIndex]))
        })
      default:
        return null
    }
  }

  const result = calculateResult()

  const operations = [
    { key: "sum", label: "Add", icon: Plus, colorClass: "bg-blue-500" },
    { key: "subtract", label: "Subtract", icon: Minus, colorClass: "bg-red-500" },
    { key: "multiply", label: "Multiply", icon: X, colorClass: "bg-green-500" },
    { key: "divide", label: "Divide", icon: Divide, colorClass: "bg-purple-500" },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Grid3X3 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Matrix Operations
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Perform arithmetic operations on matrices including addition, subtraction, multiplication, and division
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Controls */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <label className="text-lg font-medium text-gray-700 flex items-center gap-3">
                  Matrix Order:
                  <input
                    type="number"
                    min="2"
                    max="4"
                    value={order}
                    onChange={handleOrderChange}
                    className="w-20 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>
                <label className="text-lg font-medium text-gray-700 flex items-center gap-3">
                  Number of Matrices:
                  <input
                    type="number"
                    min="2"
                    max="4"
                    value={numMatrices}
                    onChange={handleNumMatricesChange}
                    className="w-20 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>
              </div>
            </div>

            {/* Matrix Inputs */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {Array.from({ length: numMatrices }).map((_, index) => (
                <MatrixInput
                  key={index}
                  order={order}
                  onMatrixChange={getMatrixChangeHandler(index)}
                  title={`Matrix ${String.fromCharCode(65 + index)}`}
                />
              ))}
            </div>

            {/* Operation Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {operations.map((op) => (
                <button
                  key={op.key}
                  onClick={() => setOperation(op.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    operation === op.key
                      ? `${op.colorClass} text-white shadow-lg`
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <op.icon className="w-4 h-4" />
                  {op.label}
                </button>
              ))}
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Result</h2>
                <div className="flex justify-center">
                  <div className="inline-block">
                    {result.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-3 mb-3 last:mb-0">
                        {row.map((value, colIndex) => (
                          <div
                            key={colIndex}
                            className="w-16 h-16 flex items-center justify-center bg-blue-50 border border-blue-200 rounded-xl text-blue-800 font-medium"
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

export default MatrixPage
