import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeSalaryChanges(
    $companyId: Int!
    $imputedYear: Int!
  ) {
    getMajorInsuranceCompanyEmployeeSalaryChanges(
      companyId: $companyId
      imputedYear: $imputedYear
    ) {
      companyId
      type
      imputedYear
      workId
      employeeType
      employeeId
      name
      nationalPensionReport
      healthInsuranceReport
      employeementInsuranceReport
      industrialAccidentInsuranceReport
      workingStatus
      registeredAt
      acceptedAt
      completedAt
      accedpedNumber
      memo
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      residentId
    }
  }
`;
