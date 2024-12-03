function promiseAllSettled(promises) {
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
        .then(
          (value) => {
            results[index] = { status: "fulfilled", value };
          },
          (reason) => {
            results[index] = { status: "rejected", reason };
          }
        )
        .finally(() => {
          completedCount++;
          if (completedCount === totalPromises) {
            resolve(results);
          }
        });
    }

    if (totalPromises === 0) {
      resolve([]);
    }
  });
}

// Example usage
const promise1 = Promise.resolve(3);
const promise2 = new Promise((_, reject) => setTimeout(reject, 1000, "error"));
const promise3 = Promise.resolve(42);

promiseAllSettled([promise1, promise2, promise3]).then(console.log);
