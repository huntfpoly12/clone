import getTaxWithholdingStatusReports from "./getTaxWithholdingStatusReports"
import getIncomesForTaxWithholdingStatusReport from "./getIncomesForTaxWithholdingStatusReport"
import getWithholdingConfig from "../../../CM/CM130/getWithholdingConfig"
import getMycompany from "@/graphql/queries/common/getMyCompany";
const queries = {
    getIncomesForTaxWithholdingStatusReport:getIncomesForTaxWithholdingStatusReport,
    getTaxWithholdingStatusReports: getTaxWithholdingStatusReports,
    getWithholdingConfig: getWithholdingConfig,
    getMyCompany: getMycompany,
};
export default queries;
