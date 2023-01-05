import gql from "graphql-tag";
export default gql`
  query searchIncomeExtraWithholdingReceipts(
    $companyId: Int!
    $imputedYear: Int!
  ) {
    searchIncomeExtraWithholdingReceipts(
      companyId: $companyId
      imputedYear: $imputedYear
    ) {
      paymentAmount
      requiredExpenses
      incomePayment
      withholdingIncomeTax
      withholdingLocalIncomeTax
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
