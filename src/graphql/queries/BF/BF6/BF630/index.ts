import getCompaniesInElectronicFilingFile from "./getCompaniesInElectronicFilingFile";

import getElectronicFilingsByIncomeWagePaymentStatement from "./getElectronicFilingsByIncomeWagePaymentStatement";
import getElectronicFilingsByIncomeRetirementPaymentStatement from "./getElectronicFilingsByIncomeRetirementPaymentStatement";
import getElectronicFilingsByIncomeBusinessPaymentStatement from "./getElectronicFilingsByIncomeBusinessPaymentStatement";
import getElectronicFilingsByIncomeExtraPaymentStatement from "./getElectronicFilingsByIncomeExtraPaymentStatement";

import searchIncomeWagePaymentStatementElectronicFilings from "./searchIncomeWagePaymentStatementElectronicFilings";
import searchIncomeRetirementPaymentStatementElectronicFilings from "./searchIncomeRetirementPaymentStatementElectronicFilings";
import searchIncomeBusinessPaymentStatementElectronicFilings from "./searchIncomeBusinessPaymentStatementElectronicFilings";
import searchIncomeExtraPaymentStatementElectronicFilings from "./searchIncomeExtraPaymentStatementElectronicFilings";
import searchElectronicFilingFileProductions from "./searchElectronicFilingFileProductions";
const queries = {
  getCompaniesInElectronicFilingFile: getCompaniesInElectronicFilingFile,
  
  getElectronicFilingsByIncomeWagePaymentStatement: getElectronicFilingsByIncomeWagePaymentStatement,
  getElectronicFilingsByIncomeRetirementPaymentStatement: getElectronicFilingsByIncomeRetirementPaymentStatement,
  getElectronicFilingsByIncomeBusinessPaymentStatement: getElectronicFilingsByIncomeBusinessPaymentStatement,
  getElectronicFilingsByIncomeExtraPaymentStatement: getElectronicFilingsByIncomeExtraPaymentStatement,
  
  searchIncomeWagePaymentStatementElectronicFilings: searchIncomeWagePaymentStatementElectronicFilings,
  searchIncomeRetirementPaymentStatementElectronicFilings: searchIncomeRetirementPaymentStatementElectronicFilings,
  searchIncomeBusinessPaymentStatementElectronicFilings: searchIncomeBusinessPaymentStatementElectronicFilings,
  searchIncomeExtraPaymentStatementElectronicFilings: searchIncomeExtraPaymentStatementElectronicFilings,
  searchElectronicFilingFileProductions:searchElectronicFilingFileProductions
};

export default queries;
