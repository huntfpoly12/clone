import gql from "graphql-tag";
export default gql`
  query getIncomeExtraWithholdingReceiptReportViewUrl(
    $companyId: Int!
    $input: IncomeExtraWithholdingReceiptInput!
    $employeeIds: [Int!]!
  ) {
    getIncomeExtraWithholdingReceiptReportViewUrl(
      companyId: $companyId
      input: $input
      employeeIds: $employeeIds
    )
  }
`;
