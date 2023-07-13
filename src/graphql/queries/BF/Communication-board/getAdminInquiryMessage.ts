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
      answerCompactUser {
        id
        type
        name
        active
      }
      answerFileStorages {
        id
        name
        url
        __typename @skip(if: true)
      }
      __typename @skip(if: true)
    }
  }`
