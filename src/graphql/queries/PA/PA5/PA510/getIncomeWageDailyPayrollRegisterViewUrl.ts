import gql from "graphql-tag";
export default gql`
  query getIncomeWageDailyPayrollRegisterViewUrl(
    $companyId: Int!
    $input: PayrollRegisterInput!
  ) {
    getIncomeWageDailyPayrollRegisterViewUrl(
      companyId: $companyId
      input: $input
    )
  }
`;
