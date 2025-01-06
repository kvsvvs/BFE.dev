function findElementBeforeTarget(arr, target) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }
  if (arr.length === 0) {
    return undefined;
  }

  let left = 0;
  let right = arr.length - 1;
  let firstIndex = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      firstIndex = mid;
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (firstIndex === -1) {
    return undefined;
  }

  if (firstIndex === 0) {
    return undefined;
  }

  return arr[firstIndex - 1];
}
