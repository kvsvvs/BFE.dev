function once(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("Expected a function as input");
  }

  let result;
  let called = false;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

function func(num) {
  return num;
}

const onced = once(func);

console.log(onced(1)); // 1, func called with 1
console.log(onced(2)); // 1, even though 2 is passed, the previous result is returned
