import gql from "graphql-tag";
export default gql`
    mutation deleteAnswerToInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
    ) {
        deleteAnswerToInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
        ){
            companyId
        }

    }
`
