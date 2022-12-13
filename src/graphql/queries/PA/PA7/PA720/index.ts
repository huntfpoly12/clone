import getIncomeProcessExtras from "./getIncomeProcessExtras";
import findIncomeProcessExtraStatViews from "./findIncomeProcessExtraStatViews";
import getIncomeExtras from "./getIncomeExtras";
import getIncomeExtra from "./getIncomeExtra";
import getIncomeExtrasLogs from "./getIncomeExtrasLogs.js";
import getEmployeeExtras from "../PA710/getEmployeeExtras";
const queries = {
    getIncomeProcessExtras: getIncomeProcessExtras,
    findIncomeProcessExtraStatViews: findIncomeProcessExtraStatViews,
    getIncomeExtras: getIncomeExtras,
    getIncomeExtra: getIncomeExtra,
    getIncomeExtrasLogs: getIncomeExtrasLogs,
    getEmployeeExtras: getEmployeeExtras,
};
export default queries;