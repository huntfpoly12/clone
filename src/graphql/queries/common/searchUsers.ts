import gql from "graphql-tag";
export default  gql`
query searchUsers($filter: UserViewSearchFilter!  ) {
    searchUsers(filter: $filter) {
    totalCount
    page
    rows
    datas {
      id
      type
      username
      name
      mobilePhone
      groupId
      groupCode
      groupName
      managerGrade
      active
    }
  }
}
`
