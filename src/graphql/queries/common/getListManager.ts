import gql from "graphql-tag";
export default  gql`
query findManagerUsers ($name: String) {
    findManagerUsers ( name: $name) {
     id 
     type
     username
     name
     mobilePhone
     groupCode
     groupName
     managerGrade
     active
   #   facilityBusinesses {
   #      facilityBusinessId
   #      name
   #      longTermCareInstitutionNumber
   #      facilityBizType
   #      startYearMonth
   #      capacity
   #      registrationCardFileStorageId
   #      price
   #      createdAt
   #      createdBy
   #      updatedAt
   #      updatedBy
   #      ip
   #      active
   #   }
  }
}
`
