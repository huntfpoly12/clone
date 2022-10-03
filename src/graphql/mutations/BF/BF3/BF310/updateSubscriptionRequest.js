import gql from "graphql-tag";
export default  gql`
mutation updateSubscriptionRequest($id: Int!,$content: SubscriptionRequestContentInput!,$status: Int!,$memo: String) {
  updateSubscriptionRequest(id: $id,content: $content,status: $status,memo: $memo) {
    id
  }
}
`
