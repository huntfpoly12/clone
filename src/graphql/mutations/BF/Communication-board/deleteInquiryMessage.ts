import gql from "graphql-tag";
export default gql`
    mutation deleteInquiryMessage(
        $companyId: Int!,
        $messageId: Int!,
    ) {
        deleteInquiryMessage(
            companyId: $companyId,
            messageId: $messageId,
        ){
            companyId
        }

    }
`
