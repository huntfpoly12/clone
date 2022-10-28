import gql from "graphql-tag";
export default gql`  
  query getScreenRoleGroup($id: String!) {
    getScreenRoleGroup(id : $id){
        id
        name
        type
        readAdminScreenRoles 
        writeAdminScreenRoles 
        readWorkScreenRoles 
        writeWorkScreenRoles 
        memo    
    }
  }`