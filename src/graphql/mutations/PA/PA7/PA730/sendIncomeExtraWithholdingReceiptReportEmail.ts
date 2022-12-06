import gql from "graphql-tag";
export default gql`
  mutation sendIncomeExtraWithholdingReceiptReportEmail(
    $companyId: Int!
    $input: IncomeExtraWithholdingReceiptInput!
    $employeeInputs: [EmployeeExtraSendEmailRequestInput!]!
  ) {
    sendIncomeExtraWithholdingReceiptReportEmail(
      companyId: $companyId
      input: $input
      employeeInputs: $employeeInputs
    )
  }
`;
