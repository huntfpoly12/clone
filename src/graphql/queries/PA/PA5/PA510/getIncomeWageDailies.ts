import gql from "graphql-tag";
export default gql`
  query getIncomeWageDailies($companyId: Int!, $processKey: IncomeProcessKeyInput!) {
    getIncomeWageDailies(companyId: $companyId, processKey: $processKey) {
      incomeId
      imputedMonth
      paymentYear
      paymentMonth
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
      employee {
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
        deductionItems {
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
  // supportAmount