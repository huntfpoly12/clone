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
export { compareObject };
