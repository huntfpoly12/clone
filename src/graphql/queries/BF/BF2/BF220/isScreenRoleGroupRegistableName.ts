import gql from "graphql-tag";
export default gql`  
  query isScreenRoleGroupRegistableId($id: String!) {
    isScreenRoleGroupRegistableId(id : $id) 
  }`