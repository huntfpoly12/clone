import gql from "graphql-tag";
export default gql`
    mutation deleteAttachedFileOfInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
        $fileStorageId : Int!,
    ) {
        deleteAttachedFileOfInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
            fileStorageId: $fileStorageId,
        ){
            companyId
            fileStorages {
                id
                name
                url
            }
        }

    }
`
