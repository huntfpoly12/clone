import getEmployeeWage from "./getEmployeeWage";
import getEmployeeWageDaily from "./getEmployeeWageDaily";
import getMajorInsuranceCompanyEmployeeAcquisition from "./getMajorInsuranceCompanyEmployeeAcquisition";
import getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl from "./getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl";
import getMajorInsuranceCompanyEmployeeAcquisitions from "./getMajorInsuranceCompanyEmployeeAcquisitions";
const queries = {
    getEmployeeWage,
    getEmployeeWageDaily,
    getMajorInsuranceCompanyEmployeeAcquisition,
    getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl:getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl,
    getMajorInsuranceCompanyEmployeeAcquisitions,
};
export default queries;