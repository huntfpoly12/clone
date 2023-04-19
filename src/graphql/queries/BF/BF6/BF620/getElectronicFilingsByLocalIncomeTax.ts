import gql from "graphql-tag";
export default gql`
  query getElectronicFilingsByLocalIncomeTax(
    $input: ElectronicFilingReportKeyInput!
  ) {
    getElectronicFilingsByLocalIncomeTax(input: $input) {
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
      # productionRequestUser
      #   fileStorage
    }
  }
`;
