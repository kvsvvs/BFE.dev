(() => {
  const originalSetTimeout = window.setTimeout;
  const originalClearTimeout = window.clearTimeout;

  const activeTimeouts = new Set();

  window.setTimeout = function (callback, delay, ...args) {
    const timeoutId = originalSetTimeout(() => {
      activeTimeouts.delete(timeoutId);
      callback(...args);
    }, delay);

    activeTimeouts.add(timeoutId);
    return timeoutId;
  };

  window.clearTimeout = function (timeoutId) {
    activeTimeouts.delete(timeoutId);
    return originalClearTimeout(timeoutId);
  };

  window.clearAllTimeout = function () {
    for (const timeoutId of activeTimeouts) {
      originalClearTimeout(timeoutId);
    }
    activeTimeouts.clear();
  };
})();
