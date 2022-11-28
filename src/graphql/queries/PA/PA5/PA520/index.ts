import getEmployeeWageDailies from "./getEmployeeWageDailies";
import getDepartments from "../../../common/getDepartments";
import getResponsibilities from "../../../common/getResponsibilities";
import getEmployeeWageDaily from "./getEmployeeWageDaily";
import getWithholdingConfigPayItems from "./getWithholdingConfigPayItems";

const queries = {
    getEmployeeWageDailies: getEmployeeWageDailies,
    getDepartments: getDepartments,
    getResponsibilities: getResponsibilities,
    getEmployeeWageDaily: getEmployeeWageDaily,
    getWithholdingConfigPayItems: getWithholdingConfigPayItems,
};
export default queries;