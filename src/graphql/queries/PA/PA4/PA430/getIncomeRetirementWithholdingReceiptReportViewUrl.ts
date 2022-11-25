import gql from "graphql-tag";
export default gql`
  query getIncomeRetirementWithholdingReceiptReportViewUrl(
    $companyId: Int!
    $input: IncomeBusinessWithholdingReceiptInput!
    $employeeKeys: [ReportEmployeeBusinessKeyInput!]!
  ) {
    getIncomeRetirementWithholdingReceiptReportViewUrl(
      companyId: $companyId
      input: $input
      employeeKeys: $employeeKeys
    ) {
      scalar
    }
  }
`;
