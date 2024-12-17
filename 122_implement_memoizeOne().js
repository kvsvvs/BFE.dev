function memoizeOne(func) {
  if (typeof func !== "function") {
    throw new Error("The first argument to memoizeOne must be a function.");
  }

  const defaultIsEqual = (prevArgs, currentArgs) => {
    if (prevArgs.length !== currentArgs.length) return false;
    for (let i = 0; i < prevArgs.length; i++) {
      if (prevArgs[i] !== currentArgs[i]) return false;
    }
    return true;
  };

  let lastArgs = null;
  let lastResult = null;

  return function (...args) {
    if (lastArgs && defaultIsEqual(lastArgs, args)) {
      return lastResult; // Return cached result
    }

    lastResult = func.apply(this, args);
    lastArgs = args;
    return lastResult;
  };
}

// Example Usage

const add = (a, b) => {
  console.log("Function called with:", a, b);
  return a + b;
};

const memoizedAdd = memoizeOne(add);

console.log(memoizedAdd(1, 2)); // Function called -> 3
console.log(memoizedAdd(1, 2)); // Cached result -> 3
console.log(memoizedAdd(2, 3)); // Function called -> 5
console.log(memoizedAdd(2, 3)); // Cached result -> 5
