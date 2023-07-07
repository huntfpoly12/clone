import gql from "graphql-tag";
export default gql`
    mutation updateAnswerToInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
        $input: AnswerToInquiryMessageUpdateInput!
    ) {
        updateAnswerToInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
            input: $input
        ){
            companyId
        }

    }
`
