import gql from "graphql-tag";
export default  gql`
mutation createCompanyBySubscriptionRequest($id: Int!) {
    createCompanyBySubscriptionRequest(id:$id){
    id
  }
}
`
