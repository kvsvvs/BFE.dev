const findCorrespondingNode = (rootA, rootB, target) => {
  let toVisitA = [rootA];
  let toVisitB = [rootB];

  while (toVisitA.length) {
    const poppedA = toVisitA.shift();
    const poppedB = toVisitB.shift();

    if (poppedA === target) {
      return poppedB;
    } else {
      toVisitA.push(...poppedA.children);
      toVisitB.push(...poppedB.children);
    }
  }
};
