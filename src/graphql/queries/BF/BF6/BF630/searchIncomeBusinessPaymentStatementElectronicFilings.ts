import gql from "graphql-tag";
export default gql`
query searchIncomeBusinessPaymentStatementElectronicFilings($filter: ElectronicFilingIncomeBusinessPaymentStatementSearchFilter!) { 
  searchIncomeBusinessPaymentStatementElectronicFilings(filter: $filter) {
      companyId
      imputedYear
      lastProductionRequestedAt
      company{
        id
        code
        name
        bizNumber
        bizType
        address
        phone
        presidentName
        presidentMobilePhone
        extendInfo{
          detail{
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
          cmsBank{
            bankType
            accountNumber
            ownerBizNumber
            ownerName
            withdrawDay
          }
        }
        sealFileStorageId
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
        residentId
        seal{
          name
          url
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
        }
        canceledAt
        unpaidMonths
      }
    }
  }
  `
