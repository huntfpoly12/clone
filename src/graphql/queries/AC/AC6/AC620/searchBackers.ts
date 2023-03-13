import gql from "graphql-tag";
export default gql`
  query searchBackers($companyId: Int!, $filter: BackerSearchFilter!) {
    searchBackers(companyId: $companyId, filter: $filter) {
      totalCount
      page
      rows
      datas {
        backerCode
        name
        type
        nonProfitCorpType
        otherContents
        fundrasingInstitution
        donationOrganization
        bizNumber
        roadAddress
        addressExtend
        phone
        use
        # createdAt
        # createdBy
        # updatedAt
        # updatedBy
        # ip
        # active
        residentId
        __typename @skip(if: true)
      }
    }
  }
`;
