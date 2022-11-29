import gql from "graphql-tag";
export default gql`
  mutation deleteEmployeeWageDependent(
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $index: Int!
  ) {
    deleteEmployeeWageDependent(
      companyId: $companyId
      imputedYear: $imputedYear
      employeeId: $employeeId
      index: $employeeId
    )
  }
`;
