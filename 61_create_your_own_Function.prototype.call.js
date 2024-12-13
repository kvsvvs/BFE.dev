/**
 * Custom implementation of Function.prototype.call.
 *
 * @param {any} thisArg - The value of `this` provided for the call to the function.
 * @param {...any} args - Arguments to pass to the function.
 * @returns {any} - The result of calling the function with the specified `this` value and arguments.
 */
Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  // Step 1: Ensure thisArg is not null or undefined
  thisArg =
    thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);

  // Step 2: Create a unique property on thisArg to avoid overwriting existing properties
  const uniqueKey = Symbol("fn");
  thisArg[uniqueKey] = this;

  // Step 3: Call the function with the provided arguments
  const result = thisArg[uniqueKey](...args);

  // Step 4: Clean up by deleting the temporary property
  delete thisArg[uniqueKey];

  return result;
};

/**
 * Example Function
 */
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

// Example Usage
const person = { name: "Alice" };
const result = greet.myCall(person, "Hello", "!");
console.log(result); // Output: "Hello, Alice!"
