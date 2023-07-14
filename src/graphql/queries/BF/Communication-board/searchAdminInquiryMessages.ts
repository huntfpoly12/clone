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
            answerCompactUser {
                id
                name
              __typename @skip(if: true)
            }
            answerFileStorages {
                id
                url
                name
              __typename @skip(if: true)
              
            }
            __typename @skip(if: true)
        }
    }`
