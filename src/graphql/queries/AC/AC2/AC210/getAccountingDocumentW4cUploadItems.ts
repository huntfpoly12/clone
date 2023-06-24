import gql from "graphql-tag";
export default gql`
  query getAccountingDocumentW4cUploadItems(
    $companyId: Int!
    $requestId: Int!
    $finishDate: Int!
  ) {
    getAccountingDocumentW4cUploadItems(
      companyId: $companyId
      requestId: $requestId
    ) {
        requestId
        index
        facilityBusinessName
        resolutionNumber
        transactionDetailDate
        bankbookNumber
        bankbookNickname
        resolutionType
        revenue
        expenditure
        summary
        theOrder
        accountCode
        relationCode
        fundingSource
        clientName
        success
        result
    }
  }
`;
