import gql from "graphql-tag";
export default gql`
  mutation createMajorInsuranceCompanyOut(
    $companyId: Int!
    $imputedYear: Int!
    $input: MajorInsuranceCompanyOutInput!
  ) {
    createMajorInsuranceCompanyOut(
      companyId: $companyId
      imputedYear: $imputedYear
      input: $input
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
