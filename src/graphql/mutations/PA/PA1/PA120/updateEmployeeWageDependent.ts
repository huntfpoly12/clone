import gql from "graphql-tag";
export default gql`
  mutation updateEmployeeWageDependent(
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $index: Int!
    $input: EmployeeWageDependentUpdateInput!
  ) {
    updateEmployeeWageDependent(
      companyId: $companyId
      imputedYear: $imputedYear
      employeeId: $employeeId
      index: $index
      input: $input
    ) {
      employeeId
      incomeTypeCode
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
      residentId
    }
  }
`;
