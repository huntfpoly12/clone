import searchIncomeWageWithholdingTaxByEmployees from "./searchIncomeWageWithholdingTaxByEmployees";
import getIncomeWageWithholdingTaxByEmployeeReportViewUrl from "./getIncomeWageWithholdingTaxByEmployeeReportViewUrl";
import getEmployeeWageDailies from "@/graphql/queries/common/getEmployeeWageDailies";

const queries = {
    searchIncomeWageWithholdingTaxByEmployees: searchIncomeWageWithholdingTaxByEmployees,
    getIncomeWageWithholdingTaxByEmployeeReportViewUrl: getIncomeWageWithholdingTaxByEmployeeReportViewUrl,
    getEmployeeWageDailies: getEmployeeWageDailies
};
export default queries;
