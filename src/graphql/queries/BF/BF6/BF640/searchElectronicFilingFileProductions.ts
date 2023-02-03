import gql from "graphql-tag";
export default gql`
query SearchElectronicFilingFileProductions($filter: ElectronicFilingFileSearchFilter!) {
    searchElectronicFilingFileProductions(filter: $filter) {
      fileStorageId
      reportType
      productionRequestedAt
      productionRequestUserId
      productionStatus
    }
  }
`