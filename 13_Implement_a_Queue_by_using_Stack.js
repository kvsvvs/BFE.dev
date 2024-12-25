class Stack {
  constructor() {
    this.data = [];
  }

  push(element) {
    this.data.push(element);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  size() {
    return this.data.length;
  }
}

class Queue {
  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
  }

  enqueue(element) {
    this.stack1.push(element);
  }

  peek() {
    this._moveStack1ToStack2IfNeeded();
    return this.stack2.peek();
  }

  dequeue() {
    this._moveStack1ToStack2IfNeeded();
    return this.stack2.pop();
  }

  size() {
    return this.stack1.size() + this.stack2.size();
  }

  _moveStack1ToStack2IfNeeded() {
    if (this.stack2.size() === 0) {
      while (this.stack1.size() > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
  }
}
