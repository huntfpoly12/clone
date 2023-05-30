import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyEmployeeLeaveOfAbsenceData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyEmployeeLeaveOfAbsenceData(
      search: $search
      data: $data
    ) {
      companyId
      type
      imputedYear
      workId
      memo
      # employeeType
      # employeeId
      # name
      # nationalPensionReport
      # healthInsuranceReport
      # employeementInsuranceReport
      # industrialAccidentInsuranceReport
      # workingStatus
      # registeredAt
      # acceptedAt
      # completedAt
      # acceptedNumber
      # createdAt
      # createdBy
      # updatedAt
      # updatedBy
      # ip
      # active
      # # company
      # residentId
    }
  }
`;
