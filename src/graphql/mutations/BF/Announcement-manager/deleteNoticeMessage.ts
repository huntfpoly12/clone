import gql from "graphql-tag";
export default gql`
    mutation deleteNoticeMessage(
        $messageId: Int!,
    ) {
        deleteNoticeMessage(
            messageId: $messageId,
        ){
            id
        }

    }
`
