import getIncomeProcessRetirements from "./getIncomeProcessRetirements";
import getIncomeRetirements from "./getIncomeRetirements";
import getIncomeBusiness from "./getIncomeBusiness";
import getEmployeeBusinesses from "../../PA6/PA610/getEmployeeBusinesses";
import getEmployeeWages from "@/graphql/queries/PA/PA1/PA120/getEmployeeWages";
import getEmployeeWageDailies from "@/graphql/queries/PA/PA5/PA520/getEmployeeWageDailies";

const queries = {
    getIncomeProcessRetirements: getIncomeProcessRetirements,
    getIncomeRetirements: getIncomeRetirements,
    getIncomeBusiness: getIncomeBusiness,
    getEmployeeBusinesses: getEmployeeBusinesses,
    getEmployeeWages: getEmployeeWages,
    getEmployeeWageDailies: getEmployeeWageDailies,
};
export default queries;
