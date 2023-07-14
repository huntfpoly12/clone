import gql from "graphql-tag";
export default gql`
  query getNoticeMessageLogs($messageId: Int!) {
    getNoticeMessageLogs(messageId : $messageId ) {
      messageId
      ts
      expresstionType
      writedAt
      sticky
      content
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      loggedAt
      remark
    }
  }
`
