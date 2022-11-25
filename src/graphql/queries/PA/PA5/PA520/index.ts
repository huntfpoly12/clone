import getEmployeeWageDailies from "./getEmployeeWageDailies";
import getDepartments from "../../../common/getDepartments";
import getResponsibilities from "../../../common/getResponsibilities";
import getEmployeeWageDaily from "./getEmployeeWageDaily";

const queries = {
    getEmployeeWageDailies: getEmployeeWageDailies,
    getDepartments: getDepartments,
    getResponsibilities: getResponsibilities,
    getEmployeeWageDaily: getEmployeeWageDaily,
};
export default queries;