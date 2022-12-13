import deleteIncomeWageDailies from "./deleteIncomeWageDailies";
import createIncomeWageDaily from "./createIncomeWageDaily";
import updateIncomeWageDaily from "./updateIncomeWageDaily";
import sendIncomeWageDailyPayrollRegisterReportEmail from "./sendIncomeWageDailyPayrollRegisterReportEmail";
import sendIncomeWageDailySalaryStatementReportEmail from "./sendIncomeWageDailySalaryStatementReportEmail";
import copyIncomeWageDailies from "./copyIncomeWageDailies";
import changeIncomeProcessWageDailyStatus from "./changeIncomeProcessWageDailyStatus";
import changeIncomeWagePaymentDay from "../../PA1/PA110/changeIncomeWagePaymentDay";
const mutations = {
    deleteIncomeWageDailies: deleteIncomeWageDailies,
    createIncomeWageDaily: createIncomeWageDaily,
    updateIncomeWageDaily: updateIncomeWageDaily,
    sendIncomeWageDailyPayrollRegisterReportEmail: sendIncomeWageDailyPayrollRegisterReportEmail,
    sendIncomeWageDailySalaryStatementReportEmail: sendIncomeWageDailySalaryStatementReportEmail,
    copyIncomeWageDailies: copyIncomeWageDailies,
    changeIncomeProcessWageDailyStatus: changeIncomeProcessWageDailyStatus,
    changeIncomeWagePaymentDay: changeIncomeWagePaymentDay,
};

export default mutations;