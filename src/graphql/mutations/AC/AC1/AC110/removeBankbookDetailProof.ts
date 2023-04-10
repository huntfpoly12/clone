import gql from "graphql-tag";
export default gql`
    mutation removeBankbookDetailProof(
      $companyId: Int!,
      $fiscalYear: Int!,
      $facilityBusinessId: Int!,
      $bankbookDetailDate: Int!,
      $bankbookDetailId: Int!,
      $fileStorageId: Int!) {
        removeBankbookDetailProof(
          companyId: $companyId,
          fiscalYear: $fiscalYear,
          facilityBusinessId: $facilityBusinessId,
          bankbookDetailDate: $bankbookDetailDate,
          bankbookDetailId: $bankbookDetailId,
          fileStorageId: $fileStorageId) 
    }
`;
