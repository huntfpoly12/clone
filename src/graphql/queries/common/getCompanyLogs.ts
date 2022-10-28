import gql from "graphql-tag";
export default gql`
query getCompanyLogs ($id: Int!) {
  getCompanyLogs (id: $id) {
    companyId
    ts
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
    loggedAt
    remark
  }
}
`