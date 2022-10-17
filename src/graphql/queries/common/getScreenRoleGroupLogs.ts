import gql from "graphql-tag";
export default gql`
query getScreenRoleGroupLogs($id: String!) {
  getScreenRoleGroupLogs(id : $id ) {
    screenRoleGroupId
    ts
    name
    type
    screenRoles
    lock
    memo
    createdAt
    createdBy
    updatedAt
    updatedBy
    ip
    active
    loggedAt
    remark
  }
}
`