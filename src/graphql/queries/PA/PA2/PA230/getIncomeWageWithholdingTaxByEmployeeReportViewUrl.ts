import gql from "graphql-tag";
export default gql` 
query Query(
  $companyId: Int!
  $input: IncomeWageWithholdingTaxByEmployeeInput!
  $employeeIds: [Int!]!
) {
  getIncomeWageWithholdingTaxByEmployeeReportViewUrl(
    companyId: $companyId
    input: $input
    employeeIds: $employeeIds
  )
}

  ` 