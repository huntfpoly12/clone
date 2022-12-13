import getEmployeeWages from "./getEmployeeWages";
import getEmployeeWage from "./getEmployeeWage";
import getWithholdingConfigPayItems from "./getWithholdingConfigPayItems";
import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems";
import getDepartments from "../../../common/getDepartments";
import getResponsibilities from "../../../common/getResponsibilities";
import calculateIncomeWageTax from "@/graphql/queries/common/calculateIncomeWageTax";
const queries = {
  calculateIncomeWageTax: calculateIncomeWageTax,
  getEmployeeWages: getEmployeeWages,
  getEmployeeWage: getEmployeeWage,
  getDepartments: getDepartments,
  getResponsibilities: getResponsibilities,
  getWithholdingConfigPayItems: getWithholdingConfigPayItems,
  getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
};
export default queries;
