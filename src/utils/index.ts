const compareObject = (obj1: any, obj2: any) => {
  if (obj1 && obj2) {
    return (
      JSON.stringify({
        ...obj1,
        key: 1,
        employeeId: +obj1.employeeId,
        nationality: obj1.nationality ? obj1.nationality : null,
      }) ===
      JSON.stringify({
        ...obj2,
        key: 1,
        employeeId: +obj2.employeeId,
        nationality: obj1.nationality ? obj1.nationality : null,
      })
    );
  } else return false;
};

function isEqualObject(obj1: any, obj2: any) {
  const obj1Keys = Object.getOwnPropertyNames(obj1);
  const obj2Keys = Object.getOwnPropertyNames(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
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

export { compareObject, isEqualObject };
