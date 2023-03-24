function isEqualObject(obj1: any, obj2: any) {
  const obj1Keys = obj1 && Object.getOwnPropertyNames(obj1);
  const obj2Keys = obj2 && Object.getOwnPropertyNames(obj2);
  if (!obj1Keys || !obj2Keys || obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  // Check if the values are equal
  for (let key of obj1Keys) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

export { isEqualObject };
