class CustomJSON {
  static parse(jsonString) {
    if (typeof jsonString !== "string") {
      throw new TypeError("Input must be a string");
    }
    let index = 0;
    const parseValue = () => {
      skipWhitespace();
      const char = jsonString[index];

      if (char === "{") return parseObject();
      if (char === "[") return parseArray();
      if (char === '"') return parseString();
      if (char === "-" || isDigit(char)) return parseNumber();
      if (jsonString.startsWith("true", index))
        return parseLiteral("true", true);
      if (jsonString.startsWith("false", index))
        return parseLiteral("false", false);
      if (jsonString.startsWith("null", index))
        return parseLiteral("null", null);

      throw new SyntaxError(`Unexpected token at index ${index}: ${char}`);
    };

    const parseObject = () => {
      const obj = {};
      index++;
      skipWhitespace();
      if (jsonString[index] === "}") {
        index++;
        return obj;
      }
      while (true) {
        skipWhitespace();
        const key = parseString();
        skipWhitespace();
        if (jsonString[index] !== ":") {
          throw new SyntaxError(`Expected ':' at index ${index}`);
        }
        index++; // Skip ':'
        skipWhitespace();
        obj[key] = parseValue();
        skipWhitespace();
        if (jsonString[index] === "}") {
          index++; // End of object
          break;
        }
        if (jsonString[index] !== ",") {
          throw new SyntaxError(`Expected ',' or '}' at index ${index}`);
        }
        index++; // Skip ','
      }
      return obj;
    };

    const parseArray = () => {
      const arr = [];
      index++; // Skip '['
      skipWhitespace();
      if (jsonString[index] === "]") {
        index++; // Empty array
        return arr;
      }
      while (true) {
        arr.push(parseValue());
        skipWhitespace();
        if (jsonString[index] === "]") {
          index++; // End of array
          break;
        }
        if (jsonString[index] !== ",") {
          throw new SyntaxError(`Expected ',' or ']' at index ${index}`);
        }
        index++; // Skip ','
      }
      return arr;
    };

    const parseString = () => {
      index++; // Skip opening quote
      let result = "";
      while (index < jsonString.length) {
        const char = jsonString[index];
        if (char === '"') {
          index++; // Skip closing quote
          return result;
        }
        if (char === "\\") {
          index++; // Handle escape sequences
          const escapeChar = jsonString[index];
          const escapes = {
            '"': '"',
            "\\": "\\",
            "/": "/",
            b: "\b",
            f: "\f",
            n: "\n",
            r: "\r",
            t: "\t",
          };
          if (escapeChar in escapes) {
            result += escapes[escapeChar];
          } else if (escapeChar === "u") {
            const hex = jsonString.slice(index + 1, index + 5);
            if (!/^[0-9a-fA-F]{4}$/.test(hex)) {
              throw new SyntaxError(`Invalid Unicode escape at index ${index}`);
            }
            result += String.fromCharCode(parseInt(hex, 16));
            index += 4;
          } else {
            throw new SyntaxError(`Invalid escape character at index ${index}`);
          }
        } else {
          result += char;
        }
        index++;
      }
      throw new SyntaxError("Unterminated string");
    };

    const parseNumber = () => {
      const start = index;
      if (jsonString[index] === "-") index++;
      while (isDigit(jsonString[index])) index++;
      if (jsonString[index] === ".") {
        index++;
        if (!isDigit(jsonString[index])) {
          throw new SyntaxError(`Unexpected token at index ${index}`);
        }
        while (isDigit(jsonString[index])) index++;
      }
      if (jsonString[index] === "e" || jsonString[index] === "E") {
        index++;
        if (jsonString[index] === "+" || jsonString[index] === "-") index++;
        if (!isDigit(jsonString[index])) {
          throw new SyntaxError(`Unexpected token at index ${index}`);
        }
        while (isDigit(jsonString[index])) index++;
      }
      const numStr = jsonString.slice(start, index);
      return Number(numStr);
    };

    const parseLiteral = (literal, value) => {
      index += literal.length;
      return value;
    };

    const skipWhitespace = () => {
      while (/\s/.test(jsonString[index])) {
        index++;
      }
    };

    const isDigit = (char) => char >= "0" && char <= "9";

    const result = parseValue();
    skipWhitespace();
    if (index < jsonString.length) {
      throw new SyntaxError(`Unexpected token at index ${index}`);
    }
    return result;
  }
}

// Example usage
const jsonString =
  '{"name": "John", "age": 30, "isAdmin": false, "courses": ["math", "science"], "spouse": null}';
const result = CustomJSON.parse(jsonString);
console.log(result);
