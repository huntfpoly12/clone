import gql from "graphql-tag";
export default gql`
    mutation deleteNotificationMessage(
        $companyId: Int!,
        $messageId: Int!,
    ) {
        deleteNotificationMessage(
            companyId: $companyId,
            messageId: $messageId,
        ){
            companyId
        }

    }
`
