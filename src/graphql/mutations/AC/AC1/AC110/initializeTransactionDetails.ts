import gql from "graphql-tag";
export default gql`
    mutation initializeTransactionDetails($companyId: Int!, $fiscalYear: Int!, $facilityBusinessId: Int!, $bankbookDetailDate: Int!, $bankbookDetailId: Int!) {
        initializeTransactionDetails(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, bankbookDetailDate: $bankbookDetailDate, bankbookDetailId: $bankbookDetailId) {
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
          client {
            clientId
            name
            bizNumber
            presidentName
            phone
            use
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            residentId
          }
          statementOfGoodsItems {
            item
            standard
            unit
            quantity
            unitPrice
            amount
            remark
          }
        }
    }
`;
