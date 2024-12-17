if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    if (typeof callback !== "function") {
      throw new TypeError("The argument passed to finally must be a function.");
    }

    const promise = this;

    return promise.then(
      (value) => {
        return Promise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return Promise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  };
}

// Fulfilled Example
Promise.resolve("Success")
  .then((value) => {
    console.log("Fulfilled:", value);
    return value;
  })
  .finally(() => {
    console.log("Finally executed: Fulfilled case");
  })
  .then((value) => {
    console.log("After Finally:", value);
  });

// Rejected Example
Promise.reject("Error")
  .catch((reason) => {
    console.log("Rejected:", reason);
    throw reason; // Pass the rejection downstream
  })
  .finally(() => {
    console.log("Finally executed: Rejected case");
  })
  .catch((reason) => {
    console.log("After Finally:", reason);
  });
