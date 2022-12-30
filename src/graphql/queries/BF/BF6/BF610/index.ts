import search from "./searchTaxWithholdingStatusReports";
import getIncomProcessesInTaxWithholdingStatusReport from "./getIncomProcessesInTaxWithholdingStatusReport";
import getTaxWithholdingStatusReportViewUrl from "./getTaxWithholdingStatusReportViewUrl";

const queries = {
    search: search,
    getIncomProcessesInTaxWithholdingStatusReport: getIncomProcessesInTaxWithholdingStatusReport,
    getTaxWithholdingStatusReportViewUrl: getTaxWithholdingStatusReportViewUrl,
};

export default queries;
