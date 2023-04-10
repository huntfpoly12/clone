import search from "./searchTaxWithholdingStatusReports";
import searchTaxWithholdingStatusReportsByYearMonth from "./searchTaxWithholdingStatusReportsByYearMonth";
import getIncomProcessesInTaxWithholdingStatusReport from "./getIncomProcessesInTaxWithholdingStatusReport";
import getTaxWithholdingStatusReportViewUrl from "./getTaxWithholdingStatusReportViewUrl";
import sendTaxWithholdingStatusReportEmail from "./sendTaxWithholdingStatusReportEmail";

const queries = {
  search: search,
  searchTaxWithholdingStatusReportsByYearMonth,
  getIncomProcessesInTaxWithholdingStatusReport:
    getIncomProcessesInTaxWithholdingStatusReport,
  getTaxWithholdingStatusReportViewUrl: getTaxWithholdingStatusReportViewUrl,
  sendTaxWithholdingStatusReportEmail: sendTaxWithholdingStatusReportEmail,
};

export default queries;
