function getRomanNumeral(number) {
  if (typeof number !== "number" || number < 1 || number > 3999) {
    throw new Error("Input must be an integer between 1 and 3999.");
  }

  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let romanNumeral = "";
  let remaining = number;

  for (const { value, symbol } of romanNumerals) {
    while (remaining >= value) {
      romanNumeral += symbol;
      remaining -= value;
    }
  }

  // Return response
  res.status(200).json({
    success: true,
    message: "Roman numeral conversion successful.",
    data: { number, romanNumeral },
  });
}
