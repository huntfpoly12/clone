import gql from "graphql-tag";
export default  gql`
mutation updateSubscriptionRequest($id: Int!,$content: SubscriptionRequestContentInput!,$status: Int!,$memo: String) {
  updateSubscriptionRequest(id: $id,content: $content,status: $status,memo: $memo) {
    id
    status
    code
    companyName
    companyBizNumber
    companyAddress
    presidentName
    processedAt
    processedBy
    approvedAt
    approvedBy
    rejectedAt
    rejectedBy
    memo
    createdAt
    createdBy
    updatedAt
    updatedBy
    ip
    active
  }
}
`
