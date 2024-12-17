function getNthNum(n) {
  if (n <= 0 || !Number.isInteger(n)) {
    throw new Error("Input must be a positive integer greater than 0.");
  }

  let current = "1";

  for (let i = 1; i < n; i++) {
    current = getNextTerm(current);
  }

  return current;
}

function getNextTerm(term) {
  let result = "";
  let count = 1;

  for (let i = 0; i < term.length; i++) {
    if (i < term.length - 1 && term[i] === term[i + 1]) {
      count++;
    } else {
      result += count + term[i];
      count = 1;
    }
  }

  return result;
}

// Example Usage
console.log(getNthNum(1)); // Output: "1"
console.log(getNthNum(2)); // Output: "11"
console.log(getNthNum(3)); // Output: "21"
console.log(getNthNum(4)); // Output: "1211"
console.log(getNthNum(5)); // Output: "111221"
console.log(getNthNum(6)); // Output: "312211"
console.log(getNthNum(7)); // Output: "13112221"
