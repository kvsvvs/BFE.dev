function clz32(num) {
  const int32 = num >>> 0;
  if (int32 === 0) return 32;
  let leadingZeros = 0;
  for (let i = 31; i >= 0; i--) {
    if ((int32 & (1 << i)) !== 0) {
      break;
    }
    leadingZeros++;
  }
  return leadingZeros;
}

console.log(clz32(1)); // Output: 31
console.log(clz32(10000)); // Output: 18
console.log(clz32(25.45)); // Output: 27
console.log(clz32(0)); // Output: 32
