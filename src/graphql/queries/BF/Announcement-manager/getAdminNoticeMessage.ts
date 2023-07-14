import gql from "graphql-tag";
export default gql`
    query getAdminNoticeMessage($messageId: Int!) {
        getAdminNoticeMessage(messageId : $messageId){
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
                __typename @skip(if: true)
            }
            __typename @skip(if: true)
        }
    }`
