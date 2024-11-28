// The this Keyword in JavaScript
// Before diving into these methods, it's crucial to understand the this keyword:

// this refers to the object that is currently calling the function.
// The value of this is determined at the time a function is called, not where it's defined.
// It allows methods to have dynamic context, making code more reusable.

// The bind(), call(), and apply() methods are essential for controlling the value of this within functions, allowing you to write more flexible and reusable code.

// Comparing call(), apply(), and bind()
// call():
// Invokes the function immediately.
// Accepts arguments individually.
// apply():
// Invokes the function immediately.
// Accepts arguments as an array.
// bind():
// Returns a new function with bound this and optional preset arguments.
// Does not invoke the function immediately.

// 1. Using call() for Method Borrowing

const greeter = {
  greet: function () {
    return `Hello, ${this.name}!`;
  },
};

const user = {
  name: "Kartikeya",
};
console.log(greeter.greet.call(user));

//2. Using apply() with Variable Arguments

function sumNumbers() {
  return Array.from(arguments).reduce((sum, num) => {
    sum + num;
  }, 0);
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
sumNumbers.apply(null, nums);

//3. Using bind() for Event Listeners

const logger = {
  prefix: "Log: ",
  log: function (message) {
    console.log(`${this.prefix} ${message}`);
  },
};

const boundLog = logger.log.bind(logger);
document.getElementById("myButton").addEventListener("click", function () {
  boundLog("Button clicked!");
});
