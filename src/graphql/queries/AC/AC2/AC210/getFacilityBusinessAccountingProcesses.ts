import gql from "graphql-tag";
export default gql`
  query getFacilityBusinessAccountingProcesses(
    $companyId: Int!
    $fiscalYear: Int!
    $year: Int!
    $month: Int!
  ) {
    getFacilityBusinessAccountingProcesses(
        companyId: $companyId
        fiscalYear: $fiscalYear
        year: $year
        month: $month
    ) {
        facilityBusinessId
        facilityBusinessName
        status
    }
  }
`;
