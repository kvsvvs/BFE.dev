// Currying is a functional programming technique where a function with multiple arguments is transformed into a series of nested functions that each take a single
// argument. In JavaScript, currying allows you to create more reusable and modular code by breaking down functions into smaller, more specific functions.

function createLogger(level) {
  return function (message) {
    console.log(`[${level.toUpperCase()}] ${message}`);
  };
}

const infoLogger = createLogger("info");
const warnLogger = createLogger("warn");
const errorLogger = createLogger("error");

infoLogger("This is an informational message");
warnLogger("This is an warning message");
errorLogger("This is an error message");
