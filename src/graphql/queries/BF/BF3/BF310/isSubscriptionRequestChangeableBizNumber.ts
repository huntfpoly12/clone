import gql from "graphql-tag";
export default gql`
query isSubscriptionRequestChangeableBizNumber($id: Int!,$bizNumber: String!) {
    isSubscriptionRequestChangeableBizNumber(id: $id,bizNumber: $bizNumber)
}
`
