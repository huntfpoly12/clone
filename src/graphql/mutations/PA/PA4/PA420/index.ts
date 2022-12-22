
import deleteIncomeRetirements from "./deleteIncomeRetirements";
import updateIncomeRetirement from "./updateIncomeRetirement";
import createIncomeBusiness from "./createIncomeBusiness";
import updateEmployeeBusiness from "./updateEmployeeBusiness";
import changeIncomeBusinessPaymentDay from "./changeIncomeBusinessPaymentDay";
import copyIncomeBusinesses from "./copyIncomeBusinesses";
import createIncomeRetirement from "./createIncomeRetirement";
import changeIncomeProcessRetirementStatus from "./changeIncomeProcessRetirementStatus";
const mutations = {
    deleteIncomeRetirements: deleteIncomeRetirements,
    createIncomeBusiness: createIncomeBusiness,
    updateIncomeRetirement: updateIncomeRetirement,
    updateEmployeeBusiness: updateEmployeeBusiness,
    changeIncomeBusinessPaymentDay: changeIncomeBusinessPaymentDay,
    copyIncomeBusinesses: copyIncomeBusinesses,
    createIncomeRetirement: createIncomeRetirement,
    changeIncomeProcessRetirementStatus : changeIncomeProcessRetirementStatus
};

export default mutations;