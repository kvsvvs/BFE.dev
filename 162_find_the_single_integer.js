function findSingle(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Input must be a non-empty array of integers.");
  }

  return arr.reduce((unique, num) => unique ^ num, 0);
}

// Test cases
const arr = [10, 2, 2, 1, 0, 0, 10];
console.log(findSingle(arr)); // 1
