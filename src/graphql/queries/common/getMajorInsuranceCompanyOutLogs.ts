import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyOutLogs(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyOutLogs(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    ) {
      companyId
      type
      imputedYear
      workId
      ts
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
      loggedAt
      remark
    }
  }
`;
