import gql from "graphql-tag";
export default gql`
    query getAdminNotificationMessage($companyId: Int!, $messageId: Int!) {
        getAdminNotificationMessage(companyId : $companyId, messageId: $messageId){
            companyId
            messageId
            writedAt
            content
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            expresstionType
            classification
            company {
                code
                active
                id
                name
                address
                __typename @skip(if: true)
            }
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
            __typename @skip(if: true)
        }
    }`
