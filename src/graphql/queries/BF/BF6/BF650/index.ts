import getCompaniesInElectronicFilingFile from "@/graphql/queries/common/getCompaniesInElectronicFilingFile";
import getElectronicFilingsByIncomeWageDailyPaymentStatement
  from "./getElectronicFilingsByIncomeWageDailyPaymentStatement"
import searchIncomeWageDailyPaymentStatementElectronicFilingsByYearMonth
  from "./searchIncomeWageDailyPaymentStatementElectronicFilingsByYearMonth"
import searchElectronicFilingFileProductions from "./../BF630/searchElectronicFilingFileProductions"

const queries = {
  getElectronicFilingsByIncomeWageDailyPaymentStatement,
  searchIncomeWageDailyPaymentStatementElectronicFilingsByYearMonth,
  searchElectronicFilingFileProductions,
  getCompaniesInElectronicFilingFile
};

export default queries;
