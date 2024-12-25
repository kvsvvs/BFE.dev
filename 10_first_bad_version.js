function findFirstBadVersion(n, isBad) {
  if (n === 0) {
    return -1;
  }

  let left = 0;
  let right = n - 1;
  let firstBad = -1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);

    if (isBad(mid)) {
      firstBad = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return firstBad;
}

function isBadMock(version) {
  return version >= 4;
}

const n = 10;
const firstBad = findFirstBadVersion(n, isBadMock);
console.log(firstBad); // Expected output: 4

function isBadAllGood() {
  return false;
}

console.log(findFirstBadVersion(n, isBadAllGood));
