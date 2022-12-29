import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeAcquisitionLogs(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyEmployeeAcquisitionLogs(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    ) {
      companyId
      type
      imputedYear
      workId
      ts
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
      loggedAt
      remark
      includeDependents
      dependentsEvidenceFileStorageId
    }
  }
`;
