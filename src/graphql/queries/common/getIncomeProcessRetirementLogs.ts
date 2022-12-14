import gql from "graphql-tag";
export default gql`
  query getIncomeProcessRetirementLogs($companyId: Int!, $processKey: IncomeProcessKeyInput!) {
    getIncomeProcessRetirementLogs(companyId: $companyId, processKey: $processKey) {
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
