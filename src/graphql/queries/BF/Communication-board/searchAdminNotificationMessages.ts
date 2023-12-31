import gql from "graphql-tag";
export default gql`
    query searchAdminNotificationMessages($filter: SearchNotificationMessageFilter!) {
        searchAdminNotificationMessages(filter : $filter){
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
                type
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
