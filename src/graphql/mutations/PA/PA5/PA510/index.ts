import deleteIncomeWageDailies from "./deleteIncomeWageDailies";
import createIncomeWageDaily from "./createIncomeWageDaily";
import updateIncomeWageDaily from "./updateIncomeWageDaily";
import sendIncomeWageDailyPayrollRegisterReportEmail from "./sendIncomeWageDailyPayrollRegisterReportEmail";
import sendIncomeWageDailySalaryStatementReportEmail from "./sendIncomeWageDailySalaryStatementReportEmail";
import copyIncomeWageDailies from "./copyIncomeWageDailies";
import changeIncomeProcessWageDailyStatus from "./changeIncomeProcessWageDailyStatus";
const mutations = {
    deleteIncomeWageDailies: deleteIncomeWageDailies,
    createIncomeWageDaily: createIncomeWageDaily,
    updateIncomeWageDaily: updateIncomeWageDaily,
    sendIncomeWageDailyPayrollRegisterReportEmail: sendIncomeWageDailyPayrollRegisterReportEmail,
    sendIncomeWageDailySalaryStatementReportEmail: sendIncomeWageDailySalaryStatementReportEmail,
    copyIncomeWageDailies: copyIncomeWageDailies,
    changeIncomeProcessWageDailyStatus: changeIncomeProcessWageDailyStatus,
};

export default mutations;