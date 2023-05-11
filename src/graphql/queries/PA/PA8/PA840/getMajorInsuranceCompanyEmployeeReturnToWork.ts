import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeReturnToWork(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyEmployeeReturnToWork(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
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
      acceptedNumber
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
