import gql from "graphql-tag";

export default gql`
query getAccountBookReportViewUrl(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $year: Int!
    $month: Int!
    $type: Int!
    $displayCode: Boolean
) {
    getAccountBookReportViewUrl(
        companyId: $companyId
        fiscalYear: $fiscalYear
        facilityBusinessId: $facilityBusinessId
        year: $year
        month: $month
        type: $type
        displayCode: $displayCode
    )
  }
`;
