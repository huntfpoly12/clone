import gql from "graphql-tag";
export default gql`
  mutation sendIncomeWageSalaryStatementReportEmail(
    $companyId: Int!
    $imputedYear: Int!
    $incomeInputs: [IncomeSendEmailRequestInput!]!
  ) {
    sendIncomeWageSalaryStatementReportEmail(
      companyId: $companyId
      imputedYear: $imputedYear
      incomeInputs: $incomeInputs
    )
  }
`;
