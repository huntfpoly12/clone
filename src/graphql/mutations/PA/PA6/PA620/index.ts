
import deleteIncomeBusinesses from "./deleteIncomeBusinesses";
import updateIncomeBusiness from "./updateIncomeBusiness";
import createIncomeBusiness from "./createIncomeBusiness";
import updateEmployeeBusiness from "./updateEmployeeBusiness";
import changeIncomeRetirementPaymentDay from "./changeIncomeRetirementPaymentDay";
import copyIncomeBusinesses from "./copyIncomeBusinesses";
const mutations = {
    deleteIncomeBusinesses: deleteIncomeBusinesses,
    createIncomeBusiness: createIncomeBusiness,
    updateIncomeBusiness: updateIncomeBusiness,
    updateEmployeeBusiness: updateEmployeeBusiness, 
    changeIncomeRetirementPaymentDay: changeIncomeRetirementPaymentDay, 
    copyIncomeBusinesses: copyIncomeBusinesses, 
};

export default mutations;