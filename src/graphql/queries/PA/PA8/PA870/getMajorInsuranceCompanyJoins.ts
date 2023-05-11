import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyJoins($companyId: Int!, $imputedYear: Int!) {
    getMajorInsuranceCompanyJoins(
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
      accedpedNumber
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
