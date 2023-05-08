import getMajorInsuranceCompanyEmployeeLosses from "./getMajorInsuranceCompanyEmployeeLosses";
import getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl from "./getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl";
import getEmployeeWages from "@/graphql/queries/PA/PA8/PA810/getEmployeeWages";
import getEmployeeWage from "@/graphql/queries/PA/PA8/PA810/getEmployeeWage";
import getEmployeeWageDaily from "@/graphql/queries/PA/PA8/PA810/getEmployeeWageDaily";
import getEmployeeWageDailies from "@/graphql/queries/common/getEmployeeWageDailies";
import getMyCompany from "@/graphql/queries/common/getMycompany";

const queries = {
  getMajorInsuranceCompanyEmployeeLosses,
  getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl,
  getEmployeeWages,
  getEmployeeWage,
  getEmployeeWageDaily,
  getMyCompany,
  getEmployeeWageDailies,
};
export default queries;
