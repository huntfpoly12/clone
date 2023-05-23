import gql from "graphql-tag";
export default gql`
  query getAccountingDocuments(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $year: Int!
    $month: Int!
  ) {
    getAccountingDocuments(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      year: $year
      month: $month
    ) {
      lastBalance
      accountingDocuments {
        transactionDetailDate
        accountingDocumentId
        documentOrderByDate
        bankbookId
        bankbookDetailId
        resolutionClassification
        # income
        # spending
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

        statementOfGoodsItems {
          item
          standard
          unit
          quantity
          unitPrice
          amount
          remark
        }
        proofCount
        handwriting
        resolutionNormalStatus
        resolutionNumber
        # resolutionDate
        resolutionType
        causeActionDate
        amount
        proposedDate
        accountingDate
        registrationDate
        paymentDate
        source
        writer
        bankbook{
          bankbookNickname
          type
          bankbookNumber
          bankbookId
        }
        summaryOfBankbookDetail
      }
    }
  }
`;
