import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyEmployeeReturnToWorkFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    )
  }
`;
