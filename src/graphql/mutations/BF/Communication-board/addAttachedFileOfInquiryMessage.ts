import gql from "graphql-tag";
export default gql`
    mutation addAttachedFileOfInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
        $fileStorageId : Int!,
    ) {
        addAttachedFileOfInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
            fileStorageId: $fileStorageId,
        ){
            companyId
        }

    }
`
