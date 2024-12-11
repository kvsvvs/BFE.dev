function uncompress(s) {
  const stack = [];
  let num = 0;
  let currentString = "";

  for (const char of s) {
    if (!isNaN(char)) {
      num = num * 10 + parseInt(char, 10);
    } else if (char === "(") {
      stack.push([currentString, num]);
      currentString = "";
      num = 0;
    } else if (char === ")") {
      const [prevString, multiplier] = stack.pop();
      currentString = prevString + currentString.repeat(multiplier);
    } else {
      currentString += char;
    }
  }
  return currentString;
}

console.log(uncompress("3(ab)")); // Output: 'ababab'
console.log(uncompress("3(ab2(c))")); // Output: 'abccabccabcc'
