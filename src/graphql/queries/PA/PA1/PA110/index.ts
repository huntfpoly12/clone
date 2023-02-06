import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems";
import getIncomeWagePayrollRegisterViewUrl from "./getIncomeWagePayrollRegisterViewUrl";
import getIncomeWageSalaryStatementViewUrl from "./getIncomeWageSalaryStatementViewUrl";
import calculateIncomeWageTax from "@/graphql/queries/common/calculateIncomeWageTax";
import getIncomeProcessWages from "./getIncomeProcessWages";
import getIncomeWages from "./getIncomeWages";
import getIncomeWage from "./getIncomeWage";
import getEmployeeWages from "./getEmployeeWages";
import getWithholdingConfigPayItems from "./getWithholdingConfigPayItems";
import getWithholdingConfig from "../../../CM/CM130/getWithholdingConfig";
const queries = {
  getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
  getIncomeWagePayrollRegisterViewUrl: getIncomeWagePayrollRegisterViewUrl,
  getIncomeWageSalaryStatementViewUrl: getIncomeWageSalaryStatementViewUrl,
  calculateIncomeWageTax: calculateIncomeWageTax,
  getIncomeProcessWages: getIncomeProcessWages,
  getIncomeWages: getIncomeWages,
  getIncomeWage: getIncomeWage,
  getEmployeeWages: getEmployeeWages,
  getWithholdingConfigPayItems: getWithholdingConfigPayItems,
  getWithholdingConfig: getWithholdingConfig,
};
export default queries;
