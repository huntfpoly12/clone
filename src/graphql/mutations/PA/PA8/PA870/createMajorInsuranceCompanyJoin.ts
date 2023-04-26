import gql from "graphql-tag";
export default gql`
  mutation createMajorInsuranceCompanyJoin(
    $companyId: Int!
    $imputedYear: Int!
    $input: MajorInsuranceCompanyJoinInput!
  ) {
    createMajorInsuranceCompanyJoin(
      companyId: $companyId
      imputedYear: $imputedYear
      input: $input
    ) {
      companyId
      type
      imputedYear
      workId
      # companyType
      # workingStatus
      # registeredAt
      # acceptedAt
      # completedAt
      # accedpedNumber
      # memo
      # createdAt
      # createdBy
      # updatedAt
      # updatedBy
      # ip
      # active
    }
  }
`;
