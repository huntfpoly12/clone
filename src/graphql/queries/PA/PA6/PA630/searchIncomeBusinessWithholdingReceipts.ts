import gql from "graphql-tag";
export default gql`
    query searchIncomeBusinessWithholdingReceipts(
            $companyId: Int!
            $imputedYear: Int!
        ){
            searchIncomeBusinessWithholdingReceipts(companyId: $companyId, imputedYear: $imputedYear) { 
                paymentAmount
                withholdingIncomeTax
                withholdingLocalIncomeTax
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
                    incomeTypeName
                    deletable
                }
            }
        }`