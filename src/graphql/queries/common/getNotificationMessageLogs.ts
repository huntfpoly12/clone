import gql from "graphql-tag";
export default gql`
  query getNotificationMessageLogs($companyId : Int!,$messageId: Int!) {
    getNotificationMessageLogs(companyId : $companyId, messageId : $messageId ) {
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
