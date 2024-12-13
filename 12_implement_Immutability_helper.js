function update(target, spec) {
  if (typeof spec !== "object" || spec === null) {
    throw new Error("Spec must be a valid object.");
  }

  if (Array.isArray(target)) {
    return applyArrayUpdate(target, spec);
  }

  if (target instanceof Map || target instanceof Set) {
    return applyCollectionUpdate(target, spec);
  }

  if (typeof target === "object") {
    return applyObjectUpdate(target, spec);
  }

  throw new Error("Target must be an array, object, Map, or Set.");
}

function applyArrayUpdate(array, spec) {
  const newArray = [...array];

  for (const key in spec) {
    if (key === "$push") {
      if (!Array.isArray(spec[key])) {
        throw new Error("$push expects an array.");
      }
      return newArray.concat(spec[key]);
    } else if (key === "$set") {
      return spec[key];
    } else if (key === "$apply") {
      if (typeof spec[key] !== "function") {
        throw new Error("$apply expects a function.");
      }
      return spec[key](newArray);
    } else if (key === "$splice") {
      if (!Array.isArray(spec[key])) {
        throw new Error("$splice expects an array of operations.");
      }
      spec[key].forEach(([start, deleteCount, ...items]) => {
        newArray.splice(start, deleteCount, ...items);
      });
    } else if (key === "$swap") {
      const [index1, index2] = spec[key];
      [newArray[index1], newArray[index2]] = [
        newArray[index2],
        newArray[index1],
      ];
    } else if (key === "$prepend") {
      if (!Array.isArray(spec[key])) {
        throw new Error("$prepend expects an array.");
      }
      return spec[key].concat(newArray);
    } else if (key === "$shift") {
      newArray.shift();
    } else if (key === "$pop") {
      newArray.pop();
    } else if (key === "$replace") {
      const { find, value } = spec[key];
      const index = newArray.indexOf(find);
      if (index !== -1) newArray[index] = value;
    } else if (key === "$filter") {
      if (typeof spec[key] !== "function") {
        throw new Error("$filter expects a function.");
      }
      return newArray.filter(spec[key]);
    } else {
      newArray[key] = update(array[key], spec[key]);
    }
  }

  return newArray;
}

function applyObjectUpdate(object, spec) {
  const newObject = { ...object };

  for (const key in spec) {
    if (key === "$set") {
      return spec[key];
    } else if (key === "$merge") {
      if (typeof spec[key] !== "object" || spec[key] === null) {
        throw new Error("$merge expects a valid object.");
      }
      return { ...newObject, ...spec[key] };
    } else if (key === "$apply") {
      if (typeof spec[key] !== "function") {
        throw new Error("$apply expects a function.");
      }
      return spec[key](newObject);
    } else if (key === "$unset") {
      if (!Array.isArray(spec[key])) {
        throw new Error("$unset expects an array of keys.");
      }
      spec[key].forEach((unsetKey) => delete newObject[unsetKey]);
    } else if (key === "$assign") {
      if (typeof spec[key] !== "object" || spec[key] === null) {
        throw new Error("$assign expects a valid object.");
      }
      Object.assign(newObject, spec[key]);
    } else if (key === "$deepMerge") {
      if (typeof spec[key] !== "object" || spec[key] === null) {
        throw new Error("$deepMerge expects a valid object.");
      }
      for (const deepKey in spec[key]) {
        newObject[deepKey] = update(newObject[deepKey], {
          $deepMerge: spec[key][deepKey],
        });
      }
    } else if (key === "$defaults") {
      if (typeof spec[key] !== "object" || spec[key] === null) {
        throw new Error("$defaults expects a valid object.");
      }
      for (const defaultKey in spec[key]) {
        if (!(defaultKey in newObject)) {
          newObject[defaultKey] = spec[key][defaultKey];
        }
      }
    } else if (key === "$toggle") {
      if (!Array.isArray(spec[key])) {
        throw new Error("$toggle expects an array of keys.");
      }
      spec[key].forEach((toggleKey) => {
        if (typeof newObject[toggleKey] === "boolean") {
          newObject[toggleKey] = !newObject[toggleKey];
        }
      });
    } else {
      newObject[key] = update(object[key], spec[key]);
    }
  }

  return newObject;
}

function applyCollectionUpdate(collection, spec) {
  if (collection instanceof Map) {
    const newMap = new Map(collection);

    for (const key in spec) {
      if (key === "$add") {
        spec[key].forEach(([mapKey, value]) => newMap.set(mapKey, value));
      } else if (key === "$remove") {
        spec[key].forEach((mapKey) => newMap.delete(mapKey));
      } else {
        throw new Error(`Unsupported operation for Map: ${key}`);
      }
    }

    return newMap;
  }

  if (collection instanceof Set) {
    const newSet = new Set(collection);

    for (const key in spec) {
      if (key === "$add") {
        spec[key].forEach((value) => newSet.add(value));
      } else if (key === "$remove") {
        spec[key].forEach((value) => newSet.delete(value));
      } else {
        throw new Error(`Unsupported operation for Set: ${key}`);
      }
    }

    return newSet;
  }

  throw new Error("Collection must be a Map or Set.");
}
