import gql from "graphql-tag";
export default gql`
  mutation EmployeeWageDependent(
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $index: Int!
    $input: EmployeeWageDependentUpdateInput!
  ) {
    EmployeeWageDependent(
      companyId: $companyId
      imputedYear: $imputedYear
      employeeId: $employeeId
      index: $employeeId
      input: $input
    ) {
      type
    }
  }
`;
