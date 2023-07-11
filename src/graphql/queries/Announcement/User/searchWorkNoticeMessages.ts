import gql from "graphql-tag";
export default gql`
  query searchWorkNoticeMessages(
    $companyId: Int!
    $filter: SearchCommunicationMessageFilter!
  ) {
    searchWorkNoticeMessages(companyId: $companyId, filter: $filter) {
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
