import gql from "graphql-tag";
export default gql`  
  query getScreenRoleGroup($id: String!) {
    getScreenRoleGroup(id : $id){
        id
        name
        type
        screenRoles 
        memo    
    }
  }`