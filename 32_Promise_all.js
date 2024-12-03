function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== "function") {
      return reject(new TypeError("Argument is not iterable"));
    }

    const results = [];
    let completedCount = 0;
    let totalPromises = 0;

    for (const promise of promises) {
      const index = totalPromises;
      totalPromises++;

      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completedCount++;

          if (completedCount === totalPromises) {
            resolve(results);
          }
        })
        .catch(reject);
    }

    if (totalPromises === 0) {
      resolve([]);
    }
  });
}

// Example usage
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, "foo"));
const promise3 = Promise.resolve(42);

promiseAll([promise1, promise2, promise3])
  .then(console.log) // Logs: [3, "foo", 42]
  .catch(console.error);
