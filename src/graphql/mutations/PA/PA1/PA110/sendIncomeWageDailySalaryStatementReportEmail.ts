import gql from "graphql-tag";
export default gql`
  mutation sendIncomeWageDailySalaryStatementReportEmail(
    $companyId: Int!
    $imputedYear: Int!
    $incomeInputs: [IncomeSendEmailRequestInput!]!
  ) {
    sendIncomeWageDailySalaryStatementReportEmail(
      companyId: $companyId
      imputedYear: $imputedYear
      incomeInputs: $incomeInputs
    )
  }
`;
