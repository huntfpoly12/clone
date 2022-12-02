import getEmployeeWages from "./getEmployeeWages";
import getEmployeeWage from "./getEmployeeWage";
import getWithholdingConfigPayItem from "./getWithholdingConfigPayItem";
import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems";
import getDepartments from "../../../common/getDepartments";
import getResponsibilities from "../../../common/getResponsibilities";
const queries = {
  getEmployeeWages: getEmployeeWages,
  getEmployeeWage: getEmployeeWage,
  getDepartments: getDepartments,
  getResponsibilities: getResponsibilities,
  getWithholdingConfigPayItem: getWithholdingConfigPayItem,
  getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
};
export default queries;
