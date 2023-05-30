import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyEmployeeReturnToWorkData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyEmployeeReturnToWorkData(
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
