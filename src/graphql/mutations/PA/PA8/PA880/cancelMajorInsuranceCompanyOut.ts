import gql from "graphql-tag";
export default gql`
  mutation cancelMajorInsuranceCompanyOut(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    cancelMajorInsuranceCompanyOut(
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