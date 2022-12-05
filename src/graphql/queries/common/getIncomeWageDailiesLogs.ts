import gql from "graphql-tag";
export default gql`
  query getIncomeWageDailiesLogs(
    $companyId: Int!,
    $processKey: IncomeProcessKeyInput!
    ) {
        getIncomeWageDailiesLogs(
        companyId: $companyId, 
        processKey: $processKey
        ) {
            ts
            incomeId
            paymentDay
            employeeType
            employeeId
            incomeTypeCode
            incomePayment
            withholdingIncomeTax
            withholdingLocalIncomeTax
            withholdingRuralSpecialTax
            prevPaymentDay
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            loggedAt
            remark
            dailyWage
            monthlyWage
            totalDeduction
            workingDays
            actualPayment
            deductionItemsInfo
    }
  }
`;
