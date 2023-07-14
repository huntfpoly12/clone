import gql from "graphql-tag";
export default gql`
  query getMyCompany($companyId: Int!) {
    getMyCompany(companyId: $companyId) {
      id
      code
      name
      bizNumber
      bizType
      address
      phone
      presidentName
      presidentMobilePhone
      extendInfo {
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
            turl
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
          }
        }
        president {
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
      residentId
      seal {
        name
        url
        turl
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
`;
