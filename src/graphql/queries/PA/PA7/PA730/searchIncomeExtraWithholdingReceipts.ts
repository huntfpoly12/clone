import gql from "graphql-tag";
export default gql`
  query searchIncomeExtraWithholdingReceipts(
    $companyId: Int!
    $imputedYear: Int!
  ) {
    IncomeExtraWithholdingReceiptReportSummariesByEmployee(
      companyId: $companyId
      imputedYear: $imputedYear
    ) {
      paymentAmount
      requiredExpenses
      incomePayment
      withholdingIncomeTax
      withholdingLocalIncomeTax
    }
  }
`;
