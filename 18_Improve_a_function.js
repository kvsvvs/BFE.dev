function excludeItems(items, excludes) {
  const exclusionSet = new Set(excludes.map((pair) => `${pair.k}:${pair.v}`));

  return items.filter(
    (item) =>
      !Object.keys(item).some((key) => exclusionSet.has(`${key}:${item[key]}`))
  );
}
