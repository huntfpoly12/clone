import gql from "graphql-tag";
export default gql`
  mutation updateBacker(
    $companyId: Int!
    $backerCode: String!
    $input: BackerUpdateInput!
  ) {
    updateBacker(
      companyId: $companyId
      backerCode: $backerCode
      input: $input
    ) {
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
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      residentId
    }
  }
`;
