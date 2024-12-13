/**
 * Adds two non-negative integers represented as strings.
 *
 * @param {string} num1 - The first non-negative integer as a string.
 * @param {string} num2 - The second non-negative integer as a string.
 * @returns {string} - The sum of num1 and num2 as a string.
 */
function add(num1, num2) {
  let carry = 0;
  let result = "";

  // Make both strings the same length by padding with zeros
  const maxLength = Math.max(num1.length, num2.length);
  num1 = num1.padStart(maxLength, "0");
  num2 = num2.padStart(maxLength, "0");

  // Traverse the numbers from the last digit to the first
  for (let i = maxLength - 1; i >= 0; i--) {
    const digit1 = parseInt(num1[i], 10);
    const digit2 = parseInt(num2[i], 10);

    // Calculate the sum of digits and the carry
    const sum = digit1 + digit2 + carry;
    result = (sum % 10) + result; // Add the last digit of the sum to the result
    carry = Math.floor(sum / 10); // Update the carry
  }

  // If there's a carry left after the final addition, prepend it to the result
  if (carry > 0) {
    result = carry + result;
  }

  return result;
}

// Example Usage
console.log(add("999999999999999999", "1")); // Output: '1000000000000000000'
console.log(add("123", "456")); // Output: '579'
console.log(add("1", "9999")); // Output: '10000'
