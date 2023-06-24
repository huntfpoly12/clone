import gql from "graphql-tag";
export default gql`
  query searchAccountingDocumentW4cUploads(
    $companyId: Int!
    $startDate: Int!
    $finishDate: Int!
  ) {
    searchAccountingDocumentW4cUploads(
      companyId: $companyId
      startDate: $startDate
      finishDate: $finishDate
    ) {
        requestId
        year
        month
        requedtedAt
        totalCount
        successCount
        failCount
        unexecutedCount
        result
        status
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
    }
  }
`;
