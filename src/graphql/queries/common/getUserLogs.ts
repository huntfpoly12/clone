import gql from "graphql-tag";
export default gql`
query getUserLogs ($id: Int) {
  getUserLogs(id: $id) {
    userId
    ts
    username
    name
    mobilePhone
    email
    president
    managerGrade
    accountingRole
    withholdingRole
    screenRoleGroups
    facilityBusinesses
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
