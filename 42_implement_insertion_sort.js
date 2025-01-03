function insertionSort(arr, ascending = true) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }

  const sortedArray = [...arr];
  const length = sortedArray.length;

  for (let i = 1; i < length; i++) {
    const current = sortedArray[i];
    let j = i - 1;

    while (j >= 0 && shouldSwap(sortedArray[j], current, ascending)) {
      sortedArray[j + 1] = sortedArray[j];
      j--;
    }

    sortedArray[j + 1] = current;
  }

  return sortedArray;
}

function shouldSwap(a, b, ascending) {
  return ascending ? a > b : a < b;
}

// Example usage
const unsortedArray = [29, 10, 14, 37, 14];
const ascendingSorted = insertionSort(unsortedArray); // Ascending order
const descendingSorted = insertionSort(unsortedArray, false); // Descending order

console.log("Original Array:", unsortedArray);
console.log("Sorted (Ascending):", ascendingSorted);
console.log("Sorted (Descending):", descendingSorted);
