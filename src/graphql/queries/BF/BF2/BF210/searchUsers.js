import gql from "graphql-tag";
export default  gql`
query searchUsers($page: Int!, $rows: Int!, $type: String!, $active: Boolean!) {
    searchUsers(filter: { page: $page, rows: $rows, type: $type, active: $active }) {
    totalCount
    page
    rows
    datas {
        id
        type
        username
        name
        mobilePhone
        groupCode
        groupName
        managerGrade
        active
        facilityBusinesses {
            facilityBusinessId
            name
            longTermCareInstitutionNumber
            facilityBizType
            startYearMonth
            capacity
            registrationCardFileStorageId
            price
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
      }
    }
  }
}
`