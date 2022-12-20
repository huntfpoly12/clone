import gql from "graphql-tag";
export default gql`
  query searchIncomeRetirementWithholdingReceipts(
    $companyId: Int!
    $filter: IncomeRetirementWithholdingReceiptSearchFilter!
  ) {
    searchIncomeRetirementWithholdingReceipts(
      companyId: $companyId
      filter: $filter
    ) {
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
      retirementType
      settlementStartDate
      settlementFinishDate
      retirementBenefits
      nonTaxableRetirementBenefits
      taxableRetirementBenefits
      totalDeduction
      specificationId
      actualPayment
      employee{
        ... on EmployeeWage {
            employeeId
            incomeTypeCode
            name
        }
        ... on EmployeeWageDaily {
          employeeId
          incomeTypeCode
          name
        }
      }
      specification{
          id
          executive
          retirementReason
          totalPay3Month
          totalAnualBonus
          annualLeaveAllowance
          expectedRetirementBenefits
          definedRetirementBenefits
          nonTaxableRetirementBenefits
          taxableRetirementBenefits
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
        }
      }
    }
`;
