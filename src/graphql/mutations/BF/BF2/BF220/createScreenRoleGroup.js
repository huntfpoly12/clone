import gql from "graphql-tag";
export default  gql`
mutation {
    createScreenRoleGroup
      ($id: String!, $name: String!, $type: String!, $screenRoles: String!, $memo: String, $input: ScreenRoleGroupInput!){
        createScreenRoleGroup(id: $id, name: $name, type: $stype, screenRoles: $screenRoles, memo: $memo)
     
        {
            id: 
           name
           type
           screenRoles
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
`