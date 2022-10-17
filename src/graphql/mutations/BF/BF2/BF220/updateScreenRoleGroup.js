import gql from "graphql-tag";
export default gql`
mutation 
    updateScreenRoleGroup($input: ScreenRoleGroupInput!){
        updateScreenRoleGroup(input : $input){
           name
        }
    }  
`;