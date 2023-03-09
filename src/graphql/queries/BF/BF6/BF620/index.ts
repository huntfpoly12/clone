import getCompaniesInElectronicFilingFile from  "@/graphql/queries/common/getCompaniesInElectronicFilingFile";
import getElectronicFilingsByLocalIncomeTax from "./getElectronicFilingsByLocalIncomeTax";
import getElectronicFilingsByWithholdingTax from "./getElectronicFilingsByWithholdingTax";
import searchElectronicFilingFileProductions from "./searchElectronicFilingFileProductions";
import searchLocalIncomeTaxElectronicFilingsByYearMonth from "./searchLocalIncomeTaxElectronicFilingsByYearMonth";
import searchWithholdingTaxElectronicFilingsByYearMonth from "./searchWithholdingTaxElectronicFilingsByYearMonth";

const queries = {
    getCompaniesInElectronicFilingFile,
    getElectronicFilingsByLocalIncomeTax,
    getElectronicFilingsByWithholdingTax,
    searchElectronicFilingFileProductions,
    searchLocalIncomeTaxElectronicFilingsByYearMonth,
    searchWithholdingTaxElectronicFilingsByYearMonth,
};

export default queries;
