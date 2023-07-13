import gql from "graphql-tag";
export default gql`
  mutation sendIncomeRetirementWithholdingReceiptReportEmail(
    $companyId: Int!
    $input: IncomeRetirementWithholdingReceiptInput!
    $incomeInputs: [IncomeSendEmailRequestInput!]!
  ) {
    sendIncomeRetirementWithholdingReceiptReportEmail(
      companyId: $companyId
      input: $input
      incomeInputs: $incomeInputs
    )
  }
`;
