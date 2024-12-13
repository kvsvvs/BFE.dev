function myExpect(value) {
  const matchers = {
    toBe(expected) {
      if (value === expected) {
        console.log("✅ Test Passed");
      } else {
        console.error(`❌ Test Failed: Expected ${value} to be ${expected}`);
      }
    },
    not: {
      toBe(expected) {
        if (value !== expected) {
          console.log("✅ Test Passed");
        } else {
          console.error(
            `❌ Test Failed: Expected ${value} not to be ${expected}`
          );
        }
      },
    },
  };

  return matchers;
}

// Test cases
myExpect(3).toBe(3); // ✅
myExpect(4).toBe(3); // ❌
myExpect(3).not.toBe(3); // ❌
myExpect(4).not.toBe(3); // ✅
