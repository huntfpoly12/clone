import gql from "graphql-tag";
export default gql`
  query findManagerUsers {
    findManagerUsers {
      id
      type
      username
      name
      mobilePhone
      groupCode
      groupName
      managerGrade
      active
    }
  }
`;
