import gql from 'graphql-tag';

export default gql`
    query getBudgetsLogs(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
    ) {
        getBudgetsLogs(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId) {
          ts
          index
          accounSubjectOrder
          status
          savedAt
          savedBy
          employeePaySum
          revenueBudgetSum
          expenditureBudgetSum
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
          loggedAt
          remark
          revenueBudgetRecords {
            code
            code1
            code2
            code3
            amount
            remark
            fundingSource1
            fundingSource2
            fundingSource3
            fundingSource4
            details {
              type
              detail
              calculationResult
            }
          }
          expenditureBudgetRecords {
            code
            code1
            code2
            code3
            amount
            remark
            fundingSource1
            fundingSource2
            fundingSource3
            fundingSource4
            details {
              type
              detail
              calculationResult
            }
          }
          employeePayTable {
            totalLaborCost
            totalDirectLaborCost
            totalIndirectLaborCost
            items {
              occupation
              classification
              name
              salary
              allowance
              dailyAllowance
              retirementReserve
              socialInsuranceLevy
            }
          }
        }
    }
`
