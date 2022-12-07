import getIncomeProcessExtras from "./getIncomeProcessExtras";
import findIncomeProcessExtraStatViews from "./findIncomeProcessExtraStatViews";
import changeIncomeProcessExtraStatus from "./changeIncomeProcessExtraStatus";
import getIncomeExtras from "./getIncomeExtras";
const queries = {
    getIncomeProcessExtras: getIncomeProcessExtras,
    changeIncomeProcessExtraStatus: changeIncomeProcessExtraStatus,
    findIncomeProcessExtraStatViews: findIncomeProcessExtraStatViews,
    getIncomeExtras: getIncomeExtras,
};
export default queries;