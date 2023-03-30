import gql from "graphql-tag";
export default gql`
    mutation registerTransactionDetailsToAccountingDocuments($companyId: Int!, $fiscalYear: Int!, $facilityBusinessId: Int!, $bankbookDetailDate: Int!, $bankbookDetailIds: [Int!]!) {
        registerTransactionDetailsToAccountingDocuments(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, bankbookDetailDate: $bankbookDetailDate, bankbookDetailIds: $bankbookDetailIds) 
    }
`;
