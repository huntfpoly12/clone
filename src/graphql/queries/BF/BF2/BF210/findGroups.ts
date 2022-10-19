import gql from "graphql-tag";
export default gql`
  query findGroups($type: String!) {
    findGroups(type: $type) {
      groupId
      groupCode
      groupName
      active
    }
  }
`;
