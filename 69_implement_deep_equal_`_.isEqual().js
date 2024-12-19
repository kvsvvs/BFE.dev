function isEqual(obj1, obj2) {
  const visitedPairs = new WeakMap();

  function deepEqual(x, y, visited) {
    if (x === y) return true;

    if (x == null || y == null) return false;

    if (typeof x !== typeof y) return false;

    if (typeof x === "object") {
      if (visited.has(x) && visited.get(x) === y) return true;
      visited.set(x, y);

      const xKeys = Object.keys(x);
      const yKeys = Object.keys(y);

      if (xKeys.length !== yKeys.length) return false;

      for (const key of xKeys) {
        if (!yKeys.includes(key) || !deepEqual(x[key], y[key], visited)) {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  return deepEqual(obj1, obj2, visitedPairs);
}

// Test cases
const a = { a: "bfe" };
const b = { a: "bfe" };
console.log(isEqual(a, b)); // true
console.log(a === b); // false

const c = [1, a, "4"];
const d = [1, b, "4"];
console.log(isEqual(c, d)); // true
console.log(c === d); // false

const objA = {};
objA.self = objA;
const objB = { self: objA };
const objC = {};
objC.self = objC;
const objD = { self: { self: objA } };
const objE = { self: { self: objB } };

console.log(isEqual(objA, objB)); // true
console.log(isEqual(objA, objC)); // true
console.log(isEqual(objA, objD)); // true
console.log(isEqual(objA, objE)); // true
console.log(isEqual(objB, objC)); // true
console.log(isEqual(objB, objD)); // true
console.log(isEqual(objB, objE)); // true
console.log(isEqual(objC, objD)); // true
console.log(isEqual(objC, objE)); // true
console.log(isEqual(objD, objE)); // true
