import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyEmployeeLossData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyEmployeeLossData(search: $search, data: $data) {
      companyId
      type
      imputedYear
      workId
      memo
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
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      # # company
      # residentId
    }
  }
`;
