import gql from "graphql-tag";
export default  gql`
query getServiceContract($id: Int!) {
    getServiceContract(id: $id) {
    id
    servicePrice
    accountingPrice
    withholdingPrice
    usedAccountingCount
    usedWithholding
    usedServiceInfo {
      totalPrice
      accountingPrice
      withholdingPrice
      accounting {
        longTermCareInstitutionNumber
        facilityBizType
        name
        startYearMonth
        capacity
        registrationCardFileStorageId
        facilityBusinessId
        price
        options {
          accountingServiceType
          price
        }
      }
      withholding {
        startYearMonth
        capacity
        price
        options {
          withholdingServiceType
          price
        }
      }
    }
    salesRepresentativeId
    manageUserId
    manageStartDate
    createdAt
    createdBy
    updatedAt
    updatedBy
    ip
    active
    compactSalesRepresentative {
      id
      code
      name
      active
    }
    manageCompactUser {
      id
      type
      username
      name
      active
    }
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
    withholding {
      startYearMonth
      capacity
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