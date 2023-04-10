import gql from "graphql-tag";
export default gql`
  query getEmployeeBusinesses($companyId: Int!, $imputedYear: Int!) {
    getEmployeeBusinesses(companyId: $companyId, imputedYear: $imputedYear) {
      employeeId
      foreigner
      incomeTypeCode
      incomeTypeName
      name
      residentId
      status
      email
      nationality
      nationalityCode
      stayQualification
      deletable
      __typename @skip(if: true)
    }
  }
`;
