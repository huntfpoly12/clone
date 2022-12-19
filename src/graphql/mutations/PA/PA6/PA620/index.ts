import deleteIncomeBusinesses from "./deleteIncomeBusinesses";
import updateIncomeBusiness from "./updateIncomeBusiness";
import createIncomeBusiness from "./createIncomeBusiness";
import updateEmployeeBusiness from "./updateEmployeeBusiness";
import changeIncomeBusinessPaymentDay from "./changeIncomeBusinessPaymentDay";
import changeIncomeProcessBusinessStatus from "./changeIncomeProcessBusinessStatus";
import copyIncomeBusinesses from "./copyIncomeBusinesses";
const mutations = {
  deleteIncomeBusinesses: deleteIncomeBusinesses,
  createIncomeBusiness: createIncomeBusiness,
  updateIncomeBusiness: updateIncomeBusiness,
  updateEmployeeBusiness: updateEmployeeBusiness,
  changeIncomeBusinessPaymentDay: changeIncomeBusinessPaymentDay,
  changeIncomeProcessBusinessStatus: changeIncomeProcessBusinessStatus,
  copyIncomeBusinesses: copyIncomeBusinesses,
};

export default mutations;
