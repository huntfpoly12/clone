import changeIncomeProcessWageStatus from "./changeIncomeProcessWageStatus";
import deleteIncomeWages from "./deleteIncomeWages";
import createIncomeWage from "./createIncomeWage";
import changeIncomeWagePaymentDay from "./changeIncomeWagePaymentDay";
import sendIncomeWagePayrollRegisterReportEmail from "./sendIncomeWagePayrollRegisterReportEmail";
import sendIncomeWageSalaryStatementReportEmail from "./sendIncomeWageSalaryStatementReportEmail";
import updateIncomeWage from "./updateIncomeWage";
import copyIncomeWages from "./copyIncomeWages";
import findIncomeProcessWageStatViews from "./findIncomeProcessWageStatViews";
import deleteMidTermSettlement from "./deleteMidTermSettlement";

const mutations = {
    changeIncomeProcessWageStatus: changeIncomeProcessWageStatus,
    deleteIncomeWages: deleteIncomeWages,
    createIncomeWage: createIncomeWage,
    changeIncomeWagePaymentDay: changeIncomeWagePaymentDay,
    sendIncomeWagePayrollRegisterReportEmail: sendIncomeWagePayrollRegisterReportEmail,
    sendIncomeWageSalaryStatementReportEmail: sendIncomeWageSalaryStatementReportEmail,
    updateIncomeWage: updateIncomeWage,
    copyIncomeWages: copyIncomeWages,
    findIncomeProcessWageStatViews: findIncomeProcessWageStatViews,
    deleteMidTermSettlement: deleteMidTermSettlement,
};

export default mutations;
