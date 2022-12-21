import gql from "graphql-tag";
export default gql`
  query getIncomeWageWithholdingReceiptReportViewUrl(
    $companyId: Int!
    $input: IncomeWageWithholdingReceiptInput!
    $incomeIds: [Int!]!
  ) {
    getIncomeWageWithholdingReceiptReportViewUrl(
      companyId: $companyId
      input: $input
      incomeIds: $incomeIds
    )
  }
`;
