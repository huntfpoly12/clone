import gql from "graphql-tag";
export default gql`
  mutation createMajorInsuranceCompanyEmployeeAcquisition(
    $companyId: Int!
    $imputedYear: Int!
    $input: MajorInsuranceCompanyEmployeeAcquisitionInput!
  ) {
    createMajorInsuranceCompanyEmployeeAcquisition(
      companyId: $companyId
      imputedYear: $imputedYear
      input: $input
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
