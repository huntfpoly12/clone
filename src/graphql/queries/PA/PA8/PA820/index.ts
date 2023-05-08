import getMajorInsuranceCompanyEmployeeLosses from "./getMajorInsuranceCompanyEmployeeLosses";
import getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl from "./getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl";
import getEmployeeWages from "@/graphql/queries/common/getEmployeeWages";
import getEmployeeWage from "@/graphql/queries/common/getEmployeeWage";
import getEmployeeWageDaily from "@/graphql/queries/common/getEmployeeWageDaily";
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
