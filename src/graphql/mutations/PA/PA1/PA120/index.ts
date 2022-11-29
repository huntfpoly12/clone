import createEmployeeWage from "./createEmployeeWage";
import saveEmployeeWagePayDeductionReduction from "./saveEmployeeWagePayDeductionReduction";
import deleteEmployeeWage from "./deleteEmployeeWage";
import updateEmployeeWage from "./updateEmployeeWage";
import updateEmployeeWageDependent from "./updateEmployeeWageDependent";
import deleteEmployeeWageDependent from "./deleteEmployeeWageDependent";
const mutations = {
  updateEmployeeWage: updateEmployeeWage,
  updateEmployeeWageDependent: updateEmployeeWageDependent,
  createEmployeeWage: createEmployeeWage,
  saveEmployeeWagePayDeductionReduction: saveEmployeeWagePayDeductionReduction,
  deleteEmployeeWage: deleteEmployeeWage,
  deleteEmployeeWageDependent: deleteEmployeeWageDependent,
};

export default mutations;
