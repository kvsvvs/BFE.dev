let intervalMap = new Map();

function mySetInterval(callback, delay, period) {
  let count = 0;
  const id = Symbol();

  const execute = () => {
    if (!intervalMap.has(id)) return;

    callback();
    count++;
    const nextDelay = delay + period * count;
    intervalMap.set(id, setTimeout(execute, nextDelay));
  };

  intervalMap.set(id, setTimeout(execute, delay));

  return id;
}

function myClearInterval(id) {
  if (intervalMap.has(id)) {
    clearTimeout(intervalMap.get(id));
    intervalMap.delete(id);
  }
}
