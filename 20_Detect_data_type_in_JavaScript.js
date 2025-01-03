function detectType(value) {
  if (value === null) return "null";
  if (typeof value === "object" || typeof value === "function") {
    const type = Object.prototype.toString
      .call(value)
      .slice(8, -1)
      .toLowerCase();
    return type;
  }
  return typeof value;
}

// Examples:
console.log(detectType(1)); // 'number'
console.log(detectType(new Map())); // 'map'
console.log(detectType([])); // 'array'
console.log(detectType(null)); // 'null'
console.log(detectType(new Date())); // 'date'
console.log(detectType(() => {})); // 'function'
console.log(detectType(new ArrayBuffer(10))); // 'arraybuffer'
console.log(detectType(new Set())); // 'set'
