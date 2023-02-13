import gql from "graphql-tag";
export default gql`
  query getClientLogs($companyId: Int!, $clientId: Int!) {
    getClientLogs(companyId: $companyId, clientId: $clientId) {
      clientId
      ts
      name
      bizNumber
      presidentName
      phone
      use
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
`;
