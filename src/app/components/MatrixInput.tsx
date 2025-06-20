"use client"

import type React from "react"
import { useState, useEffect } from "react"

type MatrixInputProps = {
  order: number
  onMatrixChange: (matrix: number[][]) => void
  title?: string
}

const MatrixInput: React.FC<MatrixInputProps> = ({ order, onMatrixChange, title }) => {
  const [matrix, setMatrix] = useState<number[][]>(Array.from({ length: order }, () => Array(order).fill(0)))

  useEffect(() => {
    const newMatrix = Array.from({ length: order }, () => Array(order).fill(0))
    setMatrix(newMatrix)
    onMatrixChange(newMatrix)
  }, [order, onMatrixChange])

  const handleChange = (row: number, col: number, value: string) => {
    const updatedMatrix = [...matrix]
    updatedMatrix[row][col] = Number.parseFloat(value) || 0
    setMatrix(updatedMatrix)
    onMatrixChange(updatedMatrix)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">{title || `Matrix (${order}×${order})`}</h3>
      <div className="flex flex-col items-center gap-3">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-3">
            {row.map((value, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={value || ""}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                className="w-14 h-14 text-center text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all font-medium"
                placeholder="0"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatrixInput
