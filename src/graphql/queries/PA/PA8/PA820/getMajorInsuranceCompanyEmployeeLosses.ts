import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeLosses(
    $companyId: Int!
    $imputedYear: Int!
  ) {
    getMajorInsuranceCompanyEmployeeLosses(
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
