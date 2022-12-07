import getIncomeProcessWageDailies from "./getIncomeProcessWageDailies";
import getIncomeWageDailyPayrollRegisterViewUrl from "./getIncomeWageDailyPayrollRegisterViewUrl";
import getIncomeWageDailySalaryStatementViewUrl from "./getIncomeWageDailySalaryStatementViewUrl";
import getIncomeWageDaily from "./getIncomeWageDaily";
import getIncomeWageDailies from "./getIncomeWageDailies";
import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems";
const queries = {
    getIncomeProcessWageDailies: getIncomeProcessWageDailies,
    getIncomeWageDailyPayrollRegisterViewUrl: getIncomeWageDailyPayrollRegisterViewUrl,
    getIncomeWageDailySalaryStatementViewUrl: getIncomeWageDailySalaryStatementViewUrl,
    getIncomeWageDaily: getIncomeWageDaily,
    getIncomeWageDailies: getIncomeWageDailies,
    getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
};
export default queries;