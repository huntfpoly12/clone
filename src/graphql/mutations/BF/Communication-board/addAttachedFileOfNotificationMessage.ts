import gql from "graphql-tag";
export default gql`
    mutation createNotificationMessage(
        $companyId: Int!,
        $messageId: Int!,
        $fileStorageId: Int!

    ) {
        createNotificationMessage(
            companyId: $companyId,
            messageId: $messageId,
            fileStorageId: $fileStorageId,
        ){
            companyId
        }

    }
`
