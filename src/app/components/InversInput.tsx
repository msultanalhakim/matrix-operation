"use client";

import React, { useState, useEffect } from "react";

type InversInputProps = {
  order: number; // Ordo matriks (2x2, 3x3, dst.)
  onMatrixChange: (matrix: number[][]) => void; // Callback untuk mengirim matriks yang diubah
};

const InversInput: React.FC<InversInputProps> = ({ order, onMatrixChange }) => {
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: order }, () => Array(order).fill(0))
  );

  // Update matriks ketika ordo berubah
  useEffect(() => {
    const newMatrix = Array.from({ length: order }, () =>
      Array(order).fill(0)
    );
    setMatrix(newMatrix);
    onMatrixChange(newMatrix); // Reset matriks ke parent ketika ordo berubah
  }, [order, onMatrixChange]);

  // Handle perubahan nilai elemen matriks
  const handleChange = (row: number, col: number, value: string) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = parseFloat(value) || 0; // Pastikan nilai yang diinput valid
    setMatrix(updatedMatrix);
    onMatrixChange(updatedMatrix); // Kirim nilai matriks yang diperbarui ke parent
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
                className="w-16 h-16 bg-white-400 text-zinc-800 border border-gray-700 rounded-lg text-center shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InversInput;
