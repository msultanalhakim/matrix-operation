"use client";

import React, { useState, useEffect } from "react";

type MatrixInputProps = {
  order: number;
  onMatrixChange: (matrix: number[][]) => void;
};

const MatrixInput: React.FC<MatrixInputProps> = ({ order, onMatrixChange }) => {
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: order }, () => Array(order).fill(0))
  );

  useEffect(() => {
    setMatrix(Array.from({ length: order }, () => Array(order).fill(0)));
  }, [order]);

  const handleChange = (row: number, col: number, value: string) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(updatedMatrix);
    onMatrixChange(updatedMatrix);
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-center">Matriks ({order}x{order})</h2>
      <div className="space-y-2">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((value, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={value}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                className="w-16 h-16 m-1 p-2 text-center text-zinc-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixInput;