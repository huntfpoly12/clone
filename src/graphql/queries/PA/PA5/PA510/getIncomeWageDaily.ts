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
          residentId
          joinedAt
          leavedAt
          retirementIncome
          nationalPensionDeduction
          healthInsuranceDeduction
          longTermCareInsuranceDeduction
          employeementInsuranceDeduction
          insuranceSupport
          nationalPensionSupportPercent
          employeementInsuranceSupportPercent
          weeklyWorkingHours
          monthlyPaycheck
          workingDays
          dailyWage
          monthlyWage
          totalDeduction
          deletable
          deductionItems{
            itemCode
            amount
          }
        }
        deductionItems {
          itemCode
          amount
        }
    }
  }
`;
