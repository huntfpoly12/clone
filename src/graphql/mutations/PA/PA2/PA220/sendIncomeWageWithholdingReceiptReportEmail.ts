import gql from "graphql-tag";
export default gql`
  mutation sendIncomeWageWithholdingReceiptReportEmail(
    $companyId: Int!
    $input: IncomeWageWithholdingReceiptInput!
    $incomeInputs: [IncomeSendEmailRequestInput!]!
  ) {
    sendIncomeWageWithholdingReceiptReportEmail(
      companyId: $companyId
      input: $input
      incomeInputs: $incomeInputs
    )
  }
`;
