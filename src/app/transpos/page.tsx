"use client";

import { useState } from "react";
import MatrixInput from "../components/MatrixInput";
import calculateTranspose from "../utils/transpos";
import Navbar from "../components/Navbar";

const TransposePage = () => {
  const [order, setOrder] = useState(2);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[][] | null>(null);

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = Math.max(2, Math.min(4, Number(e.target.value)));
    setOrder(newOrder);
    setMatrix([]);
    setResult(null);
  };

  const handleMatrixChange = (newMatrix: number[][]) => {
    setMatrix(newMatrix);
    setResult(null);
  };

  const handleCalculate = () => {
    if (matrix.length === order && matrix[0].length === order) {
      setResult(calculateTranspose(matrix));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-800 text-gray-100 py-8 mt-8 space-y-6">
        {/* Judul Halaman */}
        <h1 className="text-4xl font-extrabold text-yellow-400">Transpos Matriks</h1>

        {/* Input Ordo Matriks */}
        <div className="mb-6">
            <label className="text-lg font-medium flex items-center gap-2">
            Ordo Matriks:
            <input
              type="number"
              min="2"
              max="4"
              value={order}
              onChange={handleOrderChange}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </label>
        </div>

        {/* Input Matriks */}
        <MatrixInput order={order} onMatrixChange={handleMatrixChange} />

        {/* Tombol Hitung */}
        <button
          onClick={handleCalculate}
          className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105"
        >
          Transpos
        </button>

        {/* Hasil Transpose */}
        {result && (
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Hasil Transpos:</h2>
            {result.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-2">
                {row.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className="w-16 h-16 flex items-center justify-center bg-gray-800 text-yellow-300 border border-gray-700"
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TransposePage;
