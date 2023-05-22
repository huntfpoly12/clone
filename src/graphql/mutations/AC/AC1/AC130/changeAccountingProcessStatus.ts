import gql from "graphql-tag";
export default gql`
  mutation changeAccountingProcessStatus(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $year: Int!,
    $month: Int!
    $status: Int!
  ) {
    changeAccountingProcessStatus(
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      facilityBusinessId: $facilityBusinessId,
      year: $year,
      month: $month
      status: $status
    ){
      year
      month
      yearMonth
      status
      statusUserId
      statusUpdatedAt
      bankbookDetailsCount
      deposit
      withdraw
      income
      spending
      revenue
      expenditure
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      statusUpdateUser {
        id
        type
        username
        name
        active
      }
    }
  }
`;