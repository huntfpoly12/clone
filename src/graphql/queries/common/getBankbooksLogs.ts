import gql from "graphql-tag";
export default  gql`
query getBankbooksLogs($companyId: Int!, $fiscalYear: Int!) {
    getBankbooksLogs(companyId: $companyId, fiscalYear: $fiscalYear) {
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
      encScrapInfo
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      loggedAt
      remark
  }
}
`
