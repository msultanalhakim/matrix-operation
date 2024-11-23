export const calculateDeterminant = (matrix: number[][]): { value: number; steps: string } => {
  const n = matrix.length;

  if (n === 2) {
    // Determinan 2x2
    const determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    const steps = `|A| = (${matrix[0][0]} * ${matrix[1][1]}) - (${matrix[0][1]} * ${matrix[1][0]})`;
    return { value: determinant, steps };
  } else if (n === 3) {
    // Determinan 3x3 menggunakan metode Sarrus
    let mainDiagonal = 0;
    let secondaryDiagonal = 0;

    // Diagonal utama
    mainDiagonal += matrix[0][0] * matrix[1][1] * matrix[2][2];
    mainDiagonal += matrix[0][1] * matrix[1][2] * matrix[2][0];
    mainDiagonal += matrix[0][2] * matrix[1][0] * matrix[2][1];

    // Diagonal sekunder
    secondaryDiagonal += matrix[0][2] * matrix[1][1] * matrix[2][0];
    secondaryDiagonal += matrix[0][1] * matrix[1][0] * matrix[2][2];
    secondaryDiagonal += matrix[0][0] * matrix[1][2] * matrix[2][1];

    const determinant = mainDiagonal - secondaryDiagonal;

    const steps = `|A| = [(${matrix[0][0]} * ${matrix[1][1]} * ${matrix[2][2]}) + (${matrix[0][1]} * ${matrix[1][2]} * ${matrix[2][0]}) + (${matrix[0][2]} * ${matrix[1][0]} * ${matrix[2][1]})] - [(${matrix[0][2]} * ${matrix[1][1]} * ${matrix[2][0]}) + (${matrix[0][1]} * ${matrix[1][0]} * ${matrix[2][2]}) + (${matrix[0][0]} * ${matrix[1][2]} * ${matrix[2][1]})]`;
    return { value: determinant, steps };
  } else if (n === 4) {
    // Determinan 4x4 menggunakan ekspansi kofaktor
    const determinant = calculateDeterminant4x4(matrix);
    const steps = "Ekspansi kofaktor diterapkan (tidak ditampilkan dalam detail).";
    return { value: determinant, steps };
  } else {
    throw new Error("Matrix order is not supported. Only 2x2, 3x3, and 4x4 matrices are allowed.");
  }
};

// Fungsi pendukung untuk ordo 4x4
const calculateDeterminant4x4 = (matrix: number[][]): number => {
  let determinant = 0;

  // Ekspansi kofaktor pada baris pertama
  for (let col = 0; col < 4; col++) {
    const subMatrix = getSubMatrix(matrix, 0, col);
    const cofactor = matrix[0][col] * calculateDeterminant(subMatrix).value;
    determinant += col % 2 === 0 ? cofactor : -cofactor;
  }

  return determinant;
};

// Fungsi untuk mendapatkan sub-matriks dengan menghapus baris dan kolom
const getSubMatrix = (matrix: number[][], rowToRemove: number, colToRemove: number): number[][] => {
  return matrix
    .filter((_, row) => row !== rowToRemove)
    .map((row) => row.filter((_, col) => col !== colToRemove));
};
