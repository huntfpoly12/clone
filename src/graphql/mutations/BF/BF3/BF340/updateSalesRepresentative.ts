import gql from "graphql-tag";
export default gql`
mutation updateSalesRepresentative( $id: Int!, $input: SalesRepresentativeDetailInput!) {
    updateSalesRepresentative(id: $id, input: $input){    
    id
    code
    status
    name
    address
    grade
    phone
    mobilePhone
    registerDate
    cancelDate
    detail{
      status
      name
      grade
      bizType
      bizNumber
      residentId
      email
      mobilePhone
      phone
      fax
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
      taxInvoice
      emailTaxInvoice
      bankType
      accountNumber
      accountOwner
      registerDate
      cancelDate
      remark
    }
    createdAt
    createdBy
    updatedAt
    updatedBy
    ip
    active
  }
}
`