import gql from "graphql-tag";
export default gql`
    query getBankbookDetailProofs($companyId: Int!, $fiscalYear: Int!, $facilityBusinessId: Int!, $bankbookDetailDate: Int!, $bankbookDetailId: Int!) {
        getBankbookDetailProofs(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, bankbookDetailDate: $bankbookDetailDate, bankbookDetailId: $bankbookDetailId) {
          id
          name
          url
          turl
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
        }
    }
`;
