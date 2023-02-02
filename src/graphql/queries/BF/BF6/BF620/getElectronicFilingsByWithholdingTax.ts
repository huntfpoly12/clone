import gql from "graphql-tag";
export default gql`
  query getElectronicFilingsByWithholdingTax(
    $input: ElectronicFilingReportKeyInput!
  ) {
    getElectronicFilingsByWithholdingTax(filter: $filter) {
      electronicFilingId
      imputedYear
      imputedMonth
      paymentYear
      paymentHalfYear
      paymentMonth
      withholdingTaxType
      reportType
      productionStatus
      productionRequestedAt
      productionRequestUserId
      fileStorageId
      productionStartedAt
      productionCompletedAt
      causeOfProductionFailure
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
    #   fileStorage
    }
  }
`;
