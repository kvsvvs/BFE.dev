function mergeSort(arr, ascending = true) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }

  const length = arr.length;
  if (length <= 1) return arr;

  const mid = Math.floor(length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(
    mergeSort(left, ascending),
    mergeSort(right, ascending),
    ascending
  );
}

function merge(left, right, ascending) {
  const sorted = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    const shouldTakeLeft = ascending
      ? left[i] <= right[j]
      : left[i] >= right[j];

    if (shouldTakeLeft) {
      sorted.push(left[i]);
      i++;
    } else {
      sorted.push(right[j]);
      j++;
    }
  }

  return sorted.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const ascendingSorted = mergeSort(unsortedArray); // Ascending sort
const descendingSorted = mergeSort(unsortedArray, false); // Descending sort

console.log("Original Array:", unsortedArray);
console.log("Sorted (Ascending):", ascendingSorted);
console.log("Sorted (Descending):", descendingSorted);
