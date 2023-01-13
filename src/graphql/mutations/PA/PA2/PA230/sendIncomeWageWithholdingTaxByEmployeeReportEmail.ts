import gql from "graphql-tag";
export default gql`
mutation SendIncomeWageWithholdingTaxByEmployeeReportEmail($companyId: Int!, $input: IncomeWageWithholdingTaxByEmployeeInput!, $employeeInputs: [EmployeeSendEmailRequestInput!]!) {
  sendIncomeWageWithholdingTaxByEmployeeReportEmail(companyId: $companyId, input: $input, employeeInputs: $employeeInputs)
}
`;
