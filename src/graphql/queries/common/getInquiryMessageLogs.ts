import gql from "graphql-tag";
export default gql`
  query getInquiryMessageLogs($companyId : Int!,$messageId: Int!) {
    getInquiryMessageLogs(companyId : $companyId, messageId : $messageId ) {
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
    }
  }
`
