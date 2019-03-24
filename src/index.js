module.exports = function solveSudoku(matrix) {
  function solve(matrix) {
    let {i, j} = findZero(matrix);
    if (i === -1 && j === -1) {
      return matrix;
    }
    let candidates = getCandidates (matrix, i, j);
    let result = null;
    candidates.forEach((value) => {
      if (!result) {
        let clone = matrix.map((row) => [...row]);
        clone[i][j] = value;
        result = solve(clone); 
      }
    });
    return result;
  }

  function findZero(matrix) {
    let j;
    let i = matrix.findIndex((row) => {
      j = row.indexOf(0);
      return (j !== -1);
    });
    return {i, j};
  }
  
  function getCandidates(matrix, i, j) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let result = new Set(numbers);
    let qi = Math.floor(i / 3) * 3;
    let qj = Math.floor(j / 3) * 3;
    matrix.forEach((row) => result.delete(row[j]));
    matrix[i].forEach((item) => result.delete(item));
    [
      ...matrix[qi].slice(qj, qj + 3),
      ...matrix[qi + 1].slice(qj, qj + 3),
      ...matrix[qi + 2].slice(qj, qj + 3)
    ].forEach((item) => result.delete(item));
    return result;
  }

  return solve(matrix);
}
