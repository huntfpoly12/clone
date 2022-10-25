import gql from "graphql-tag";
export default gql`  
  query searchScreenRoleGroups($page: Int, $rows: Int!, $types: [String!]!) {
    searchScreenRoleGroups(
        filter: { 
                page: $page, 
                rows: $rows, 
                types: $types 
            }
        ){
        totalCount
        page
        rows
        datas {
          id
          name
          type
          lock
          memo
          readAdminScreenRoles
          writeAdminScreenRoles
          readWorkScreenRoles
          writeWorkScreenRoles
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
        }
    }
  }`