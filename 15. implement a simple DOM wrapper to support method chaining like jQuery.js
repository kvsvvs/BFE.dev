class DomWrapper {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
  }

  css(propertyName, value) {
    this.elements.forEach((element) => {
      element.style[propertyName] = value;
    });
    return this; // Enable chaining by returning the instance
  }
}

const $ = (selector) => new DomWrapper(selector);

// Usage example
$("#button")
  .css("color", "#fff")
  .css("backgroundColor", "#000")
  .css("fontWeight", "bold");
