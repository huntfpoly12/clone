import gql from "graphql-tag";
export default gql`
  mutation sendIncomeWagePayrollRegisterReportEmail(
    $companyId: Int!
    $input: PayrollRegisterInput!
    $emailInput: SendEmailRequestInput!
  ) {
    sendIncomeWagePayrollRegisterReportEmail(
      companyId: $companyId
      input: $input
      emailInput: $emailInput
    )
  }
`;
