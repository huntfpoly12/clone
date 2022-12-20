import getIncomeProcessRetirements from "./getIncomeProcessRetirements";
import getIncomeRetirements from "./getIncomeRetirements";
import getIncomeRetirement from "./getIncomeRetirement";
import getIncomeBusiness from "./getIncomeBusiness"; 
import getEmployeeBusinesses from "../../PA6/PA610/getEmployeeBusinesses";
import getEmployeeWages from "@/graphql/queries/PA/PA1/PA120/getEmployeeWages";
import getEmployeeWageDailies from "@/graphql/queries/PA/PA5/PA520/getEmployeeWageDailies";
import calculateIncomeRetirement from "../../PA4/PA410/calculateIncomeRetirement";
import calculateIncomeRetirementTax from "./calculateIncomeRetirementTax"
const queries = {
    getIncomeProcessRetirements: getIncomeProcessRetirements,
    getIncomeRetirements: getIncomeRetirements,
    getIncomeRetirement: getIncomeRetirement,
    getIncomeBusiness: getIncomeBusiness,
    getEmployeeBusinesses: getEmployeeBusinesses,
    getEmployeeWages: getEmployeeWages,
    getEmployeeWageDailies: getEmployeeWageDailies,
    calculateIncomeRetirement: calculateIncomeRetirement,
    calculateIncomeRetirementTax: calculateIncomeRetirementTax,
};
export default queries;
