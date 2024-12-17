function memo(func, resolver) {
  if (typeof func !== "function") {
    throw new Error("The first argument to memo must be a function.");
  }

  const cache = new Map();

  return function (...args) {
    const key = resolver ? resolver(...args) : args.map(String).join("_");

    if (cache.has(key)) {
      console.log(`Cache hit for key: ${key}`);
      return cache.get(key);
    }

    console.log(`Cache miss for key: ${key}`);
    const result = func.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

// Example Usage

const func = (arg1, arg2) => {
  console.log(`Function called with arguments: ${arg1}, ${arg2}`);
  return arg1 + arg2;
};

const memoed = memo(func);

console.log(memoed(1, 2)); // Output: Function called... -> 3
console.log(memoed(1, 2)); // Output: Cache hit -> 3
console.log(memoed(1, 3)); // Output: Function called... -> 4
console.log(memoed(1, 3)); // Output: Cache hit -> 4

// Custom resolver: fixed key
const fixedKeyMemoed = memo(func, () => "samekey");

console.log(fixedKeyMemoed(1, 2)); // Output: Function called... -> 3
console.log(fixedKeyMemoed(1, 2)); // Output: Cache hit -> 3
console.log(fixedKeyMemoed(1, 3)); // Output: Cache hit -> 3
