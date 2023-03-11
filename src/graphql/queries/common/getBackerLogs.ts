import gql from "graphql-tag";
export default gql`
  query getBackerLogs($companyId: Int!, $backerCode: String!) {
    getBackerLogs(companyId: $companyId, backerCode: $backerCode) {
      backerCode
      ts
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
      loggedAt
      remark
    }
  }
`;
