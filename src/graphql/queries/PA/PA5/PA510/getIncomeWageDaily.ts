import gql from "graphql-tag";
export default gql`
  query getIncomeWageDaily(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
  ) {
    getIncomeWageDaily(
      companyId: $companyId
      processKey: $processKey
      incomeId: $incomeId
    ) {
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
        dailyWage
        monthlyWage
        totalDeduction
        workingDays
        actualPayment
        employee{
          type
          employeeId
          incomeTypeCode
          name
          foreigner
          nationality
          nationalityCode
          stayQualification
          residentIdValidity
          roadAddress
          addressExtend
          email
          department
          responsibility
          status
          withholdingIncomeTax
          withholdingLocalIncomeTax
          withholdingRuralSpecialTax
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
        }
        deductionItems {
          itemCode
          amount
        }
    }
  }
`;
