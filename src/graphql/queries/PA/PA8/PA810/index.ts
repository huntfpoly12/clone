import getEmployeeWage from "./getEmployeeWage";
import getEmployeeWages from "./getEmployeeWages";
import getEmployeeWageDailies from "./getEmployeeWageDailies";
import getMajorInsuranceCompanyEmployeeAcquisition from "./getMajorInsuranceCompanyEmployeeAcquisition";
import getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl from "./getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl";
import getMajorInsuranceCompanyEmployeeAcquisitions from "./getMajorInsuranceCompanyEmployeeAcquisitions";

const queries = {
  getEmployeeWage,
  getEmployeeWages,
  getEmployeeWageDailies,
  getMajorInsuranceCompanyEmployeeAcquisition,
  getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl:
    getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl,
  getMajorInsuranceCompanyEmployeeAcquisitions,
};
export default queries;
