import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyJoinFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyJoinFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    )
  }
`;
