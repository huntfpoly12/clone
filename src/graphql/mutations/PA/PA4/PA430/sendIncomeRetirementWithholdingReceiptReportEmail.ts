import gql from "graphql-tag";
export default gql`
  mutation sendIncomeRetirementWithholdingReceiptReportEmail(
    $companyId: Int!
    $input: IncomeBusinessWithholdingReceiptInput!
    $employeeInputs: [EmployeeBusinessSendEmailRequestInput!]!
  ) {
    sendIncomeRetirementWithholdingReceiptReportEmail(
      companyId: $companyId
      input: $input
      employeeInputs: $employeeInputs
    )
  }
`;
