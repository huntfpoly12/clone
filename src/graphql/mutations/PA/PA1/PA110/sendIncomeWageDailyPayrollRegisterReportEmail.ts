import gql from "graphql-tag";
export default gql`
  mutation sendIncomeWageDailyPayrollRegisterReportEmail(
    $companyId: Int!
    $input: PayrollRegisterInput!
    $emailInput: SendEmailRequestInput!
  ) {
    sendIncomeWageDailyPayrollRegisterReportEmail(
      companyId: $companyId
      input: $input
      emailInput: $emailInput
    )
  }
`;
