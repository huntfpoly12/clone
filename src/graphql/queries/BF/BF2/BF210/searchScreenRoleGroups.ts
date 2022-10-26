import gql from "graphql-tag";
export default gql`
  query searchScreenRoleGroups($page: Int, $rows: Int!, $types: [String!]!) {
    searchScreenRoleGroups(
      filter: { page: $page, rows: $rows, types: $types }
    ) {
      datas {
        id
        name
        type
        readAdminScreenRoles
        writeAdminScreenRoles
        readWorkScreenRoles
        writeWorkScreenRoles
        lock
        memo
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
