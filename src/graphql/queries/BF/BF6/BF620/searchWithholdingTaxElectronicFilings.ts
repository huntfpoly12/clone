import gql from "graphql-tag";
export default gql`
  query searchWithholdingTaxElectronicFilings(
    $filter: ElectronicFilingWithholdingTaxSearchFilter!
  ) {
    searchWithholdingTaxElectronicFilings(filter: $filter) {
      companyId
      imputedYear
      reportId
      imputedMonth
      paymentYear
      paymentMonth
      reportType
      index
      afterDeadline
      totalCollectedTaxAmount
      statusUpdatedAt
      lastProductionRequestedAt
      company {
        id
        code
        name
        bizNumber
        bizType
        address
        phone
        presidentName
        presidentMobilePhone
        sealFileStorageId
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
        residentId
        canceledAt
        unpaidMonths
      }
    }
  }
`;
