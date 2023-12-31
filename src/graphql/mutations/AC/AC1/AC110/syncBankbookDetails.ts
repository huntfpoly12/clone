import gql from "graphql-tag";
export default gql`
  mutation syncBankbookDetails(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $year: Int!,
    $month: Int!
  ) {
    syncBankbookDetails(
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      facilityBusinessId: $facilityBusinessId,
      year: $year,
      month: $month
    ) {
      bankbookDetailDate
      bankbookDetailId
      bankbookId
      bankbookDetailTime
      summary
      content
      note
      deposit
      withdraw
      balance
      proofCount
      transactionDetailsCount
      normalTransactionDetails
      documentRegistered
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      bankbook {
        facilityBusinessId
        bankbookId
        sort
        type
        bankbookNumber
        bankbookNickname
        classification
        useType
        owner
        accountCode
        accountName
        useScrap
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
        facilityBusiness {
          facilityBusinessId
          name
          longTermCareInstitutionNumber
          facilityBizType
          startYearMonth
          capacity
          registrationCardFileStorageId
          price
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
        }
      }
      transactionDetails {
        transactionDetailDate
        accountingDocumentId
        documentOrderByDate
        bankbookId
        bankbookDetailId
        resolutionClassification
        income
        spending
        summary
        theOrder
        accountCode
        relationCode
        fundingSource
        clientId
        letterOfApprovalType
        causeUsage
        goodsCount
        memo
        goodsId
        documentRegistered
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
      }
      proofs {
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
  }
`;
