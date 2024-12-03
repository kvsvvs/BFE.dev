function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== "function") {
      return reject(new TypeError("Argument is not iterable"));
    }

    let rejectionCount = 0;
    let totalPromises = 0;
    const errors = [];

    for (const promise of promises) {
      const index = totalPromises;
      totalPromises++;

      Promise.resolve(promise).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          errors[index] = reason;
          rejectionCount++;
          if (rejectionCount === totalPromises) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        }
      );
    }

    if (totalPromises === 0) {
      reject(new AggregateError([], "All promises were rejected"));
    }
  });
}

// Example usage
const promise1 = new Promise((_, reject) => setTimeout(reject, 500, "Error 1"));
const promise2 = new Promise((_, reject) =>
  setTimeout(reject, 1000, "Error 2")
);
const promise3 = new Promise((resolve) => setTimeout(resolve, 300, "Success"));

promiseAny([promise1, promise2, promise3])
  .then(console.log)
  .catch(console.error);
