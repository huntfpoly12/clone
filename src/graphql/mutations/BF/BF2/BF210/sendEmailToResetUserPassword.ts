import gql from "graphql-tag";
export default gql`
  mutation sendEmailToResetUserPassword($id: Int!) {
    sendEmailToResetUserPassword(id: $id)
  }
`;
