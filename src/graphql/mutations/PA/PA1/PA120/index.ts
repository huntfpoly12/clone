import createEmployeeWage from "./createEmployeeWage";
import saveEmployeeWagePayDeductionReduction from "./saveEmployeeWagePayDeductionReduction";
import deleteEmployeeWage from "./deleteEmployeeWage";
import updateEmployeeWage from "./updateEmployeeWage";
import createEmployeeWageDependent from "./createEmployeeWageDependent";
const mutations = {
  updateEmployeeWage: updateEmployeeWage,
  createEmployeeWage: createEmployeeWage,
  saveEmployeeWagePayDeductionReduction: saveEmployeeWagePayDeductionReduction,
  deleteEmployeeWage: deleteEmployeeWage,
  createEmployeeWageDependent:createEmployeeWageDependent
};

export default mutations;
