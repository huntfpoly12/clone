import gql from "graphql-tag";
export default gql`
  query getIncomeProcessWageLogs(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
  ) {
    getIncomeProcessWageLogs(companyId: $companyId, processKey: $processKey) {
      companyId
      type
      imputedYear
      imputedMonth
      paymentYear
      paymentMonth
      ts
      status
      statusUserId
      statusUpdatedAt
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
