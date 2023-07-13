import gql from "graphql-tag";
export default gql`
    mutation addAttachedFileOfNotificationMessage(
        $companyId: Int!,
        $messageId: Int!,
        $fileStorageId: Int

    ) {
        addAttachedFileOfNotificationMessage(
            companyId: $companyId,
            messageId: $messageId,
            fileStorageId: $fileStorageId,
        ){
            companyId
            fileStorages {
              id
              url
              name
            }
        }

    }
`
