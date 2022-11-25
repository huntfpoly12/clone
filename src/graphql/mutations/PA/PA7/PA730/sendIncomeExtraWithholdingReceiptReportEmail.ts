import gql from "graphql-tag";
export default gql`
  query sendIncomeExtraWithholdingReceiptReportEmail(
    $companyId: Int!
    $input: IncomeExtraWithholdingReceiptInput!
    $employeeInputs: [EmployeeExtraSendEmailRequestInput!]!
  ) {
    sendIncomeExtraWithholdingReceiptReportEmail(
      companyId: $companyId
      input: $input
      employeeInputs: $employeeInputs
    ) {
      scalar
    }
  }
`;
