import gql from "graphql-tag";
export default  gql`
query getUser {
    getUser {
        id
        type
        username
        name
        mobilePhone
        email
        president
        managerGrade
        accountingRole
        withholdingRole
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
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
  }
}
`