function shuffle(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
}

const arr = [1, 2, 3, 4];
shuffle(arr);
console.log(arr); // Output: A randomly shuffled array
