import getCompaniesInElectronicFilingFile from  "@/graphql/queries/common/getCompaniesInElectronicFilingFile";
import getElectronicFilingsByIncomeWageDailyPaymentStatement from "./getElectronicFilingsByIncomeWageDailyPaymentStatement"
import searchIncomeWageDailyPaymentStatementElectronicFilings from "./searchIncomeWageDailyPaymentStatementElectronicFilings"
import searchElectronicFilingFileProductions from "./../BF630/searchElectronicFilingFileProductions"
const queries = {
    getElectronicFilingsByIncomeWageDailyPaymentStatement: getElectronicFilingsByIncomeWageDailyPaymentStatement,
    searchIncomeWageDailyPaymentStatementElectronicFilings: searchIncomeWageDailyPaymentStatementElectronicFilings,
    searchElectronicFilingFileProductions: searchElectronicFilingFileProductions,
    getCompaniesInElectronicFilingFile: getCompaniesInElectronicFilingFile
};

export default queries;