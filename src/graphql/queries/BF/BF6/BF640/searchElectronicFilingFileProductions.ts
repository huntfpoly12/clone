import gql from "graphql-tag";
export default gql`
query SearchElectronicFilingFileProductions($filter: ElectronicFilingFileSearchFilter!) {
    searchElectronicFilingFileProductions(filter: $filter) {
      electronicFilingId
      fileStorageId
      productionRequestedAt
      productionRequestUserId
      productionStatus
    }
  }
`
