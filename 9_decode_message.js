function getHiddenMessage(matrix) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    !Array.isArray(matrix[0]) ||
    matrix[0].length === 0
  ) {
    return "";
  }

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const DIRECTION_DOWN_RIGHT = 1;
  const DIRECTION_UP_RIGHT = -1;

  let currentRow = 0;
  let currentCol = 0;
  let currentDirection = DIRECTION_DOWN_RIGHT;
  let result = "";

  while (true) {
    result += matrix[currentRow][currentCol];

    let nextRow = currentRow + currentDirection;
    let nextCol = currentCol + 1;

    if (isInBounds(nextRow, nextCol, numRows, numCols)) {
      currentRow = nextRow;
      currentCol = nextCol;
    } else {
      currentDirection = -currentDirection;
      nextRow = currentRow + currentDirection;
      nextCol = currentCol + 1;

      if (isInBounds(nextRow, nextCol, numRows, numCols)) {
        currentRow = nextRow;
        currentCol = nextCol;
      } else {
        break;
      }
    }
  }

  return result;
}

function isInBounds(row, col, numRows, numCols) {
  return row >= 0 && row < numRows && col >= 0 && col < numCols;
}

// Example usage:
const matrix = [
  ["I", "B", "C", "A", "L", "K", "A"],
  ["D", "R", "F", "C", "A", "E", "A"],
  ["G", "H", "O", "E", "L", "A", "D"],
];

console.log(getHiddenMessage(matrix)); // "IROCLED"
