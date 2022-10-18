import gql from "graphql-tag";
export default gql`
query searchPublicInstitutions($keyword: String! ) {
    searchPublicInstitutions(keyword : $keyword) {
    bcode
    address1
    address2
    address3
    address4
    taxOfficeCode
    localIncomeTaxArea
    taxOfficeName
  }
}
`