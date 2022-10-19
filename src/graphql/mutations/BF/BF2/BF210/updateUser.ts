import gql from "graphql-tag";
export default gql`
  mutation updateUser(
    $id: Int!,
    $input: UserUpdateInput!
    ) {
    updateUser(
    id: $id,
    input: $input)
    {
      id
    }
  }
`;
