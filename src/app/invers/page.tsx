"use client";

import React, { useState } from "react";
import InversInput from "../components/InversInput";
import Navbar from "../components/Navbar";
import calculateInverse from "../utils/invers";

const InversePage = () => {
  const [order, setOrder] = useState(3); // Default 3x3
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: order }, () => Array(order).fill(0))
  );
  const [inverseResult, setInverseResult] = useState<number[][] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = Math.max(2, Math.min(4, parseInt(e.target.value))); // Ordo terbatas 2x2 hingga 4x4
    setOrder(newOrder);
  };

  const handleCalculateInverse = () => {
    try {
      const { inverse } = calculateInverse(matrix);
      setInverseResult(inverse);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.message || "Error saat menghitung invers matriks.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-800 text-gray-100 py-8 mt-8 space-y-6">
        {/* Judul Halaman */}
        <h1 className="text-4xl font-extrabold text-yellow-400">Invers Matriks</h1>

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

        {/* Komponen Input Matriks */}
        <InversInput order={order} onMatrixChange={setMatrix} />

        {/* Tombol Hitung */}
        <button
          onClick={handleCalculateInverse}
          className="px-6 py-2 text-black bg-yellow-500 rounded-lg hover:bg-yellow-600 transition transform hover:scale-105"
        >
          Invers
        </button>

        {/* Pesan Error */}
        {errorMessage && (
          <div className="text-red-400 text-lg font-medium mt-4">
            {errorMessage}
          </div>
        )}

        {/* Hasil Invers */}
        {inverseResult && (
          <div className="mt-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">
              Hasil Invers:
            </h2>
            <div className="space-y-2">
              {inverseResult.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2">
                  {row.map((value, colIndex) => (
                    <div
                      key={colIndex}
                      className="w-16 h-16 flex items-center justify-center bg-gray-800 border border-gray-700 text-center text-yellow-300 font-mono"
                    >
                      {value.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InversePage;
