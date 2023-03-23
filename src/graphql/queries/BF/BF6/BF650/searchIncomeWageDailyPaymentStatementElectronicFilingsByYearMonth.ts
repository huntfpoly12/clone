import gql from "graphql-tag";
export default gql`
    query searchIncomeWageDailyPaymentStatementElectronicFilingsByYearMonth($paymentYear: Int!, $paymentMonth: Int!) {
        searchIncomeWageDailyPaymentStatementElectronicFilingsByYearMonth(paymentYear: $paymentYear, paymentMonth: $paymentMonth) {
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
            companyServiceContract {
              active
              manageUserId
              salesRepresentativeId
            }
        }
    }
`
