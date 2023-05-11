import gql from "graphql-tag";
export default gql`
query me {
  me {
    type
    username
    name
    mobilePhone
    email
    president
    managerGrade
    compactCompany{
      name
    }
    facilityBusinesses{
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
    createdAt
    updatedAt
  }
}
`
