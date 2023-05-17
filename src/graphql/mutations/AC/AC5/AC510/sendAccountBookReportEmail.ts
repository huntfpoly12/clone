import gql from "graphql-tag";
export default gql`
  mutation sendAccountBookReportEmail(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $year: Int!
    $month: Int!
    $type: Int!
    $displayCode: Boolean
    $emailInput: SendEmailRequestInput!
  ) {
    sendAccountBookReportEmail(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      year: $year
      month: $month
      type: $type
      displayCode: $displayCode
      emailInput: $emailInput
    )
  }
`;
