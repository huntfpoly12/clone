import gql from "graphql-tag";
export default gql`
    mutation addAttachedFileOfAnswerToInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
        $answerFileStorageId: Int!
    ) {
        addAttachedFileOfAnswerToInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
            answerFileStorageId: $answerFileStorageId
        ){
            companyId
        }

    }
`
