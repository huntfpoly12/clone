import gql from "graphql-tag";
export default gql`
  query getWorkNoticeMessage(
    $companyId: Int!
    $messageId: Int!
  ) {
    getWorkNoticeMessage(companyId: $companyId, messageId: $messageId) {
      id
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
      writerCompactUser {
        id
        type
        username
        name
        active
      }
      fileStorages {
        id
        name
        url
        turl
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
      }
    }
  }
`;
