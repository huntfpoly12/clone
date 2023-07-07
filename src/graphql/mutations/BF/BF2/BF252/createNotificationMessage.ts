import gql from "graphql-tag";
export default gql`
    mutation createNotificationMessage(
        $companyId: Int!,
        $messageId: Int!,
    ) {
        createNotificationMessage(
            companyId: $companyId,
            messageId: $messageId,
        ){
            companyId
        }

    }
`
