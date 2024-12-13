function myAtob(base64String) {
  if (typeof base64String !== "string") {
    throw new Error("Input must be a Base64-encoded string.");
  }

  const base64Chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  const padding = base64String.endsWith("==")
    ? 2
    : base64String.endsWith("=")
    ? 1
    : 0;

  if (base64String.length % 4 !== 0) {
    throw new Error("Invalid Base64 string length.");
  }

  let binary = "";
  for (let i = 0; i < base64String.length; i += 4) {
    const encoded1 = base64Chars.indexOf(base64String[i]);
    const encoded2 = base64Chars.indexOf(base64String[i + 1]);
    const encoded3 = base64Chars.indexOf(base64String[i + 2]);
    const encoded4 = base64Chars.indexOf(base64String[i + 3]);

    if (
      encoded1 === -1 ||
      encoded2 === -1 ||
      (encoded3 === -1 && base64String[i + 2] !== "=") ||
      (encoded4 === -1 && base64String[i + 3] !== "=")
    ) {
      throw new Error("Invalid Base64 string characters.");
    }

    const decoded1 = (encoded1 << 2) | (encoded2 >> 4);
    const decoded2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    const decoded3 = ((encoded3 & 3) << 6) | encoded4;

    binary += String.fromCharCode(decoded1);

    if (encoded3 !== -1) {
      binary += String.fromCharCode(decoded2);
    }
    if (encoded4 !== -1) {
      binary += String.fromCharCode(decoded3);
    }
  }

  return binary.slice(0, binary.length - padding);
}

try {
  console.log(myAtob("QkZFLmRldg=="));
  console.log(myAtob("Q"));
} catch (error) {
  console.error(error.message);
}
