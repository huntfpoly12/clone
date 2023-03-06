import getCompaniesInElectronicFilingFile from  "@/graphql/queries/common/getCompaniesInElectronicFilingFile";
import getElectronicFilingsByLocalIncomeTax from "./getElectronicFilingsByLocalIncomeTax";
import getElectronicFilingsByWithholdingTax from "./getElectronicFilingsByWithholdingTax";
import searchElectronicFilingFileProductions from "./searchElectronicFilingFileProductions";
import searchLocalIncomeTaxElectronicFilings from "./searchLocalIncomeTaxElectronicFilings";
import searchWithholdingTaxElectronicFilingsByYearMonth from "./searchWithholdingTaxElectronicFilingsByYearMonth";

const queries = {
    getCompaniesInElectronicFilingFile,
    getElectronicFilingsByLocalIncomeTax,
    getElectronicFilingsByWithholdingTax,
    searchElectronicFilingFileProductions,
    searchLocalIncomeTaxElectronicFilings,
    searchWithholdingTaxElectronicFilingsByYearMonth,
};

export default queries;
