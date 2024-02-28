interface CompareObject {
  [key: string]: unknown;
}

export function isEqual(objA: CompareObject, objB: CompareObject): boolean {
  // Check if both are the same reference
  if (objA === objB) return true;

  // If both are null or undefined and exactly the same
  if (
    objA == null ||
    objB == null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return objA === objB;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // If number of properties is different, objects are not equivalent
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Check if all properties in one object are in the other object
  return (
    keysA.every((key : string) => {
      const valA = objA[key];
      const valB = objB[key];
      return typeof valA === "object" && typeof valB === "object"
        ? isEqual(valA as CompareObject, valB as CompareObject)
        : valA === valB;
    }) && keysB.every((key) => keysA.includes(key))
  );
}
