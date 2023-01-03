import search from "./searchTaxWithholdingStatusReports";
import getIncomProcessesInTaxWithholdingStatusReport from "./getIncomProcessesInTaxWithholdingStatusReport";
import getTaxWithholdingStatusReportViewUrl from "./getTaxWithholdingStatusReportViewUrl";
import sendTaxWithholdingStatusReportEmail from "./sendTaxWithholdingStatusReportEmail";

const queries = {
    search: search,
    getIncomProcessesInTaxWithholdingStatusReport: getIncomProcessesInTaxWithholdingStatusReport,
    getTaxWithholdingStatusReportViewUrl: getTaxWithholdingStatusReportViewUrl,
    sendTaxWithholdingStatusReportEmail: sendTaxWithholdingStatusReportEmail,
};

export default queries;
