import gql from "graphql-tag";
export default gql`
  query getIncomeWagePayrollRegisterViewUrl(
    $companyId: Int!
    $input: PayrollRegisterInput!
  ) {
    getIncomeWagePayrollRegisterViewUrl(companyId: $companyId, input: $input)
  }
`;
