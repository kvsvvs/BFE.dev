function throttle(func, limit) {
  let lastRan = 0;
  let timeout;
  let isFirstCall = true;

  return function (...args) {
    const context = this;
    const now = Date.now();

    if (isFirstCall) {
      func.apply(context, args);
      lastRan = now;
      isFirstCall = false;
    } else if (now - lastRan >= limit) {
      func.apply(context, args);
      lastRan = now;
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
        lastRan = Date.now();
      }, limit - (now - lastRan));
    }
  };
}
