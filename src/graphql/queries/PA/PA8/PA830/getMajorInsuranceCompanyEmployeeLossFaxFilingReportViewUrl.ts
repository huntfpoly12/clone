import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyEmployeeLossFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    )
  }
`;
