import getElectronicFilingsByIncomeWagePaymentStatement from "./getElectronicFilingsByIncomeWagePaymentStatement";
import searchIncomeWagePaymentStatementElectronicFilings from "./searchIncomeWagePaymentStatementElectronicFilings";
import searchIncomeRetirementPaymentStatementElectronicFilings from "./searchIncomeRetirementPaymentStatementElectronicFilings";
import searchIncomeBusinessPaymentStatementElectronicFilings from "./searchIncomeBusinessPaymentStatementElectronicFilings";
import searchIncomeExtraPaymentStatementElectronicFilings from "./searchIncomeExtraPaymentStatementElectronicFilings";
const queries = {
  getElectronicFilingsByIncomeWagePaymentStatement: getElectronicFilingsByIncomeWagePaymentStatement,
  searchIncomeWagePaymentStatementElectronicFilings: searchIncomeWagePaymentStatementElectronicFilings,
  searchIncomeRetirementPaymentStatementElectronicFilings: searchIncomeRetirementPaymentStatementElectronicFilings,
  searchIncomeBusinessPaymentStatementElectronicFilings: searchIncomeBusinessPaymentStatementElectronicFilings,
  searchIncomeExtraPaymentStatementElectronicFilings:searchIncomeExtraPaymentStatementElectronicFilings
};

export default queries;
