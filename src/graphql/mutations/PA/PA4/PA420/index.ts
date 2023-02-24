
import deleteIncomeRetirements from "./deleteIncomeRetirements";
import updateIncomeRetirement from "./updateIncomeRetirement";
import createIncomeBusiness from "./createIncomeBusiness";
import updateEmployeeBusiness from "./updateEmployeeBusiness";
import changeIncomeRetirementPaymentDay from "./changeIncomeRetirementPaymentDay";
import copyIncomeBusinesses from "./copyIncomeBusinesses";
import createIncomeRetirement from "./createIncomeRetirement";
import changeIncomeProcessRetirementStatus from "./changeIncomeProcessRetirementStatus";
const mutations = {
    deleteIncomeRetirements: deleteIncomeRetirements,
    createIncomeBusiness: createIncomeBusiness,
    updateIncomeRetirement: updateIncomeRetirement,
    updateEmployeeBusiness: updateEmployeeBusiness,
    changeIncomeRetirementPaymentDay: changeIncomeRetirementPaymentDay,
    copyIncomeBusinesses: copyIncomeBusinesses,
    createIncomeRetirement: createIncomeRetirement,
    changeIncomeProcessRetirementStatus : changeIncomeProcessRetirementStatus
};

export default mutations;
