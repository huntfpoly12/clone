import gql from "graphql-tag";
export default gql`
    mutation deleteAttachedFileOfNoticeMessage(
        $messageId: Int!,
        $fileStorageId : Int!,
    ) {
        deleteAttachedFileOfNoticeMessage(
            messageId: $messageId,
            fileStorageId: $fileStorageId,
        ){
            id
            fileStorages {
                id
                name
                url
            }
        }

    }
`
