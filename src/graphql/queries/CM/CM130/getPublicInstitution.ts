import gql from "graphql-tag";
export default gql`
    query
    getPublicInstitution($bcode: String!) {
        getPublicInstitution(bcode: $bcode) {
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