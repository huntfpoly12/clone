import gql from "graphql-tag";
export default gql`
    mutation createAnswerToInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
        $input: AnswerToInquiryMessageCreateInput!
    ) {
        createAnswerToInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
            input: $input
        ){
            companyId
            messageId
        }
    }
`
