import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceConsignStatusFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceConsignStatusFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    ) {
      scalar
    }
  }
`;
