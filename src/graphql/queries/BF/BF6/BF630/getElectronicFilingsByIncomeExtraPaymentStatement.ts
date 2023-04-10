import gql from "graphql-tag";
export default gql`
  query getElectronicFilingsByIncomeExtraPaymentStatement($input: ElectronicFilingCompanyImputedYearKeyInput!) {
    getElectronicFilingsByIncomeExtraPaymentStatement(input: $input) {
      type
      electronicFilingId
      productionStatus
      productionRequestedAt
      productionRequestUserId
      fileStorageId
      productionStartedAt
      productionCompletedAt
      causeOfProductionFailure
      referenceInformation
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      productionRequestUser {
        id
        type
        username
        name
        active
      }
      fileStorage {
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
`;
