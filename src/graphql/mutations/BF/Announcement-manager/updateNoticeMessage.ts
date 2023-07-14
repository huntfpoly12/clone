import gql from "graphql-tag";
export default gql`
    mutation updateNoticeMessage(
        $messageId: Int!,
        $input: NoticeMessageUpdateInput!
    ) {
        updateNoticeMessage(
            messageId: $messageId,
            input: $input
        ) {
            id
            expresstionType
            writedAt
            sticky
            content
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            writerCompactUser {
                id
                name
                username
                active
                __typename @skip(if: true)
            }
            fileStorages {
                id
                name
                url
                turl
                __typename @skip(if: true)
            }
        }
    }
`;
