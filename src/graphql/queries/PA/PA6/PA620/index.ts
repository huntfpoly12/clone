import getIncomeProcessBusinesses from "./getIncomeProcessBusinesses";
import getIncomeBusinesses from "./getIncomeBusinesses";
import getIncomeBusiness from "./getIncomeBusiness";
import getEmployeeBusinesses from "../PA610/getEmployeeBusinesses";
import findIncomeProcessBusinessStatViews from "./findIncomeProcessBusinessStatViews"

const queries = {
    getIncomeProcessBusinesses: getIncomeProcessBusinesses,
    getIncomeBusinesses: getIncomeBusinesses,
    getIncomeBusiness: getIncomeBusiness,
    getEmployeeBusinesses: getEmployeeBusinesses,
    findIncomeProcessBusinessStatViews: findIncomeProcessBusinessStatViews,
};
export default queries;
