import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyOutFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyOutFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    )
  }
`;
