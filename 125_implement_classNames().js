function classNames(...args) {
  const result = [];

  const processValue = (value) => {
    if (typeof value === "string" || typeof value === "number") {
      result.push(value);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        processValue(item);
      }
    } else if (
      value &&
      typeof value === "object" &&
      value.constructor === Object
    ) {
      for (const key in value) {
        if (value[key]) {
          result.push(key);
        }
      }
    } else if (
      value &&
      typeof value === "object" &&
      value.constructor !== Object
    ) {
      for (const key in value) {
        result.push(key);
      }
    }
  };

  for (const arg of args) {
    processValue(arg);
  }

  return result.join(" ");
}

// Example Usage:

console.log(classNames("BFE", "dev", 100));

console.log(classNames(null, undefined, Symbol(), 1n, true, false));

const obj = new Map();
obj.cool = "!";
console.log(classNames({ BFE: [], dev: true, is: 3 }, obj));

console.log(classNames(["BFE", [{ dev: true }, ["is", [obj]]]]));
