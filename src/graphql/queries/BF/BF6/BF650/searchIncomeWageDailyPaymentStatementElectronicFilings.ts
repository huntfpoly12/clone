import gql from "graphql-tag";
export default gql`
query searchIncomeWageDailyPaymentStatementElectronicFilings($filter: ElectronicFilingIncomeWageDailyPaymentStatementSearchFilter!) {
    searchIncomeWageDailyPaymentStatementElectronicFilings(filter: $filter) {
        companyId
        paymentYear
        paymentMonth
        lastProductionRequestedAt
        company{
            id
            code
            name
            bizNumber
            bizType
            address
            phone
            presidentName
            presidentMobilePhone
            sealFileStorageId
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            residentId
            canceledAt
            unpaidMonths
        }
    }
  }
`