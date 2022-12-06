import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems";
import getIncomeWagePayrollRegisterViewUrl from "./getIncomeWagePayrollRegisterViewUrl";
import getIncomeWageSalaryStatementViewUrl from "./getIncomeWageSalaryStatementViewUrl";
import calculateIncomeWageTax from "./calculateIncomeWageTax";
import getIncomeProcessWages from "./getIncomeProcessWages";
import getIncomeWages from "./getIncomeWages";
import getIncomeWage from "./getIncomeWage";
import getWithholdingConfigPayItems from "./getWithholdingConfigPayItems";
const queries = {
  getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
  getIncomeWagePayrollRegisterViewUrl: getIncomeWagePayrollRegisterViewUrl,
  getIncomeWageSalaryStatementViewUrl: getIncomeWageSalaryStatementViewUrl,
  calculateIncomeWageTax: calculateIncomeWageTax,
  getIncomeProcessWages: getIncomeProcessWages,
  getIncomeWages: getIncomeWages,
  getIncomeWage: getIncomeWage,
  getWithholdingConfigPayItems: getWithholdingConfigPayItems,
};
export default queries;
