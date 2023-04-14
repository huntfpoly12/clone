import getTaxWithholdingStatusReports from "./getTaxWithholdingStatusReports"
import getIncomesForTaxWithholdingStatusReport from "./getIncomesForTaxWithholdingStatusReport"
import getWithholdingConfig from "../../../CM/CM130/getWithholdingConfig"
import getMyCompany from "@/graphql/queries/common/getMycompany";
const queries = {
    getIncomesForTaxWithholdingStatusReport:getIncomesForTaxWithholdingStatusReport,
    getTaxWithholdingStatusReports: getTaxWithholdingStatusReports,
    getWithholdingConfig: getWithholdingConfig,
    getMyCompany: getMyCompany,
};
export default queries;
