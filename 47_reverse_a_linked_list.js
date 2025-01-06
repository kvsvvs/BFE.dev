class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseLinkedList(head) {
  if (!head || !(head instanceof Node)) {
    throw new TypeError("Expected head to be an instance of Node");
  }

  let prev = null;
  let current = head;
  let next = null;

  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

// Example usage
const three = new Node(3, null);
const two = new Node(2, three);
const one = new Node(1, two);

// Original linked list: 1 → 2 → 3
console.log("Original Linked List:");
let temp = one;
while (temp) {
  console.log(temp.val);
  temp = temp.next;
}

const reversedHead = reverseLinkedList(one);

// Reversed linked list: 3 → 2 → 1
console.log("Reversed Linked List:");
temp = reversedHead;
while (temp) {
  console.log(temp.val);
  temp = temp.next;
}
