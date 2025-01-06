function binarySearch(arr, item) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }
  if (arr.length === 0) {
    throw new Error("Array cannot be empty");
  }

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === item) {
      console.log("Match found at index", mid);
      return mid;
    } else if (arr[mid] < item) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  console.log("No match found");
  return -1;
}
