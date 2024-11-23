"use client";

import { useState } from "react";
import MatrixInput from "../components/DeterminanInput";
import { calculateDeterminant } from "../utils/determinan";
import Navbar from "../components/Navbar";

const DeterminantPage = () => {
  const [order, setOrder] = useState(2);
  const [matrix, setMatrix] = useState<number[][]>(Array.from({ length: order }, () => Array(order).fill(0)));
  const [result, setResult] = useState<{ value: number; steps: string } | null>(null);

  const handleCalculate = () => {
    try {
      const determinant = calculateDeterminant(matrix);
      setResult(determinant);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-800 text-gray-100 py-8 mt-8 space-y-6">
        {/* Judul Halaman */}
        <h1 className="text-4xl font-extrabold text-yellow-400">Determinan Matriks</h1>

        {/* Form untuk memilih ordo */}
        <div className="flex flex-col items-center mb-6">
        <label className="text-lg font-medium flex items-center gap-2">
            Ordo Matriks:
            <input
              type="number"
              min="2"
              max="4"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </label>
          
        </div>

        {/* Input matriks */}
        <MatrixInput order={order} onMatrixChange={setMatrix} />

        {/* Tombol perhitungan determinan */}
        <button
          onClick={handleCalculate}
          className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105"
        >
          Hitung Determinan
        </button>

        {/* Menampilkan hasil */}
        {result && (
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-bold text-yellow-300">Determinant: {result.value}</h2>
            <p className="text-sm font-mono text-yellow-200">Steps: {result.steps} = {result.value}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DeterminantPage;
