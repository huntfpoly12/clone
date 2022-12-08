import gql from "graphql-tag";
export default gql`
  query getIncomeExtras(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
  ) {
    getIncomeExtras(
      companyId: $companyId
      processKey: $processKey
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
        paymentAmount
        requiredExpenses
        taxRate
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
            incomeTypeName
            deletable
        }
    }
  }
`;
