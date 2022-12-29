import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyEmployeeAcquisitionFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    ) 
  }
`;
