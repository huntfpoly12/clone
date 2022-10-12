import gql from "graphql-tag";
export default gql`
  query getUser ($id: Int!){
    getUser(
      id : $id
    ) {
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
      screenRoleGroups {
        id
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
      }
    }
  }
`;
