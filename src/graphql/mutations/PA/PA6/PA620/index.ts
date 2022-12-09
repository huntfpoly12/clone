
import deleteIncomeBusinesses from "./deleteIncomeBusinesses";
import updateIncomeBusiness from "./updateIncomeBusiness";
import createIncomeBusiness from "./createIncomeBusiness";
import updateEmployeeBusiness from "./updateEmployeeBusiness";
import changeIncomeBusinessPaymentDay from "./changeIncomeBusinessPaymentDay";
const mutations = {
    deleteIncomeBusinesses: deleteIncomeBusinesses,
    createIncomeBusiness: createIncomeBusiness,
    updateIncomeBusiness: updateIncomeBusiness,
    updateEmployeeBusiness: updateEmployeeBusiness, 
    changeIncomeBusinessPaymentDay: changeIncomeBusinessPaymentDay, 
};

export default mutations;