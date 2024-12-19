function* tokenize(input) {
  const length = input.length;
  let index = 0;

  while (index < length) {
    const char = input[index];

    if (char === " ") {
      index++;
      continue;
    }

    if ("+-*/()".includes(char)) {
      yield char;
      index++;
      continue;
    }

    if (/\d/.test(char)) {
      let num = "";
      while (index < length && /\d/.test(input[index])) {
        num += input[index];
        index++;
      }
      yield num;
      continue;
    }

    throw new Error(`Invalid character encountered: ${char}`);
  }
}

// Example Usage:

const tokens = tokenize(" 1 * (20 -   300      ) ");
while (true) {
  let token = tokens.next();
  if (token.done) {
    break;
  }
  console.log(token.value); // Output tokens
}

console.log("Using for...of loop:");

for (let token of tokenize(" 1 * (20 -   300      ) ")) {
  console.log(token);
}
