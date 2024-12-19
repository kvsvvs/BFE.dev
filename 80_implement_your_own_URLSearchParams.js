class MyURLSearchParams {
  constructor(queryString = "") {
    this.params = new Map();

    if (queryString.startsWith("?")) {
      queryString = queryString.slice(1);
    }

    const pairs = queryString.split("&");
    for (const pair of pairs) {
      if (!pair) continue;
      const [key, value] = pair.split("=").map(decodeURIComponent);
      if (!this.params.has(key)) {
        this.params.set(key, []);
      }
      this.params.get(key).push(value || "");
    }
  }

  get(name) {
    const values = this.params.get(name);
    return values ? values[0] : null;
  }

  getAll(name) {
    return this.params.get(name) || [];
  }

  has(name) {
    return this.params.has(name);
  }

  append(name, value) {
    if (!this.params.has(name)) {
      this.params.set(name, []);
    }
    this.params.get(name).push(String(value));
  }

  set(name, value) {
    this.params.set(name, [String(value)]);
  }

  delete(name) {
    this.params.delete(name);
  }

  toString() {
    const pairs = [];
    for (const [key, values] of this.params.entries()) {
      for (const value of values) {
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
    return pairs.join("&");
  }

  keys() {
    return Array.from(this.params.keys())[Symbol.iterator]();
  }

  values() {
    return Array.from(this.params.values()).flat()[Symbol.iterator]();
  }

  entries() {
    const entries = [];
    for (const [key, values] of this.params.entries()) {
      for (const value of values) {
        entries.push([key, value]);
      }
    }
    return entries[Symbol.iterator]();
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

// Example usage
const params = new MyURLSearchParams("?a=1&a=2&b=2");
console.log(params.get("a")); // '1'
console.log(params.getAll("a")); // ['1', '2']
console.log(params.get("b")); // '2'
console.log(params.getAll("b")); // ['2']
params.append("a", 3);
params.set("b", "3");
console.log(params.toString()); // 'a=1&a=2&b=3&a=3'

// Iterating over keys
for (const key of params.keys()) {
  console.log(key); // 'a', 'b'
}

// Iterating over values
for (const value of params.values()) {
  console.log(value); // '1', '2', '2', '3'
}

// Iterating over entries
for (const [key, value] of params) {
  console.log(key, value); // 'a 1', 'a 2', 'b 3', 'a 3'
}
