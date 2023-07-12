import gql from "graphql-tag";
export default gql`
  query getAdminInquiryMessage($companyId: Int!, $messageId: Int!){
    getAdminInquiryMessage(companyId: $companyId, messageId: $messageId){
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
      }
      answerFileStorages {
        id
      }
      __typename @skip(if: true)
    }
  }`
