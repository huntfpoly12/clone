import gql from "graphql-tag";
export default gql`
  mutation createMajorInsuranceCompanyEmployeeReturnToWork(
    $companyId: Int!
    $imputedYear: Int!
    $input: MajorInsuranceCompanyEmployeeReturnToWorkInput!
  ) {
    createMajorInsuranceCompanyEmployeeReturnToWork(
      companyId: $companyId
      imputedYear: $imputedYear
      input: $input
    ) {
      companyId
      type
      imputedYear
      # workId
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
      # accedpedNumber
      # memo
      # createdAt
      # createdBy
      # updatedAt
      # updatedBy
      # ip
      # active
      # leaveOfAbsenceRequestFileStorageId
      # residentId
      # leaveOfAbsenceRequestFile {
      #   id
      #   name
      #   url
      #   turl
      #   createdAt
      #   createdBy
      #   updatedAt
      #   updatedBy
      #   ip
      #   active
      # }
    }
  }
`;
