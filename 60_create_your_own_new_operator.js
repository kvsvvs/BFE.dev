function myNew(constructor, ...args) {
  if (typeof constructor !== "function") {
    throw new TypeError("Constructor must be a function");
  }

  // Step 1: Create a new empty object and set its prototype to the constructor's prototype
  const obj = Object.create(constructor.prototype);

  // Step 2: Call the constructor with the newly created object as `this` and pass the arguments
  const result = constructor.apply(obj, args);

  // Step 3: Return the result if it's an object, otherwise return the created object
  return result !== null &&
    (typeof result === "object" || typeof result === "function")
    ? result
    : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;

  // Uncomment the following line to test constructor returning an object
  // return { custom: 'object' };
}

// Example Usage
const person = myNew(Person, "Alice", 30);
console.log(person); // Output: Person { name: 'Alice', age: 30 }
console.log(person instanceof Person); // Output: true
