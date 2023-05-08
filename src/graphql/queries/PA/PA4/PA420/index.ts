import getIncomeProcessRetirements from "./getIncomeProcessRetirements";
import getIncomeRetirements from "./getIncomeRetirements";
import getIncomeRetirement from "./getIncomeRetirement";
import getIncomeBusiness from "./getIncomeBusiness";
import getEmployeeBusinesses from "../../PA6/PA610/getEmployeeBusinesses";
import getEmployeeWages from "@/graphql/queries/PA/PA1/PA120/getEmployeeWages";
import getEmployeeWageDailies from "@/graphql/queries/common/getEmployeeWageDailies";
import calculateIncomeRetirement from "../../PA4/PA410/calculateIncomeRetirement";
import calculateIncomeRetirementTax from "./calculateIncomeRetirementTax"
import findEmployeesForIncomeRetirement from "./findEmployeesForIncomeRetirement";

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
  findEmployeesForIncomeRetirement: findEmployeesForIncomeRetirement
};
export default queries;
