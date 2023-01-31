import getCompaniesInElectronicFilingFile from "./getCompaniesInElectronicFilingFile";
import getElectronicFilingsByLocalIncomeTax from "./getCompaniesInElectronicFilingFile";
import getElectronicFilingsByWithholdingTax from "./getCompaniesInElectronicFilingFile";
import searchElectronicFilingFileProductions from "./getCompaniesInElectronicFilingFile";
import searchLocalIncomeTaxElectronicFilings from "./getCompaniesInElectronicFilingFile";
import searchWithholdingTaxElectronicFilings from "./getCompaniesInElectronicFilingFile";

const queries = {
    getCompaniesInElectronicFilingFile,
    getElectronicFilingsByLocalIncomeTax,
    getElectronicFilingsByWithholdingTax,
    searchElectronicFilingFileProductions,
    searchLocalIncomeTaxElectronicFilings,
    searchWithholdingTaxElectronicFilings,
};

export default queries;
