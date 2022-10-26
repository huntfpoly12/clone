import gql from "graphql-tag";
export default gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
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
      groupId
      groupCode
      groupName
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
        readAdminScreenRoles
        writeAdminScreenRoles
        readWorkScreenRoles
        writeWorkScreenRoles
        lock
        memo
        readAdminScreenRoles
        writeAdminScreenRoles
        readWorkScreenRoles
        writeWorkScreenRoles
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
