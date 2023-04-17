import getEmployeeWage from "./getEmployeeWage";
import getEmployeeWages from "./getEmployeeWages";
import getEmployeeWageDailies from "./getEmployeeWageDailies";
import getMajorInsuranceCompanyEmployeeAcquisition from "./getMajorInsuranceCompanyEmployeeAcquisition";
import getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl from "./getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl";
import getMajorInsuranceCompanyEmployeeAcquisitions from "./getMajorInsuranceCompanyEmployeeAcquisitions";
import getMyCompany from "@/graphql/queries/common/getMycompany";

const queries = {
  getEmployeeWage,
  getEmployeeWages,
  getEmployeeWageDailies,
  getMajorInsuranceCompanyEmployeeAcquisition,
  getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl:
    getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl,
  getMajorInsuranceCompanyEmployeeAcquisitions,
  getMyCompany: getMyCompany,

};
export default queries;
