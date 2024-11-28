function flat(array, depth = 1) {
  if (!Array.isArray(array)) {
    throw new TypeError("Input must be an array");
  }
  if (typeof depth !== "number" || isNaN(depth)) {
    throw new TypeError("Depth must be a finite number");
  }

  if (depth <= 0) return array;

  const result = [];

  (function flatten(arr, currentDepth) {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth > 0) {
        flatten(item, currentDepth - 1);
      } else {
        result.push(item);
      }
    }
  })(array, depth === Infinity ? Number.MAX_SAFE_INTEGER : depth);

  return result;
}
