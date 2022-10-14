import gql from "graphql-tag";
export default gql`
mutations updateUser($id:Int, $input: UserUpdateInput!){
    updateUser(id: $id, input: $input){
    id
    }}
    `;
