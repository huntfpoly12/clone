import gql from "graphql-tag";
import { WithholdingAdditionalServiceType } from "./withholding"

// var dataHolding  = WithholdingAdditionalServiceType
const mutations = {
  creactContract: gql`
    mutation createSubscriptionRequest(
      $terms: Boolean!
      $personalInfo: Boolean!
      $accountingService: Boolean!
      $withholdingService: Boolean!

      $name:String!
      $zipcode:String!
      $roadAddress:String!
      $jibunAddress:String!
      $addressExtend:String!

      $bcode: String!
      $bname: String!
      $buildingCode:String!
      $buildingName:String!
      $roadname: String!
      $roadnameCode:String!
      $sido: String!
      $sigungu:String!
      $sigunguCode:String!
      $zonecode: String!

      $phone: String!
      $fax: String!
      $licenseFileStorageId: Int!
      $bizNumber: String!
      $bizType:  [String!, Number!]
      $accountingServiceTypes:  [String!, Number!]
      $facilityBizType:  [String!, Number!]
      $residentId:String!

      $presidentName : String!
      $birthday : String! 
      $mobilePhone : String! 
      $email : String! 
      $WithholdingAdditionalServiceTypeScalar: [String!, Number!]
      $longTermCareInstitutionNumber : String! 
      $nameFacilityBusinesses : String! 
      # $startYearMonth : String!
      $capacity : Int!
      $registrationCardFileStorageId : Int!
      
      # $holdingYear : String! 
      $capacityHolding : Int! 
      
      $accountNumber : String! 
      $ownerBizNumber : String! 
      $ownerName : String!
      $withdrawDay : String!

      $salesRepresentativeId: Int! 
      $comment: String! 
    ) {
      createSubscriptionRequest(content :{
        agreements: {
          terms: $terms
          personalInfo: $personalInfo
          accountingService: $accountingService
          withholdingService: $withholdingService
        }
        company: {
            name: $name
            zipcode: $zipcode
            roadAddress: $roadAddress
            jibunAddress: $jibunAddress
            addressExtend: $addressExtend
            addressDetail: {
                bcode: $bcode
                bname: $bname
                buildingCode: $buildingCode
                buildingName: $buildingName
                roadname: $roadname
                roadnameCode: $roadnameCode
                sido: $sido
                sigungu: $sigungu
                sigunguCode: $sigunguCode
                zonecode: $zonecode
            }
            phone: $phone
            fax: $fax
            licenseFileStorageId: $licenseFileStorageId
            bizNumber: $bizNumber
            bizType: $bizType
            residentId: $residentId
        }
        president: {
            name: $presidentName
            birthday: $birthday
            mobilePhone: $mobilePhone
            email: $email
        }
        accounting: {
            facilityBusinesses: {
                longTermCareInstitutionNumber: $longTermCareInstitutionNumber
                facilityBizType:  $facilityBizType
                name: $name
                startYearMonth: "2022/10/10"
                capacity: $capacity
                registrationCardFileStorageId: $registrationCardFileStorageId
            }
            accountingServiceTypes:  $accountingServiceTypes
        }
        withholding: {
            startYearMonth: "2022/10/10"
            capacity: $capacityHolding
            withholdingServiceTypes:  $WithholdingAdditionalServiceTypeScalar
        }
        cmsBank: {
            bankType: WithholdingAdditionalServiceType
            accountNumber: $accountNumber
            ownerBizNumber: $ownerBizNumber
            ownerName: $ownerName
            withdrawDay: $withdrawDay
        }
        extra: {
            salesRepresentativeId: $salesRepresentativeId
            comment: $comment
        }
      }
      ) {
        id
        status
        code
      }
    }
  `,
};

export default mutations;
