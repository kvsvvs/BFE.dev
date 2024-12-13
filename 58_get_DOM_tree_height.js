function getDomTreeHeight(root) {
  if (!root) return 0;

  function calculateHeight(node) {
    if (!node.children || node.children.length === 0) return 1;

    const childHeights = Array.from(node.children).map(calculateHeight);
    return 1 + Math.max(...childHeights);
  }

  return calculateHeight(root);
}

// Example usage:
const rootElement = document.querySelector("div");
console.log(getDomTreeHeight(rootElement)); // Output: 4 for the provided example
