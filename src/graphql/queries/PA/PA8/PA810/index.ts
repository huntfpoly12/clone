import getEmployeeWages from "@/graphql/queries/common/getEmployeeWages";
import getEmployeeWage from "@/graphql/queries/common/getEmployeeWage";
import getEmployeeWageDailies from "@/graphql/queries/common/getEmployeeWageDailies";
import getMajorInsuranceCompanyEmployeeAcquisition from "./getMajorInsuranceCompanyEmployeeAcquisition";
import getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl from "./getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl";
import getMajorInsuranceCompanyEmployeeAcquisitions from "./getMajorInsuranceCompanyEmployeeAcquisitions";
import getMajorInsuranceConsignStatus from "./getMajorInsuranceConsignStatus";
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
  getMajorInsuranceConsignStatus

};
export default queries;
