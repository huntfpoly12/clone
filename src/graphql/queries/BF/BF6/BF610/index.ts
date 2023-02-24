import search from "./searchTaxWithholdingStatusReports";
import searchTaxWithholdingStatusReportsByImputedYearMonth from "./searchTaxWithholdingStatusReportsByImputedYearMonth";
import getIncomProcessesInTaxWithholdingStatusReport from "./getIncomProcessesInTaxWithholdingStatusReport";
import getTaxWithholdingStatusReportViewUrl from "./getTaxWithholdingStatusReportViewUrl";
import sendTaxWithholdingStatusReportEmail from "./sendTaxWithholdingStatusReportEmail";

const queries = {
    search: search,
    searchTaxWithholdingStatusReportsByImputedYearMonth: searchTaxWithholdingStatusReportsByImputedYearMonth,
    getIncomProcessesInTaxWithholdingStatusReport: getIncomProcessesInTaxWithholdingStatusReport,
    getTaxWithholdingStatusReportViewUrl: getTaxWithholdingStatusReportViewUrl,
    sendTaxWithholdingStatusReportEmail: sendTaxWithholdingStatusReportEmail,
};

export default queries;
