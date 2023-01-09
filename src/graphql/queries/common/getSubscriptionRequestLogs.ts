import gql from "graphql-tag";
export default gql`
  query getSubscriptionRequestLogs($id: Int!) {
    getSubscriptionRequestLogs(id: $id) {
      subscriptionRequestId
      ts
      status
      code
      companyName
      companyBizNumber
      companyAddress
      presidentName
      simpleAccountingInfos {
        name
        startYearMonth
      }
      simpleWithholdingInfo {
        name
        startYearMonth
      }
      processedAt
      processedBy
      approvedAt
      approvedBy
      rejectedAt
      rejectedBy
      content {
        agreements {
          terms
          personalInfo
          accountingService
          withholdingService
        }
        company {
          name
          zipcode
          roadAddress
          jibunAddress
          addressExtend
          addressDetail {
            bcode
            bname
            buildingCode
            buildingName
            roadname
            roadnameCode
            sido
            sigungu
            sigunguCode
            zonecode
          }
          phone
          fax
          licenseFileStorageId
          bizNumber
          bizType
          residentId
          residentId 
          license {
            name
            url
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
          }
        }
        president {
          name
          birthday
          mobilePhone
          email
        }
        accounting {
          facilityBusinesses {
            longTermCareInstitutionNumber
            facilityBizType
            name
            startYearMonth
            capacity
            registrationCardFileStorageId
            registrationCard {
              name
              url
              createdAt
              createdBy
              updatedAt
              updatedBy
              ip
              active
            }
          }
          accountingServiceTypes
        }
        withholding {
          startYearMonth
          capacity
          withholdingServiceTypes
        }
        cmsBank {
          bankType
          accountNumber
          ownerBizNumber
          ownerName
          withdrawDay
        }
        extra {
          salesRepresentativeId
          comment
        }
      }
      memo
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
`;
