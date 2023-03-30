import gql from "graphql-tag";
export default gql`
    mutation addBankbookDetailProof(
      $companyId: Int!,
      $fiscalYear: Int!,
      $facilityBusinessId: Int!,
      $bankbookDetailDate: Int!,
      $bankbookDetailId: Int!,
      $fileStorageId: Int!) {
        addBankbookDetailProof(
          companyId: $companyId,
          fiscalYear: $fiscalYear,
          facilityBusinessId: $facilityBusinessId,
          bankbookDetailDate: $bankbookDetailDate,
          bankbookDetailId: $bankbookDetailId,
          fileStorageId: $fileStorageId) {
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
