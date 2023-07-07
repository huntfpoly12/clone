import gql from "graphql-tag";
export default gql`
    mutation updateInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
        $input : InquiryMessageUpdateInput!,
    ) {
        updateInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
            input: $input,
        ){
            companyId
        }

    }
`
