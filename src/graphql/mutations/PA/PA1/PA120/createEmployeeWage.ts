import gql from "graphql-tag";
export default gql`
  mutation createEmployeeWage($companyId:Int!,$imputedYear:Int!,$input:EmployeeWageInput!) {
    createEmployeeWage(companyId:$companyId,imputedYear:$imputedYear,input:$input){
    type
    employeeId
    # incomeTypeCode
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
    weeklyWorkingHours
    deductionDependentCount
    incomeTaxMagnification
    incomePayment
    totalPay
    totalDeduction
    # totalReduction
    deletable
    payItems{
      itemCode
			amount
    }
    deductionItems{
      itemCode
      amount
      # supportAmount
    }
    # reductionItems{
    #   itemCode
    #   reductionRate
    #   reductionStartDate
    #   reductionFinishDate
    #   reductionInput
    # }
    dependents{
      employeeId
      # incomeTypeCode
      index
      relation
      name
      foreigner
      residentIdValidity
      basicDeduction
      women
      singleParent
      senior
      disabled
      maternityAdoption
      descendant
      consignmentRelationship
      householder
      # residentId
    }
  }
  }
`;
