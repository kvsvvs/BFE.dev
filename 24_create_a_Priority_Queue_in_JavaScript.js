class PriorityQueue {
  constructor(compare) {
    if (typeof compare !== "function") {
      throw new TypeError("Comparator must be a function.");
    }
    this.compare = compare;
    this.heap = [];
  }

  add(element) {
    this.heap.push(element);
    this._heapifyUp(this.heap.length - 1);
  }

  poll() {
    if (this.size() === 0) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);
    return top;
  }

  peek() {
    return this.size() > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  _heapifyUp(index) {
    let currentIndex = index;
    const element = this.heap[currentIndex];
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      const parent = this.heap[parentIndex];
      if (this.compare(element, parent) >= 0) {
        break;
      }
      this.heap[currentIndex] = parent;
      currentIndex = parentIndex;
    }
    this.heap[currentIndex] = element;
  }

  _heapifyDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    let currentIndex = index;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallest = currentIndex;

      if (
        leftChildIndex < length &&
        this.compare(this.heap[leftChildIndex], this.heap[smallest]) < 0
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.compare(this.heap[rightChildIndex], this.heap[smallest]) < 0
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === currentIndex) {
        break;
      }

      this.heap[currentIndex] = this.heap[smallest];
      currentIndex = smallest;
    }
    this.heap[currentIndex] = element;
  }
}

// Example usage
const pq = new PriorityQueue((a, b) => a - b);
pq.add(5);
pq.add(2);
pq.add(1);
console.log(pq.peek()); // 1
console.log(pq.poll()); // 1
console.log(pq.peek()); // 2
console.log(pq.poll()); // 2
console.log(pq.peek()); // 5
