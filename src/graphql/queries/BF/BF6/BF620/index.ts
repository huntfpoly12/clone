import getCompaniesInElectronicFilingFile from "./getCompaniesInElectronicFilingFile";
import getElectronicFilingsByLocalIncomeTax from "./getElectronicFilingsByLocalIncomeTax";
import getElectronicFilingsByWithholdingTax from "./getElectronicFilingsByWithholdingTax";
import searchElectronicFilingFileProductions from "./searchElectronicFilingFileProductions";
import searchLocalIncomeTaxElectronicFilings from "./searchLocalIncomeTaxElectronicFilings";
import searchWithholdingTaxElectronicFilings from "./searchWithholdingTaxElectronicFilings";

const queries = {
    getCompaniesInElectronicFilingFile,
    getElectronicFilingsByLocalIncomeTax,
    getElectronicFilingsByWithholdingTax,
    searchElectronicFilingFileProductions,
    searchLocalIncomeTaxElectronicFilings,
    searchWithholdingTaxElectronicFilings,
};

export default queries;
