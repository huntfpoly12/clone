import gql from "graphql-tag";
export default gql`
  query findParters {
    findParters {
      id
      code
      name
      description
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
    }
  }
`;
