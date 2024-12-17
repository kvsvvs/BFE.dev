/**
 * Tokenize a string containing an arithmetic expression.
 *
 * @param {string} input - The arithmetic expression to tokenize.
 * @returns {Generator<string>} - A generator that yields tokens one by one.
 */
function* tokenize(input) {
  const length = input.length; // Length of the input string
  let index = 0; // Pointer to traverse the string

  while (index < length) {
    const char = input[index];

    // 1. Ignore spaces
    if (char === " ") {
      index++;
      continue;
    }

    // 2. Handle single-character tokens: +, -, *, /, (, )
    if ("+-*/()".includes(char)) {
      yield char;
      index++;
      continue;
    }

    // 3. Handle multi-digit numbers
    if (/\d/.test(char)) {
      let num = "";
      while (index < length && /\d/.test(input[index])) {
        num += input[index];
        index++;
      }
      yield num; // Yield the full number as a token
      continue;
    }

    // 4. Throw an error for invalid characters
    throw new Error(`Invalid character encountered: ${char}`);
  }
}

// Example Usage:

// Using manual iteration with .next()
const tokens = tokenize(" 1 * (20 -   300      ) ");
while (true) {
  let token = tokens.next();
  if (token.done) {
    break;
  }
  console.log(token.value); // Output tokens
}

console.log("Using for...of loop:");

// Using for...of loop
for (let token of tokenize(" 1 * (20 -   300      ) ")) {
  console.log(token);
}
