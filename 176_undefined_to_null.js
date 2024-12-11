function undefinedToNull(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => undefinedToNull(item));
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, undefinedToNull(value)])
    );
  } else if (obj === undefined) {
    return null;
  } else {
    return obj;
  }
}

console.log(undefinedToNull({ a: undefined, b: "BFE.dev" }));
// Output: { a: null, b: 'BFE.dev' }

console.log(undefinedToNull({ a: ["BFE.dev", undefined, "bigfrontend.dev"] }));
// Output: { a: ['BFE.dev', null, 'bigfrontend.dev'] }
