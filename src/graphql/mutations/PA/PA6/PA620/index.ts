
import deleteIncomeBusinesses from "./deleteIncomeBusinesses";
import updateIncomeBusiness from "./updateIncomeBusiness";
import createIncomeBusiness from "./createIncomeBusiness";
import updateEmployeeBusiness from "./updateEmployeeBusiness";
import changeIncomeBusinessPaymentDay from "./changeIncomeBusinessPaymentDay";
import copyIncomeBusinesses from "./copyIncomeBusinesses";
const mutations = {
    deleteIncomeBusinesses: deleteIncomeBusinesses,
    createIncomeBusiness: createIncomeBusiness,
    updateIncomeBusiness: updateIncomeBusiness,
    updateEmployeeBusiness: updateEmployeeBusiness, 
    changeIncomeBusinessPaymentDay: changeIncomeBusinessPaymentDay, 
    copyIncomeBusinesses: copyIncomeBusinesses, 
};

export default mutations;