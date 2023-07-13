import gql from "graphql-tag";
export default gql`
    mutation createNoticeMessage(
        $input: NoticeMessageCreateInput!
    ) {
        createNoticeMessage(
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
