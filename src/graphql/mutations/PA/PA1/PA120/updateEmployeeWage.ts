import gql from "graphql-tag";
export default gql`
  mutation updateEmployeeWage(
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $input: EmployeeWageInput!
  ) {
    updateEmployeeWage(
      companyId: $companyId
      imputedYear: $imputedYear
      employeeId: $employeeId
      input: $input
    ) {
      type
    }
  }
`;
