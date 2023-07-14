import gql from "graphql-tag";
export default gql`
query getCompany ($id: Int!) {
  getCompany (id: $id) {
    id
    code
    name
    bizNumber
    bizType
    address
    phone
    presidentName
    presidentMobilePhone
    residentId 
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
        license {
            name
            url
        }
      }
      president{
        name
        birthday
        mobilePhone
        email
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
      ip
      active
    }
    canceledAt
    unpaidMonths
  }
}
`
