/**
 * Adds two integers represented as strings, handling both positive and negative values.
 *
 * @param {string} num1 - The first integer as a string, which may include a '+' or '-' sign.
 * @param {string} num2 - The second integer as a string, which may include a '+' or '-' sign.
 * @returns {string} - The sum of num1 and num2 as a string.
 */
function add(num1, num2) {
  // Helper function to remove leading '+' signs
  const normalize = (num) => (num[0] === "+" ? num.slice(1) : num);

  // Helper function to compare absolute values of two numbers as strings
  const compareAbs = (a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    return a.localeCompare(b);
  };

  // Helper function to perform string subtraction (a - b, where |a| >= |b|)
  const subtractStrings = (a, b) => {
    let carry = 0;
    let result = "";

    // Make both strings the same length by padding with zeros
    b = b.padStart(a.length, "0");

    for (let i = a.length - 1; i >= 0; i--) {
      const digitA = parseInt(a[i], 10);
      const digitB = parseInt(b[i], 10) + carry;

      if (digitA < digitB) {
        result = 10 + digitA - digitB + result;
        carry = 1;
      } else {
        result = digitA - digitB + result;
        carry = 0;
      }
    }

    // Remove leading zeros
    return result.replace(/^0+(?!$)/, "");
  };

  // Helper function to perform string addition (always positive numbers)
  const addStrings = (a, b) => {
    let carry = 0;
    let result = "";

    // Make both strings the same length by padding with zeros
    const maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, "0");
    b = b.padStart(maxLength, "0");

    for (let i = maxLength - 1; i >= 0; i--) {
      const digitA = parseInt(a[i], 10);
      const digitB = parseInt(b[i], 10);

      const sum = digitA + digitB + carry;
      result = (sum % 10) + result;
      carry = Math.floor(sum / 10);
    }

    if (carry > 0) {
      result = carry + result;
    }

    return result;
  };

  // Normalize input numbers
  num1 = normalize(num1);
  num2 = normalize(num2);

  const isNegative1 = num1[0] === "-";
  const isNegative2 = num2[0] === "-";

  const absNum1 = isNegative1 ? num1.slice(1) : num1;
  const absNum2 = isNegative2 ? num2.slice(1) : num2;

  if (isNegative1 === isNegative2) {
    // Both numbers have the same sign
    const sum = addStrings(absNum1, absNum2);
    return (isNegative1 ? "-" : "") + sum;
  } else {
    // Numbers have different signs, perform subtraction
    if (compareAbs(absNum1, absNum2) >= 0) {
      const diff = subtractStrings(absNum1, absNum2);
      return (isNegative1 ? "-" : "") + diff;
    } else {
      const diff = subtractStrings(absNum2, absNum1);
      return (isNegative2 ? "-" : "") + diff;
    }
  }
}

// Example Usage
console.log(add("-999999999999999999", "-1")); // Output: '-1000000000000000000'
console.log(add("-999999999999999999", "+1")); // Output: '-999999999999999998'
console.log(add("123", "456")); // Output: '579'
console.log(add("-123", "123")); // Output: '0'
