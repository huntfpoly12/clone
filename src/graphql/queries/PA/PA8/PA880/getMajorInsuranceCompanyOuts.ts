import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyOuts($companyId: Int!, $imputedYear: Int!) {
    getMajorInsuranceCompanyOuts(
      companyId: $companyId
      imputedYear: $imputedYear
    ) {
      companyId
      type
      imputedYear
      workId
      companyType
      workingStatus
      registeredAt
      acceptedAt
      completedAt
      acceptedNumber
      memo
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
    }
  }
`;
