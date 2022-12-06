import getEmployeeWageDailies from "./getEmployeeWageDailies";
import getIncomeWageDaily from "./getIncomeWageDaily";
import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems";
import getIncomeProcessWageDailies from "./getIncomeProcessWageDailies";
import getIncomeWageDailyPayrollRegisterViewUrl from "./getIncomeWageDailyPayrollRegisterViewUrl";
import getIncomeWageDailySalaryStatementViewUrl from "./getIncomeWageDailySalaryStatementViewUrl";
import calculateIncomeWageTax from "./calculateIncomeWageTax";
const queries = {
  getIncomeProcessWageDailies: getIncomeProcessWageDailies,
  getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
  getIncomeWageDaily: getIncomeWageDaily,
  getEmployeeWageDailies: getEmployeeWageDailies,
  getIncomeWageDailyPayrollRegisterViewUrl:
    getIncomeWageDailyPayrollRegisterViewUrl,
  getIncomeWageDailySalaryStatementViewUrl:
    getIncomeWageDailySalaryStatementViewUrl,
  calculateIncomeWageTax: calculateIncomeWageTax,
};
export default queries;
