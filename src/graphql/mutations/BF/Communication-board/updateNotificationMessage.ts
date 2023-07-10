import gql from "graphql-tag";
export default gql`
    mutation updateNotificationMessage(
        $companyId: Int!,
        $messageId: Int!,
        $input: NotificationMessageUpdateInput!

    ) {
        updateNotificationMessage(
            companyId: $companyId,
            messageId: $messageId,
            input: $input,
        ){
            companyId
        }

    }
`
