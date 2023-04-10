import gql from "graphql-tag";
export default gql`
  query searchElectronicFilingFileProductions(
    $filter: ElectronicFilingFileSearchFilter!
  ) {
    searchElectronicFilingFileProductions(filter: $filter) {
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
      # productionRequestUser {
      #   id
      #   type
      #   username
      #   name
      #   active
      # }
      # fileStorage
    }
  }
`;
