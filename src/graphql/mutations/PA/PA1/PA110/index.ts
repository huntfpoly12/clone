import findIncomeProcessWageDailyStatViews from "./findIncomeProcessWageDailyStatViews";
import changeIncomeProcessWageDailyStatus from "./changeIncomeProcessWageDailyStatus";
import deleteIncomeWageDailies from "./deleteIncomeWageDailies";
import createIncomeWageDaily from "./createIncomeWageDaily";
import changeIncomeWagePaymentDay from "./changeIncomeWagePaymentDay";
import sendIncomeWageDailyPayrollRegisterReportEmail from "./sendIncomeWageDailyPayrollRegisterReportEmail";
import sendIncomeWageDailySalaryStatementReportEmail from "./sendIncomeWageDailySalaryStatementReportEmail";
import updateIncomeWageDaily from "./updateIncomeWageDaily";

const mutations = {
  findIncomeProcessWageDailyStatViews: findIncomeProcessWageDailyStatViews,
  changeIncomeProcessWageDailyStatus: changeIncomeProcessWageDailyStatus,
  deleteIncomeWageDailies: deleteIncomeWageDailies,
  createIncomeWageDaily: createIncomeWageDaily,
  changeIncomeWagePaymentDay: changeIncomeWagePaymentDay,
  sendIncomeWageDailyPayrollRegisterReportEmail:
    sendIncomeWageDailyPayrollRegisterReportEmail,
  sendIncomeWageDailySalaryStatementReportEmail:
    sendIncomeWageDailySalaryStatementReportEmail,
  updateIncomeWageDaily: updateIncomeWageDaily,
};

export default mutations;
