import gql from "graphql-tag";
export default gql`
  query getIncomeProcessWages(
    $companyId: Int!
    $imputedYear: Int!
    $imputedMonth: Int
  ) {
    getIncomeProcessWages(
      companyId: $companyId
      imputedYear: $imputedYear
      imputedMonth: $imputedMonth
    ) {
      companyId
      type
      imputedYear
      imputedMonth
      paymentYear
      paymentMonth
      status
      statusUserId
      statusUpdatedAt
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
      employeeStat {
        type
        imputedYear
        imputedMonth
        paymentYear
        paymentMonth
        employeeCount
        retireEmployeeCount
      }
      incomeStat {
        imputedYear
        imputedMonth
        paymentYear
        paymentMonth
        incomePayment
        withholdingIncomeTax
        withholdingLocalIncomeTax
        withholdingRuralSpecialTax
        totalPay
        totalTaxPay
        totalTaxfreePay
        totalDeduction
        actualPayment
        totalNationalPensionDeduction
        totalHealthDeduction
        totalLongtermCareDeduction
        totalEmploymentDeduction
      }
    }
  }
`;
