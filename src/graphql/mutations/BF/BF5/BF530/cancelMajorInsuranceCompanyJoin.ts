import gql from "graphql-tag";
export default gql`
  mutation cancelMajorInsuranceCompanyJoin(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    cancelMajorInsuranceCompanyJoin(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
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
