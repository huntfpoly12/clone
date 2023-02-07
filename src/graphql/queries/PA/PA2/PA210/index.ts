import getTaxWithholdingStatusReports from "./getTaxWithholdingStatusReports"
import getIncomesForTaxWithholdingStatusReport from "./getIncomesForTaxWithholdingStatusReport"
import getWithholdingConfig from "../../../CM/CM130/getWithholdingConfig"
import getCompany from "../../../BF/BF3/BF320/getCompany"
const queries = {
    getIncomesForTaxWithholdingStatusReport:getIncomesForTaxWithholdingStatusReport,
    getTaxWithholdingStatusReports: getTaxWithholdingStatusReports,
    getWithholdingConfig: getWithholdingConfig,
    getCompany: getCompany,
};
export default queries;
