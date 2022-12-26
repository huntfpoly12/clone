import gql from "graphql-tag";
export default gql`
    mutation createSubscriptionRequest( 
            $content : SubscriptionRequestContentInput!
        ) {
            createSubscriptionRequest(content : $content) {
            id
            status
            code
        }
    }`;
