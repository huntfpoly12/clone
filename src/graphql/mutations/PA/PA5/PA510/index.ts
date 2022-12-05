import deleteIncomeWageDailies from "./deleteIncomeWageDailies";
import createIncomeWageDaily from "./createIncomeWageDaily";
import updateIncomeWageDaily from "./updateIncomeWageDaily";
import sendIncomeWageDailyPayrollRegisterReportEmail from "./sendIncomeWageDailyPayrollRegisterReportEmail";
import sendIncomeWageDailySalaryStatementReportEmail from "./sendIncomeWageDailySalaryStatementReportEmail";
const mutations = {
    deleteIncomeWageDailies: deleteIncomeWageDailies,
    createIncomeWageDaily: createIncomeWageDaily,
    updateIncomeWageDaily: updateIncomeWageDaily,
    sendIncomeWageDailyPayrollRegisterReportEmail: sendIncomeWageDailyPayrollRegisterReportEmail,
    sendIncomeWageDailySalaryStatementReportEmail: sendIncomeWageDailySalaryStatementReportEmail,
};

export default mutations;