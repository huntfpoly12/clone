
import deleteIncomeRetirements from "./deleteIncomeRetirements";
import updateIncomeBusiness from "./updateIncomeBusiness";
import createIncomeBusiness from "./createIncomeBusiness";
import updateEmployeeBusiness from "./updateEmployeeBusiness";
import changeIncomeBusinessPaymentDay from "./changeIncomeBusinessPaymentDay";
import copyIncomeBusinesses from "./copyIncomeBusinesses";
const mutations = {
    deleteIncomeRetirements: deleteIncomeRetirements,
    createIncomeBusiness: createIncomeBusiness,
    updateIncomeBusiness: updateIncomeBusiness,
    updateEmployeeBusiness: updateEmployeeBusiness, 
    changeIncomeBusinessPaymentDay: changeIncomeBusinessPaymentDay, 
    copyIncomeBusinesses: copyIncomeBusinesses, 
};

export default mutations;