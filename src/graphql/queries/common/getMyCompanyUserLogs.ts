import gql from "graphql-tag";
export default gql`
query getMyCompanyUserLogs($userId: Int!,$companyId : Int! ) {
  getMyCompanyUserLogs(companyId : $companyId, userId : $userId ) {
    loggedAt
    remark
    createdAt
    createdBy
    updatedAt
    updatedBy
    active
    ip
    ts 
  }
}
`