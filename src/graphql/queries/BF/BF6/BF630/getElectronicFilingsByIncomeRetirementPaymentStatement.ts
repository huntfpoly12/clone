import gql from "graphql-tag";
export default gql`
query getElectronicFilingsByIncomeExtraPaymentStatement($input: ElectronicFilingCompanyImputedYearKeyInput !) { 
  getElectronicFilingsByIncomeExtraPaymentStatement(input: $input) {
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
    fileStorage{
      name
      url
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
    }
    }
  }
  `
