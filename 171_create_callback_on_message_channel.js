class BetterChannel {
  constructor() {
    const { port1, port2 } = new SomeChannel();

    this.internalPort1 = port1;
    this.internalPort2 = port2;

    this.port1 = new BetterPort(port1);
    this.port2 = new BetterPort(port2);
  }
}

class BetterPort {
  constructor(port) {
    this.port = port;
    this.pendingReplies = new Map(); // To manage reply callbacks

    this.port.onmessage = (event) => {
      const { id, message, reply } = event;

      if (reply) {
        const callback = this.pendingReplies.get(id);
        if (callback) {
          callback(reply);
          this.pendingReplies.delete(id);
        }
      } else if (this.onmessage) {
        this.onmessage(message, (response) => {
          this.postReply(id, response);
        });
      }
    };
  }

  postMessage(message, callback) {
    const id = this.generateId();

    if (callback) {
      this.pendingReplies.set(id, callback);
    }

    this.port.postMessage({ id, message });
  }

  postReply(id, reply) {
    this.port.postMessage({ id, reply });
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}

// Example Usage
const { port1, port2 } = new BetterChannel();

port2.onmessage = (message, reply) => {
  if (message === "ping?") {
    reply("pong!");
  }
  if (message === "pong?") {
    reply("ping!");
  }
};

port1.postMessage("ping?", (data) => {
  console.log(data); // Output: 'pong!'
});
