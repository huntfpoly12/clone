import gql from "graphql-tag";
export default gql`
mutations createUser($input: UserCreateInput!){
        createUser(input: $input){
    id
    }}
    `;
