class Emitter {
  constructor() {
    this.events = new Map();
  }

  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    const listeners = this.events.get(eventName);
    listeners.push(callback);

    return {
      release: () => {
        const updatedListeners = listeners.filter(
          (listener) => listener !== callback
        );
        this.events.set(eventName, updatedListeners);
        if (updatedListeners.length === 0) {
          this.events.delete(eventName);
        }
      },
    };
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);
    if (listeners) {
      listeners.forEach((callback) => callback(...args));
    }
  }
}

// Example usage:

const emitter = new Emitter();

// Define some sample callbacks
const callback1 = (...args) => console.log("Callback1 called with:", ...args);
const callback2 = (...args) => console.log("Callback2 called with:", ...args);

// Subscribe to events
const sub1 = emitter.subscribe("event1", callback1);
const sub2 = emitter.subscribe("event2", callback2);
const sub3 = emitter.subscribe("event1", callback1); // Same callback subscribed again to 'event1'

// Emit events
emitter.emit("event1", 1, 2); // Callback1 will be called twice
emitter.emit("event2", 3, 4); // Callback2 will be called once

// Unsubscribe
sub1.release();
sub3.release();

// Emit 'event1' again after unsubscribing
emitter.emit("event1", 5, 6); // Callback1 will not be called anymore
