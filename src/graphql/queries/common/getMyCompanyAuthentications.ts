import gql from "graphql-tag";
export default gql`
query getMyCompanyAuthentications($companyId: Int!,$userId : Int!,$filter : PaginatedFilter! ) {
  getMyCompanyAuthentications(companyId : $companyId, userId : $userId ,filter : $filter ) {
    totalCount
    page
    rows
    datas {
      status
      message
      cause
      createdAt
      ip
      success
    }
  }
}
`