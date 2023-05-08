import gql from "graphql-tag";
export default gql`
  query getIncomeWage(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
  ) {
    getIncomeWage(
      companyId: $companyId
      processKey: $processKey
      incomeId: $incomeId
    ) {
      incomeId
      paymentDay
      employeeType
      employeeId
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
      totalPay
      totalTaxPay
      totalTaxfreePay
      totalDeduction
      workingDays
      totalWorkingHours
      overtimeWorkingHours
      workingHoursAtNight
      workingHoursOnHolidays
      intermidiateIncomeTax
      intermidiateLocalIncomeTax
      yearEndSettlementIncomeTax
      yearEndSettlementLocalIncomeTax
      yearEndSettlementRuralSpecialTax
      actualPayment
      employee {
        type
        employeeId
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
        president
        householder
        nationalPensionDeduction
        healthInsuranceDeduction
        longTermCareInsuranceDeduction
        employeementInsuranceDeduction
        insuranceSupport
        nationalPensionSupportPercent
        employeementInsuranceSupportPercent
        employeementReduction
        employeementReductionStartDate
        employeementReductionFinishDate
        employeementReductionRatePercent
        employeementReductionInput
        weeklyWorkingHours
        deductionDependentCount
        incomeTaxMagnification
        incomePayment
        totalPay
        totalDeduction
        deletable
      }
      payItems {
        itemCode
        amount
      }
      deductionItems {
        itemCode
        amount
      }
      midTermSettlement
    }
  }
`;
