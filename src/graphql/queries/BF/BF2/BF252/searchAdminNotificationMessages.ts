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
                id
            }
            writerCompactUser {
                id
            }
            fileStorages {
                id
            }
            __typename @skip(if: true)
        }
    }`
