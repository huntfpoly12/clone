import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyEmployeeLeaveOfAbsenceFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    )
  }
`;
