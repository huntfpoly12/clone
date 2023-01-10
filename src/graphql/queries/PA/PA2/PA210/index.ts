import getTaxWithholdingStatusReports from "./getTaxWithholdingStatusReports"
import getIncomesForTaxWithholdingStatusReport from "./getIncomesForTaxWithholdingStatusReport"
import getWithholdingConfig from "../../../CM/CM130/getWithholdingConfig"

const queries = {
    getIncomesForTaxWithholdingStatusReport:getIncomesForTaxWithholdingStatusReport,
    getTaxWithholdingStatusReports: getTaxWithholdingStatusReports,
    getWithholdingConfig: getWithholdingConfig
};
export default queries;
