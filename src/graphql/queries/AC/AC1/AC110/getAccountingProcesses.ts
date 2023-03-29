import gql from "graphql-tag";
export default gql`
    query getAccountingProcesses($companyId: Int!, $fiscalYear: Int!, $facilityBusinessId: Int!) {
        getAccountingProcesses(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId) {
          year
          month
          yearMonth
          status
          statusUserId
          statusUpdatedAt
          bankbookDetailsCount
          deposit
          withdraw
          income
          spending
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
          statusUpdateUser {
            id
            type
            username
            name
            active
          }
        }
    }
`;
