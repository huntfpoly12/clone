import gql from "graphql-tag";
export default gql`
  query searchLocalIncomeTaxElectronicFilingsByYearMonth(
    $paymentYear: Int!
    $paymentMonth: Int!
  ) {
    searchLocalIncomeTaxElectronicFilingsByYearMonth(
      paymentYear: $paymentYear
      paymentMonth: $paymentMonth
    ) {
      companyId
      imputedYear
      reportId
      imputedMonth
      paymentYear
      paymentMonth
      reportType
      index
      afterDeadline
      localIncomeTaxAmount
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
      companyServiceContract {
        id
        servicePrice
        accountingPrice
        withholdingPrice
        usedAccountingCount
        usedAccounting
        usedWithholding
        # usedServiceInfo
        salesRepresentativeId
        manageUserId
        manageStartDate
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
        # compactSalesRepresentative
        # manageCompactUser
        # facilityBusinesses
        # withholding
      }
    }
  }
`;
