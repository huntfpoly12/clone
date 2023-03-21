import gql from "graphql-tag";
export default gql`
query getElectronicFilingsByIncomeRetirementPaymentStatement($input: ElectronicFilingCompanyImputedYearKeyInput !) { 
  getElectronicFilingsByIncomeRetirementPaymentStatement(input: $input) {
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
