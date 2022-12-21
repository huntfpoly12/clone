import gql from "graphql-tag";
export default gql`
  query getIncomeRetirementWithholdingReceiptReportViewUrl(
    $companyId: Int!
    $input: IncomeRetirementWithholdingReceiptInput!
    $incomeIds: [Int!]!
  ) {
    getIncomeRetirementWithholdingReceiptReportViewUrl(
      companyId: $companyId
      input: $input
      incomeIds: $incomeIds
    )
  }
`;
