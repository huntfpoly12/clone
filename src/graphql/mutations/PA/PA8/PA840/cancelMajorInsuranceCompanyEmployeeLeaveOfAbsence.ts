import gql from "graphql-tag";
export default gql`
  mutation cancelMajorInsuranceCompanyEmployeeLeaveOfAbsence(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    cancelMajorInsuranceCompanyEmployeeLeaveOfAbsence(
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
      accedpedNumber
      memo
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      leaveOfAbsenceRequestFileStorageId
      residentId
      # leaveOfAbsenceRequestFile: FileStorage
    }
  }
`;
