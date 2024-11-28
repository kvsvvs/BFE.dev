function customAssign(target, ...sources) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const to = Object(target);

  for (const source of sources) {
    if (source != null) {
      for (const key of Reflect.ownKeys(source)) {
        const descriptor = Object.getOwnPropertyDescriptor(source, key);
        if (descriptor && descriptor.enumerable) {
          to[key] = source[key];
        }
      }
    }
  }

  return to;
}

const target = { a: 1 };
const source1 = { b: 2, [Symbol("c")]: 3 };
const source2 = { a: 10, d: 4 };

const result = customAssign(target, source1, source2);

console.log(result);
// { a: 10, b: 2, d: 4, [Symbol(c)]: 3 }
