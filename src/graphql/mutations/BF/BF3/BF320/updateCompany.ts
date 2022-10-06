import gql from "graphql-tag";
export default gql`
mutation updateCompany( 
  $id: Int!, 
  $detail: CompanyDetailInput, 
  $president: CompanyPresidentInput, 
  $cmsBank: CompanyCmsBankInput) 
  {

    updateCompany(id: $id, detail: $detail, president: $president,cmsBank: $cmsBank){
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
`