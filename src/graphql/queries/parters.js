import gql from "graphql-tag";
export default gql`
  query findParters {
    Partner {
        id
        code
    }
  }
`