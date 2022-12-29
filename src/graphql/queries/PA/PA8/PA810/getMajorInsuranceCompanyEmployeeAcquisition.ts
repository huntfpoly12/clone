import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeAcquisition(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyEmployeeAcquisition(
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
      includeDependents
      dependentsEvidenceFileStorageId
      residentId
    }
  }
`;
