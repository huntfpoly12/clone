import gql from "graphql-tag";
export default gql`
  query findUsername(
    $name: String!,
    $email: String!
    ) {
      findUsername(
        name:$name
        email:$email) 
        
  }
`;
