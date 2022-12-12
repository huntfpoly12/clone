import getIncomeProcessWageDailies from "./getIncomeProcessWageDailies";
import getIncomeWageDailyPayrollRegisterViewUrl from "./getIncomeWageDailyPayrollRegisterViewUrl";
import getIncomeWageDailySalaryStatementViewUrl from "./getIncomeWageDailySalaryStatementViewUrl";
import getIncomeWageDaily from "./getIncomeWageDaily";
import getIncomeWageDailies from "./getIncomeWageDailies";
import getWithholdingConfigDeductionItems from "./getWithholdingConfigDeductionItems";
import getEmployeeWageDailies from "../PA520/getEmployeeWageDailies";
import calculateIncomeWageTax from "@/graphql/queries/common/calculateIncomeWageTax";
const queries = {
    getIncomeProcessWageDailies: getIncomeProcessWageDailies,
    getIncomeWageDailyPayrollRegisterViewUrl: getIncomeWageDailyPayrollRegisterViewUrl,
    getIncomeWageDailySalaryStatementViewUrl: getIncomeWageDailySalaryStatementViewUrl,
    getIncomeWageDaily: getIncomeWageDaily,
    getIncomeWageDailies: getIncomeWageDailies,
    getWithholdingConfigDeductionItems: getWithholdingConfigDeductionItems,
    getEmployeeWageDailies: getEmployeeWageDailies,
    calculateIncomeWageTax: calculateIncomeWageTax,
};
export default queries;
