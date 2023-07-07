import gql from "graphql-tag";
export default gql`
    mutation createNotificationMessage(
        $companyId: Int!,
        $messageId: Int!,
        $input: NotificationMessageUpdateInput!

    ) {
        createNotificationMessage(
            companyId: $companyId,
            messageId: $messageId,
            input: $input,
        ){
            companyId
        }

    }
`
