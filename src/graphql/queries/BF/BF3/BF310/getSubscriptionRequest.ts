import gql from "graphql-tag";
export default  gql`
query getSubscriptionRequest($id: Int!) {
    getSubscriptionRequest(id: $id) {
    id
    status
    code
    companyName
    companyBizNumber
    companyAddress
    presidentName
    processedBy
    simpleAccountingInfos{
      name
      startYearMonth
    }
    simpleWithholdingInfo{
      name
      startYearMonth
    }
    usedAccounting
    usedWithholding
    processedAt
    approvedAt
    approvedBy
    rejectedAt
    rejectedBy
    content{
    agreements{
      terms
      personalInfo
      accountingService
      withholdingService
    }
      company{
        name
        zipcode
        roadAddress
        jibunAddress
        addressExtend
        addressDetail{
          bcode
          bname
          buildingCode
          buildingName
          roadname
          roadnameCode
          sido
          sigungu
          sigunguCode
          zonecode
        }
        phone
        fax
        licenseFileStorageId
        bizNumber
        bizType
        residentId
        license{
          name
          url
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
        }
      }
      president{
        name
        birthday
        mobilePhone
        email
      }
      accounting{
        facilityBusinesses{
          longTermCareInstitutionNumber
          facilityBizType
          name
          startYearMonth
          capacity
          registrationCardFileStorageId
          registrationCard{
            name
            url 
          }
        }
        accountingServiceTypes
      }
      withholding{
        startYearMonth
        capacity
        withholdingServiceTypes
      }
      cmsBank{
        financialCompany
        accountNumber
        ownerName
        ownerBizNumber
        withdrawDay
        ownerResidentId
      }
      extra{
        salesRepresentativeId
        comment
      }
      
  }
    memo
    createdAt
    createdBy
    updatedAt
    updatedBy
    ip
    active
    compactSalesRepresentative{
      id
      code
      name
      active
    }
  }
}
`
