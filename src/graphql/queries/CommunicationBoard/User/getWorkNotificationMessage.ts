import gql from "graphql-tag";
export default gql`
  query getWorkNotificationMessage($companyId: Int!, $messageId: Int!) {
    getWorkNotificationMessage(companyId: $companyId, messageId: $messageId) {
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
      company {
        id
        code
        name
        bizNumber
        bizType
        address
        phone
        presidentName
        presidentMobilePhone
        # extendInfo
        sealFileStorageId
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
        residentId
        # seal
        canceledAt
        unpaidMonths
      }
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
