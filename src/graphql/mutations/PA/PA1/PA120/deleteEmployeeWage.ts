import gql from "graphql-tag";
export default gql`
  mutation deleteEmployeeWage(
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
  ) {
    deleteEmployeeWage(
      companyId: $companyId
      imputedYear: $imputedYear
      employeeId: $employeeId
    )
  }
`;
