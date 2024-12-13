class BrowserHistory {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  visit(url) {
    // Remove any forward history
    this.history = this.history.slice(0, this.currentIndex + 1);
    // Add the new URL
    this.history.push(url);
    // Update the current index to the new entry
    this.currentIndex = this.history.length - 1;
  }

  goBack() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null; // Cannot go back
  }

  forward() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null; // Cannot go forward
  }

  getCurrent() {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex];
    }
    return null; // No current URL
  }
}

// Example usage:
const browserHistory = new BrowserHistory();
browserHistory.visit("A");
browserHistory.visit("B");
browserHistory.visit("C");
console.log(browserHistory.getCurrent()); // Output: 'C'
console.log(browserHistory.goBack()); // Output: 'B'
console.log(browserHistory.goBack()); // Output: 'A'
console.log(browserHistory.forward()); // Output: 'B'
browserHistory.visit("D");
console.log(browserHistory.getCurrent()); // Output: 'D'
console.log(browserHistory.forward()); // Output: null
