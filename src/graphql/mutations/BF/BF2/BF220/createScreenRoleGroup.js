import gql from "graphql-tag";
export default gql`
mutation 
    createScreenRoleGroup($input: ScreenRoleGroupInput!){
        createScreenRoleGroup(input : $input)
        {
           name
        }
    }  
`;