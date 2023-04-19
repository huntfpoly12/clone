
import gql from "graphql-tag";
const queries = {
  findPassword: gql`
    query findPassword($username: String!,$email: String!) {
      findPassword(username: $username , email: $email)
    }
    `,
};
export default queries;
