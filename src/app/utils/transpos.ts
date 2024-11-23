const calculateTranspose = (matrix: number[][]): number[][] => {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const transpose = Array.from({ length: cols }, () => Array(rows).fill(0));
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        transpose[j][i] = matrix[i][j];
      }
    }
  
    return transpose;
  };
  
  export default calculateTranspose;
  