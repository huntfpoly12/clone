import createEmployeeWage from "./createEmployeeWage";
import saveEmployeeWagePayDeductionReduction from "./saveEmployeeWagePayDeductionReduction";
import deleteEmployeeWage from "./deleteEmployeeWage";
import updateEmployeeWage from "./updateEmployeeWage";
import updateEmployeeWageDependent from "./updateEmployeeWageDependent";
import deleteEmployeeWageDependent from "./deleteEmployeeWageDependent";
import createEmployeeWageDependent from "./createEmployeeWageDependent";
const mutations = {
  updateEmployeeWage: updateEmployeeWage,
  updateEmployeeWageDependent: updateEmployeeWageDependent,
  createEmployeeWage: createEmployeeWage,
  saveEmployeeWagePayDeductionReduction: saveEmployeeWagePayDeductionReduction,
  deleteEmployeeWage: deleteEmployeeWage,
  deleteEmployeeWageDependent: deleteEmployeeWageDependent,
  createEmployeeWageDependent:createEmployeeWageDependent
};

export default mutations;
