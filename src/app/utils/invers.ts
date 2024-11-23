const calculateInverse = (matrix: number[][]) => {
  const n = matrix.length; // Ordo matriks
  let determinant = 0;
  let inverse: number[][] = [];
  let steps: string[] = [];

  // Hitung determinan matriks menggunakan metode ekspansi minor (rekursif)
  const calculateDeterminant = (mat: number[][]): number => {
    const size = mat.length;

    if (size === 2) {
      // Determinan untuk matriks 2x2
      return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
    }

    let det = 0;

    for (let col = 0; col < size; col++) {
      const minor = mat
        .slice(1) // Hapus baris pertama
        .map((row) => row.filter((_, index) => index !== col)); // Hapus kolom `col`

      const cofactor = Math.pow(-1, col) * mat[0][col] * calculateDeterminant(minor);
      det += cofactor;

      if (size === n) {
        // Simpan langkah untuk determinan utama
        steps.push(
          `${mat[0][col]} * det(${JSON.stringify(
            minor.map((r) => `[${r.join(", ")}]`).join(", ")
          )})`
        );
      }
    }

    return det;
  };

  determinant = calculateDeterminant(matrix);

  if (determinant === 0) {
    throw new Error("Matriksnya adalah matriks singular (det = 0) dan tidak memiliki invers.");
  }

  // Adjoint untuk matriks 2x2
  const adjoint2x2 = (mat: number[][]): number[][] => {
    return [
      [mat[1][1], -mat[0][1]],
      [-mat[1][0], mat[0][0]],
    ];
  };

  // Adjoint untuk matriks nxn
  const adjointNxN = (mat: number[][]): number[][] => {
    const adj = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const minor = mat
          .filter((_, rowIndex) => rowIndex !== i) // Hapus baris i
          .map((row) => row.filter((_, colIndex) => colIndex !== j)); // Hapus kolom j

        adj[j][i] = Math.pow(-1, i + j) * calculateDeterminant(minor); // Cofactor transpose
      }
    }

    return adj;
  };

  // Hitung invers matriks
  if (n === 2) {
    inverse = adjoint2x2(matrix).map((row) => row.map((val) => val / determinant));
  } else {
    const adjoint = adjointNxN(matrix);
    inverse = adjoint.map((row) => row.map((val) => val / determinant));
  }

  return { inverse, determinant, steps };
};

export default calculateInverse;
