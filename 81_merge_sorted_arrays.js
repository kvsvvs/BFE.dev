class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  push(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  pop() {
    if (this.size() === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  peek() {
    return this.heap[0] || null;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[index].value >= this.heap[parentIndex].value) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.size()) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      if (
        rightChildIndex < this.size() &&
        this.heap[rightChildIndex].value < this.heap[smallerChildIndex].value
      ) {
        smallerChildIndex = rightChildIndex;
      }
      if (this.heap[index].value <= this.heap[smallerChildIndex].value) break;
      [this.heap[index], this.heap[smallerChildIndex]] = [
        this.heap[smallerChildIndex],
        this.heap[index],
      ];
      index = smallerChildIndex;
    }
  }
}

function merge(sortedArrays) {
  const minHeap = new MinHeap();
  const result = [];

  for (let i = 0; i < sortedArrays.length; i++) {
    if (sortedArrays[i].length > 0) {
      minHeap.push({
        value: sortedArrays[i][0],
        arrayIndex: i,
        elementIndex: 0,
      });
    }
  }

  while (minHeap.size() > 0) {
    const { value, arrayIndex, elementIndex } = minHeap.pop();
    result.push(value);

    const nextElementIndex = elementIndex + 1;
    if (nextElementIndex < sortedArrays[arrayIndex].length) {
      minHeap.push({
        value: sortedArrays[arrayIndex][nextElementIndex],
        arrayIndex,
        elementIndex: nextElementIndex,
      });
    }
  }

  return result;
}

// Example usage
const mergedArray = merge([
  [1, 1, 1, 100, 1000, 10000],
  [1, 2, 2, 2, 200, 200, 1000],
  [1000000, 10000001],
  [2, 3, 3],
]);
console.log(mergedArray);
