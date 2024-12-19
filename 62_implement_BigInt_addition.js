function add(num1, num2) {
  let carry = 0;
  let result = "";

  const maxLength = Math.max(num1.length, num2.length);
  num1 = num1.padStart(maxLength, "0");
  num2 = num2.padStart(maxLength, "0");

  for (let i = maxLength - 1; i >= 0; i--) {
    const digit1 = parseInt(num1[i], 10);
    const digit2 = parseInt(num2[i], 10);

    const sum = digit1 + digit2 + carry;
    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);
  }

  if (carry > 0) {
    result = carry + result;
  }

  return result;
}

// Example Usage
console.log(add("999999999999999999", "1")); // Output: '1000000000000000000'
console.log(add("123", "456")); // Output: '579'
console.log(add("1", "9999")); // Output: '10000'
