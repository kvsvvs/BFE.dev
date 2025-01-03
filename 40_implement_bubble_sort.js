function bubbleSort(arr, ascending = true) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }

  const length = arr.length;
  if (length <= 1) return arr;

  const sortedArray = [...arr];
  let swapped;

  for (let i = 0; i < length; i++) {
    swapped = false;

    for (let j = 0; j < length - i - 1; j++) {
      const shouldSwap = ascending
        ? sortedArray[j] > sortedArray[j + 1]
        : sortedArray[j] < sortedArray[j + 1];

      if (shouldSwap) {
        [sortedArray[j], sortedArray[j + 1]] = [
          sortedArray[j + 1],
          sortedArray[j],
        ];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return sortedArray;
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const ascendingSorted = bubbleSort(unsortedArray); // Ascending sort
const descendingSorted = bubbleSort(unsortedArray, false); // Descending sort

console.log("Original Array:", unsortedArray);
console.log("Sorted (Ascending):", ascendingSorted);
console.log("Sorted (Descending):", descendingSorted);
