import getEmployeeWages from "./getEmployeeWages";
import getEmployeeWage from "./getEmployeeWage";
import getDepartments from "../../../common/getDepartments";
import getResponsibilities from "../../../common/getResponsibilities";
const queries = {
  getEmployeeWages: getEmployeeWages,
  getEmployeeWage: getEmployeeWage,
  getDepartments: getDepartments,
  getResponsibilities: getResponsibilities,
};
export default queries;
