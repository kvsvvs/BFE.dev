function myExtends(SuperType, SubType) {
  // Step 1: Create a new function that acts as the constructor
  function InheritedSubType() {
    // Call the SuperType constructor
    SuperType.apply(this, arguments);
    // Call the SubType constructor
    SubType.apply(this, arguments);
  }

  // Step 2: Create an intermediate object to set up prototype inheritance
  function TempConstructor() {}
  TempConstructor.prototype = SuperType.prototype;

  // Step 3: Set the prototype of InheritedSubType to an instance of TempConstructor
  InheritedSubType.prototype = new TempConstructor();
  InheritedSubType.prototype.constructor = InheritedSubType;

  // Step 4: Copy SubType prototype methods to the new type
  for (var key in SubType.prototype) {
    if (SubType.prototype.hasOwnProperty(key)) {
      InheritedSubType.prototype[key] = SubType.prototype[key];
    }
  }

  // Step 5: Copy static properties from SuperType and SubType to InheritedSubType
  for (var key in SuperType) {
    if (SuperType.hasOwnProperty(key)) {
      InheritedSubType[key] = SuperType[key];
    }
  }
  for (var key in SubType) {
    if (SubType.hasOwnProperty(key)) {
      InheritedSubType[key] = SubType[key];
    }
  }

  return InheritedSubType;
}
