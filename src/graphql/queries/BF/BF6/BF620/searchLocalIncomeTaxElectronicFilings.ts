import gql from "graphql-tag";
export default gql`
  query searchLocalIncomeTaxElectronicFilings(
    $filter: ElectronicFilingLocalIncomeTaxSearchFilter!
  ) {
    searchWithholdingTaxElectronicFilings(filter: $filter) {
      companyId
      imputedYear
      reportId
      imputedMonth
      paymentYear
      paymentMonth
      reportType
      index
      afterDeadline
      localIncomeTaxAmount
      statusUpdatedAt
      lastProductionRequestedAt
    #   company
    }
  }
`;
