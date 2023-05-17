import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceConsignStatusFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
  ) {
    getMajorInsuranceConsignStatusFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
    )
  }
`;
