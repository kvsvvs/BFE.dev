//Debouncing delays the execution of a function until a specified amount of time has passed since the last time it was invoked.
//The use of the this keyword in the debounce function ensures that the context of the function (func) being executed remains correct, particularly when it's a
// method of an object.
//Using .apply(this, args) ensures that the original context (this) is passed correctly to func when it is finally invoked.

function debounce(func, delay) {
  let timeOutId;
  return function (...args) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
