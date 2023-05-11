import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeLeaveOfAbsences(
    $companyId: Int!
    $imputedYear: Int!
  ) {
    getMajorInsuranceCompanyEmployeeLeaveOfAbsences(
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
      leaveOfAbsenceRequestFileStorageId
      residentId
      # leaveOfAbsenceRequestFile
    }
  }
`;
