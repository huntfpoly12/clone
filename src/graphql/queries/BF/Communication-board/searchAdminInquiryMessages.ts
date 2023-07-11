import gql from "graphql-tag";
export default gql`
    query searchAdminInquiryMessages($filter: SearchInquiryMessageFilter!) {
        searchAdminInquiryMessages(filter : $filter){
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
            secret
            answeredAt
            answer
            company {
                id
            }
            writerCompactUser {
                id
            }
            fileStorages {
                id
            }
            answerCompactUser {
                id
            }
            answerFileStorages {
                id
            }
            __typename @skip(if: true)
        }
    }`
