import gql from "graphql-tag";
export default gql`
    query searchAdminNotificationMessages($companyId: Int!, $messageId: Int!) {
        searchAdminNotificationMessages(companyId: $companyId, messageId: $messageId){
            companyId
            messageId
            ts
            writedAt
            content
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            loggedAt
            remark
            expresstionType
            classification
            __typename @skip(if: true)
        }
    }`
