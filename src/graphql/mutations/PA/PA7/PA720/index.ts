
import deleteIncomeExtras from "./deleteIncomeExtras";
import changeIncomeExtraPaymentDay from "./changeIncomeExtraPaymentDay";
import createIncomeExtra from "./createIncomeExtra";
import changeIncomeProcessExtraStatus from "./changeIncomeProcessExtraStatus";
import copyIncomeExtras from "./copyIncomeExtras";
import updateIncomeExtra from "./updateIncomeExtra";

const mutations = {
    deleteIncomeExtras: deleteIncomeExtras,
    createIncomeExtra: createIncomeExtra,
    changeIncomeExtraPaymentDay: changeIncomeExtraPaymentDay,
    changeIncomeProcessExtraStatus: changeIncomeProcessExtraStatus,
    copyIncomeExtras: copyIncomeExtras,
    updateIncomeExtra: updateIncomeExtra,
};

export default mutations;