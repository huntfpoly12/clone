import createEmployeeWage from "./createEmployeeWage";
import saveEmployeeWagePayDeductionReduction from "./saveEmployeeWagePayDeductionReduction";
import deleteEmployeeWage from "./deleteEmployeeWage";
import updateEmployeeWage from "./updateEmployeeWage";
const mutations = {
  updateEmployeeWage: updateEmployeeWage,
  createEmployeeWage: createEmployeeWage,
  saveEmployeeWagePayDeductionReduction: saveEmployeeWagePayDeductionReduction,
  deleteEmployeeWage: deleteEmployeeWage,
};

export default mutations;
