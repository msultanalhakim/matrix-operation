"use client";

import { useState } from "react";
import MatrixInput from "../components/MatrixInput";
import Navbar from "../components/Navbar";

const MatrixPage = () => {
  const [order, setOrder] = useState(2);
  const [numMatrices, setNumMatrices] = useState(2);
  const [matrices, setMatrices] = useState<number[][][]>([]);
  const [operation, setOperation] = useState<string>("sum");

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrder = Math.max(2, Math.min(4, Number(e.target.value)));
    setOrder(newOrder);
    setMatrices([]);
  };

  const handleNumMatricesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Math.max(1, Math.min(4, Number(e.target.value)));
    setNumMatrices(num);
    setMatrices(new Array(num).fill(null));
  };

  const handleMatrixChange = (index: number, newMatrix: number[][]) => {
    const updatedMatrices = [...matrices];
    updatedMatrices[index] = newMatrix;
    setMatrices(updatedMatrices);
  };

  const handleSumMatrices = () => {
    if (matrices.length < 2 || matrices.some(matrix => !matrix || matrix.length === 0 || matrix[0].length === 0)) {
      return null;
    }

    // Operasi penjumlahan matriks
    return matrices.reduce((acc, matrix) => {
      return acc.map((row, rowIndex) =>
        row.map((val, colIndex) => val + matrix[rowIndex][colIndex])
      );
    });
  };

  const handleSubtractMatrices = () => {
    if (matrices.length < 2 || matrices.some(matrix => !matrix || matrix.length === 0 || matrix[0].length === 0)) {
      return null;
    }

    // Operasi pengurangan matriks
    return matrices.reduce((acc, matrix, index) => {
      if (index === 0) return matrix;
      return acc.map((row, rowIndex) =>
        row.map((val, colIndex) => val - matrix[rowIndex][colIndex])
      );
    });
  };

  const handleMultiplyMatrices = () => {
    if (matrices.length < 2 || matrices.some(matrix => !matrix || matrix.length === 0 || matrix[0].length === 0)) {
      return null; // Cek jika ada matriks yang kosong atau belum diisi
    }

    // Operasi perkalian matriks
    return matrices.reduce((acc, matrix, index) => {
      if (index === 0) return matrix;
      return acc.map((row, rowIndex) =>
        row.map((val, colIndex) => val * matrix[rowIndex][colIndex])
      );
    });
  };

  const handleDivideMatrices = () => {
    if (matrices.length < 2 || matrices.some(matrix => !matrix || matrix.length === 0 || matrix[0].length === 0)) {
      return null; // Cek jika ada matriks yang kosong atau belum diisi
    }

    // Operasi pembagian matriks
    return matrices.reduce((acc, matrix, index) => {
      if (index === 0) return matrix;
      return acc.map((row, rowIndex) =>
        row.map((val, colIndex) => val / matrix[rowIndex][colIndex])
      );
    });
  };

  const result =
    operation === "sum"
      ? handleSumMatrices()
      : operation === "subtract"
      ? handleSubtractMatrices()
      : operation === "multiply"
      ? handleMultiplyMatrices()
      : operation === "divide"
      ? handleDivideMatrices()
      : null;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-800 text-gray-100 py-8 mt-8 space-y-6">
        {/* Judul Halaman */}
        <h1 className="text-4xl font-extrabold text-yellow-400">Operasi Matriks</h1>

        {/* Form untuk memilih ordo dan jumlah matriks */}
        <div className="flex justify-center space-x-6 mb-6">
          <div className="flex flex-col items-center">
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

          <div className="flex flex-col items-center">
          <label className="text-lg font-medium flex items-center gap-2">
            Jumlah Matriks:
            <input
              type="number"
              min="2"
              max="4"
              value={numMatrices}
              onChange={handleNumMatricesChange}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </label>
          </div>
        </div>

        {/* Render input matriks sesuai jumlah yang dipilih, secara horizontal */}
        <div className="flex space-x-6">
          {Array.from({ length: numMatrices }).map((_, index) => (
            <MatrixInput
              key={index}
              order={order}
              onMatrixChange={(newMatrix) => handleMatrixChange(index, newMatrix)}
            />
          ))}
        </div>

        {/* Tombol operasi */}
        <div className="mt-6 space-x-4">
          <button
            className={`px-6 py-2 rounded-lg text-white ${operation === "sum" ? "bg-yellow-400" : "bg-gray-700"}`}
            onClick={() => setOperation("sum")}
          >
            Tambah (+)
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-white ${operation === "subtract" ? "bg-red-600" : "bg-gray-700"}`}
            onClick={() => setOperation("subtract")}
          >
            Kurang (-)
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-white ${operation === "multiply" ? "bg-green-600" : "bg-gray-700"}`}
            onClick={() => setOperation("multiply")}
          >
            Kali (*)
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-white ${operation === "divide" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setOperation("divide")}
          >
            Bagi (/)
          </button>
        </div>

        {/* Hasil Operasi */}
        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Result:</h2>
            <div className="space-y-2">
              {result.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center">
                  {row.map((value, colIndex) => (
                    <div
                      key={colIndex}
                      className="w-16 h-16 flex items-center justify-center bg-gray-800 text-yellow-300 border border-gray-700"
                    >
                      {value.toFixed(2)} {/* Menampilkan hasil dengan dua angka di belakang koma */}
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
export default MatrixPage;
