function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== "function") {
      return reject(new TypeError("Argument is not iterable"));
    }

    for (const promise of promises) {
      Promise.resolve(promise).then(resolve).catch(reject);
    }
  });
}

// Example usage
const promise1 = new Promise((resolve) => setTimeout(resolve, 100, "First"));
const promise2 = new Promise((resolve) => setTimeout(resolve, 500, "Second"));
const promise3 = new Promise((_, reject) => setTimeout(reject, 200, "Error"));

promiseRace([promise1, promise2, promise3])
  .then(console.log) // Logs: "First" (or rejects if promise3 wins the race)
  .catch(console.error);
