import getMajorInsuranceCompanyEmployeeReturnToWorks from "./getMajorInsuranceCompanyEmployeeReturnToWorks";
import getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl from "./getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl";
import getMajorInsuranceCompanyEmployeeReturnToWork from "./getMajorInsuranceCompanyEmployeeReturnToWork";
import getMajorInsuranceCompanyEmployeeLeaveOfAbsences from "./getMajorInsuranceCompanyEmployeeLeaveOfAbsences";
import getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl from "./getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl";
import getMajorInsuranceCompanyEmployeeLeaveOfAbsence from "./getMajorInsuranceCompanyEmployeeLeaveOfAbsence";
import getEmployeeWages from "@/graphql/queries/common/getEmployeeWages";
import getEmployeeWage from "@/graphql/queries/common/getEmployeeWage";
import getEmployeeWageDaily from "@/graphql/queries/common/getEmployeeWageDaily";
import getEmployeeWageDailies from "@/graphql/queries/common/getEmployeeWageDailies";
import getMyCompany from "@/graphql/queries/common/getMycompany";

const queries = {
  getMajorInsuranceCompanyEmployeeReturnToWorks,
  getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl,
  getMajorInsuranceCompanyEmployeeReturnToWork,
  getMajorInsuranceCompanyEmployeeLeaveOfAbsences,
  getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl,
  getMajorInsuranceCompanyEmployeeLeaveOfAbsence,
  getEmployeeWages,
  getEmployeeWage,
  getEmployeeWageDaily,
  getMyCompany,
  getEmployeeWageDailies,
};
export default queries;
