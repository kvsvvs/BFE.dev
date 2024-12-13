/**
 * Subtracts two non-negative integers represented as strings.
 *
 * @param {string} num1 - The minuend as a string (larger or equal number).
 * @param {string} num2 - The subtrahend as a string (smaller or equal number).
 * @returns {string} - The result of num1 - num2 as a string.
 */
function subtract(num1, num2) {
  // Helper function to perform string subtraction (num1 - num2)
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

  // Ensure num1 is always larger or equal to num2
  if (
    num1.length < num2.length ||
    (num1.length === num2.length && num1 < num2)
  ) {
    throw new Error("num1 must be greater than or equal to num2");
  }

  return subtractStrings(num1, num2);
}

// Example Usage
console.log(subtract("1000000000000000000000", "999999999999999999999")); // Output: '1'
console.log(subtract("5000", "4999")); // Output: '1'
console.log(subtract("123456789", "123456788")); // Output: '1'
