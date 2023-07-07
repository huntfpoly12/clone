import gql from "graphql-tag";
export default gql`
    mutation deleteAttachedFileOfAnswerToInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
        $answerFileStorageId: Int!
    ) {
        deleteAttachedFileOfAnswerToInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
            answerFileStorageId: $answerFileStorageId
        ){
            companyId
        }

    }
`
