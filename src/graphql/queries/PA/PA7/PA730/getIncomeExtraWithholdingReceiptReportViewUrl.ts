import gql from "graphql-tag";
export default gql`
  query getIncomeExtraWithholdingReceiptReportViewUrl(
    $companyId: Int!
    $input: IncomeExtraWithholdingReceiptInput!
    $employeeKeys: [ReportEmployeeExtraKeyInput!]!
  ) {
    getIncomeExtraWithholdingReceiptReportViewUrl(
      companyId: $companyId
      input: $input
      employeeKeys: $employeeKeys
    ) {
      scalar
    }
  }
`;
