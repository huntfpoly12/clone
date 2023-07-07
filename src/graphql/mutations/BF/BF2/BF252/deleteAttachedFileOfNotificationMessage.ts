import gql from "graphql-tag";
export default gql`
    mutation deleteAttachedFileOfNotificationMessage(
        $companyId: Int!,
        $messageId: Int!,
        $fileStorageId: Int!
    ) {
        deleteAttachedFileOfNotificationMessage(
            companyId: $companyId,
            messageId: $messageId,
            fileStorageId: $fileStorageId,
        ){
            companyId
        }

    }
`
