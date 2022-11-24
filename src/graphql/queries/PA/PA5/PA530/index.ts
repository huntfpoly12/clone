import search from "./searchIncomeWageDailyWithholdingReceipts";
import print from "./getIncomeWageDailyWithholdingReceiptReportViewUrl";
import getEmployeeBusiness from "./getEmployeeBusiness";

const queries = {
    search: search,
    print: print,
    getEmployeeBusiness: getEmployeeBusiness
};
export default queries;
