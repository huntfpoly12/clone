import gql from "graphql-tag";
export default gql`
    mutation addAttachedFileOfNoticeMessage(
        $messageId: Int!,
        $fileStorageId: Int

    ) {
        addAttachedFileOfNoticeMessage(
            messageId: $messageId,
            fileStorageId: $fileStorageId,
        ){
            id
            fileStorages {
              id
              url
              name
            }
        }

    }
`
