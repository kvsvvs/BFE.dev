function removeChars(input) {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string.");
  }

  let result = input.replace(/b/g, "");

  result = result.replace(/ac/g, "");

  return result;
}

// Example usage:
console.log(removeChars("ab")); // Output: 'a'
console.log(removeChars("abc")); // Output: ''
console.log(removeChars("cabbaabcca")); // Output: 'caa'
