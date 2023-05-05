import gql from "graphql-tag";
export default gql`
  mutation createMajorInsuranceCompanyEmployeeLoss(
    $companyId: Int!
    $imputedYear: Int!
    $input: MajorInsuranceCompanyEmployeeLossInput!
  ) {
    createMajorInsuranceCompanyEmployeeLoss(
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
      residentId
    }
  }
`;
